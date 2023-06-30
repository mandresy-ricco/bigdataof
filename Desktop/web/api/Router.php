<?php

class Router
{
    private $routes;

    public function __construct(array $routes)
    {
        $this->routes = $routes;
    }

    public function handleRequest($route)
    {

        if (isset($this->routes[$route])) {
            try {
                $handler = $this->routes[$route];
                $handlerParts = explode('@', $handler);

                if (count($handlerParts) === 2) {
                    $controllerName = $handlerParts[0];
                    $methodName = $handlerParts[1];

                    $controllerFile = 'controllers/' . $controllerName . '.php';

                    if (file_exists($controllerFile)) {
                        require_once $controllerFile;

                        if (class_exists($controllerName)) {
                            $controller = new $controllerName();

                            if (method_exists($controller, $methodName)) {
                                try {
                                    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                                        $postData = json_decode(file_get_contents('php://input'), true);
                                        if ($route === 'post_accident'){
                                            $controller->$methodName($postData);
                                        }
                                        elseif ($route === 'post_user'){
                                            $controller->$methodName($postData);
                                        }

                                    } if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                                        if ($route === 'verify_user') {
                                            $controller->$methodName(array($_GET['email'], $_GET['password']));
                                        }
                                        elseif ($route === 'get_prediction') {
                                            $controller->$methodName($_GET['id']);
                                        }
                                        elseif ($route === 'get_cluster') {
                                            $controller->$methodName(array(
                                                "longitude" => $_GET['longitude'],
                                                "latitude" => $_GET['latitude']
                                            ));
                                        }
                                        else{
                                            $controller->$methodName();
                                        }
                                    }
                                    return;
                                } catch (Exception $e) {
                                    echo 'Erreur avec la méthode: ' . $e->getMessage();
                                }
                            } else {
                                throw new Exception("La méthode n'existe pas");
                            }
                        } else {
                            throw new Exception("La classe n'existe pas");
                        }
                    } else {
                        throw new Exception("Le fichier n'existe pas");
                    }
                } else {
                    throw new Exception("L'entrée n'est pas valide");
                }
            } catch (Exception $e) {
                echo 'Erreur avec le routeur: ' . $e->getMessage();
            }
        }

        echo '404 Not Found';
    }

}