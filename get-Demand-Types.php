<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
$host = "localhost";
$user = "root";
$password = "";
$db = "user";

$conn = mysqli_connect($host, $user, $password, $db);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT value, rate, unit FROM demandtype";
$result = $conn->query($sql);

$demandtype = [];
while ($row = $result->fetch_assoc()) {
    $demandtype[] = $row;
}

echo json_encode($demandtype);
$conn->close();
?>
