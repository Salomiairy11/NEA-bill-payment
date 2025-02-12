<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Create database connection
$host = "localhost";
$user = "root";
$password = "";
$db = "user";

$conn = mysqli_connect($host, $user, $password, $db);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$query = "SELECT branchId, branchName FROM branches";
$result = $conn->query($query);
$branches = [];
while ($row = $result->fetch_assoc()) {
    $branches[] = $row;
}

$conn->close();

// Return the branches as a JSON response
echo json_encode($branches);


