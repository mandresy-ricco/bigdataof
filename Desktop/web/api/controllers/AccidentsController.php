<?php

$rootDirectory = $_SERVER['DOCUMENT_ROOT'];
include $rootDirectory."/config/DBSingleton.php";
class AccidentsController{

    private $connection;

    public function __construct(){

        $db = DBSingleton::getInstance();
        $this->connection = $db->getConnection();
    }

    public function getPrediction($id){
        $data = ($this->getAccident($id));
        $file = "echo '{$data}' | python3 /var/www/etu826/scripts/prediction/App.py 2>&1";
        $result = shell_exec($file);
        echo json_encode($result, true);
    }

    public function getCluster($array){
        $arrayJSON = (json_encode($array));
        $file = "echo '{$arrayJSON}' | python3 /var/www/etu826/scripts/prediction/App.py 2>&1";
        $result = shell_exec($file);
        echo ($result);
    }
    public function getAccident($userId){
        $this->connection->set_charset('utf8mb4');

        $sql = "
            SELECT 
               a.week, p.latitude,p.longitude,a.id_category,p.aglo,a.id_lum,a.age,a.id_security,a.id_collision
            FROM 
                accident a
            LEFT JOIN 
                conditions c ON a.id_desc_atmos = c.id_desc_atmos
            LEFT JOIN 
                brightness b ON a.id_lum = b.id_lum
            LEFT JOIN 
                security s ON a.id_security = s.id_security
            LEFT JOIN 
                place p ON a.id_loc = p.id_loc
            LEFT JOIN 
                collision col ON a.id_collision = col.id_collision
            LEFT JOIN 
                category cat ON a.id_category = cat.id_category
            LEFT JOIN 
                road r ON a.id_road = r.id_road
            WHERE 
                a.num_acc = ?";

        if ($stmt = $this->connection->prepare($sql)) {
            $stmt->bind_param("i", $userId);

            if ($stmt->execute()) {
                $result = $stmt->get_result();
                $accidents = $result->fetch_all(MYSQLI_ASSOC);
                $result->free();
            } else {
                echo "Error: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Error: " . $this->connection->error;
        }

        $this->connection->close();

        return json_encode($accidents);

    }
    public function getAccidents(){

        $this->connection->set_charset('utf8mb4');
        $sql = "
                    SELECT a.num_acc, a.age, a.hours_date, a.id_user,
               c.name AS condition_name, 
               b.name AS brightness_name, 
               s.name AS security_name, 
               p.longitude, p.latitude, p.aglo, p.ville, 
               col.name AS collision_name,
               cat.name AS category_name,
               r.name AS road_name
                FROM accident a
                LEFT JOIN conditions c ON a.id_desc_atmos = c.id_desc_atmos
                LEFT JOIN brightness b ON a.id_lum = b.id_lum
                LEFT JOIN security s ON a.id_security = s.id_security
                LEFT JOIN place p ON a.id_loc = p.id_loc
                LEFT JOIN collision col ON a.id_collision = col.id_collision
                LEFT JOIN category cat ON a.id_category = cat.id_category
                LEFT JOIN road r ON a.id_road = r.id_road
                WHERE a.id_user != 1;
        ";

        if ($result = $this->connection->query($sql)) {
            $accidents = $result->fetch_all(MYSQLI_ASSOC);
            $result->free();
        } else {
            echo "Error: " . $this->connection->error;
        }

        $this->connection->close();

        echo json_encode($accidents);

        return json_encode($accidents);

    }

    public function addAccident($data) {

        $sql = "INSERT INTO place (longitude, latitude, aglo, ville) VALUES ({$data['longitude']}, {$data['latitude']}, {$data['descragglo']}, '{$data['ville']}')";

        if ($this->connection->query($sql) === TRUE) {
            $last_id = $this->connection->insert_id;
        } else {
            echo "Erreur: " . $sql . "<br>" . $this->connection->error;
        }

        $dateTime = new DateTime($data['date'] . ' ' . $data['heure']);
        $mysqlDateTime = $dateTime->format('Y-m-d H:i:s');
        $weekNumber = date('W', strtotime($data['date']));

        $query = "INSERT INTO accident ( week,age, hours_date, id_user,id_loc, id_desc_atmos, id_security, id_lum, id_collision, id_category, id_road) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $statement = $this->connection->prepare($query);
        if ($statement === false) {
            die('Erreur de préparation : ' . $this->connection->error);
        }

        $statement->bind_param("iisiiiiiiii",  $weekNumber,$data['age'],$mysqlDateTime,$_SESSION['iduser'] ,$last_id
            , $data['descrathmo'], $data['descrdispo_secu'], $data['descrlum'], $data['descrtypecol'], $data['descrcat_veh'], $data['descretatsurf']);

        if ($statement->execute()) {
            $statement->close();
            return true;
        } else {
            echo "Erreur lors de l'ajout de l'accident : " . $statement->error;
            $statement->close();
            return false;
        }
    }


}