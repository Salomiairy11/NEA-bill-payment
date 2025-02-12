<?php
session_start(); // Start the session
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if (isset($_SESSION['email']) && isset($_SESSION['usertype'])) {
    echo json_encode([
        'success' => true,
        'usertype' => $_SESSION['usertype'],
    ]);
} else {
    echo json_encode([
        'success' => false,
    ]);
}

?>
