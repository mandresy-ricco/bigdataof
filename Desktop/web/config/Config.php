<?php
class Config {
    private static $instance;
    private $dbname;
    private $host;
    private $username;
    private $password;

    private function __construct() {
        $this->dbname = "etu826";
        $this->host = "127.0.0.1";
        $this->username = "etu826";
        $this->password = "xnkjrtai";
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Config();
        }
        return self::$instance;
    }

    public function getDBname() {
        return $this->dbname;
    }

    public function getHost() {
        return $this->host;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getPassword() {
        return $this->password;
    }
}

