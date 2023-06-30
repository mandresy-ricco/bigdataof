<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

session_start();
require_once 'Router.php';
$routes = require 'routes/ajaxRoutes.php';

$router = new Router($routes);
$route = $_GET['route'] ?? '';
$router->handleRequest($route);

