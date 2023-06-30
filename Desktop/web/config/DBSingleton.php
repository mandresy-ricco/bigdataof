<?php
include 'Config.php';

class DBSingleton {
    private static $instance;
    private $connection;
    private $config;
    private $dbname;
    private $username;
    private $password;
    private $host;

    private function __construct() {

        $this->config = Config::getInstance();

        $this->dbname = $this->config->getDBname();
        $this->host = $this->config->getHost();
        $this->username = $this->config->getUsername();
        $this->password = $this->config->getPassword();

        try {
            $this->connection = new mysqli($this->host, $this->username, $this->password, $this->dbname);

            if ($this->connection->connect_error) {
                throw new Exception("Erreur de connexion " . $this->connection->connect_error);
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new DBSingleton();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }
}

