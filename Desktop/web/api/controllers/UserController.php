<?php

$rootDirectory = $_SERVER['DOCUMENT_ROOT'];
include $rootDirectory."/config/DBSingleton.php";

class UserController
{
    private $connection;

    public function __construct(){

        $db = DBSingleton::getInstance();
        $this->connection = $db->getConnection();
    }

    public function getIdUser(){
        if(!isset($_SESSION['iduser'])){
            $value = -1;
        }else{
            $value = $_SESSION['iduser'];
        }
        echo json_encode($value);
    }

    public function verifyUser($data){
        $query = "SELECT * FROM user WHERE mail = '$data[0]'";
        $result = $this->connection->query($query);

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $hashedPassword = $user['password'];
            if (password_verify($data[1], $hashedPassword)) {
                $_SESSION['iduser'] = intval($user['id_user']);
                echo json_encode($_SESSION['iduser']);
                exit;
            }
        }

        echo json_encode(-1);
        exit;

    }

    public function getUser($email){
        $stmt = $this->connection->prepare("SELECT * FROM user WHERE mail = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();

        return $stmt->get_result();
    }

    public function addUser($data){
        $obj = json_decode($data);
        $email = $obj->email;
        $password = password_hash($obj->password, PASSWORD_DEFAULT);

        if($this->getUser($email)->num_rows > 0){
            echo json_encode(0);

        }else{
            $stmt = $this->connection->prepare("INSERT INTO user (mail, password) VALUES (?, ?)");
            $stmt->bind_param("ss", $email, $password);
            $stmt->execute();
            echo json_encode(1);

        }


    }

}