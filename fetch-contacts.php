<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Database connection
$host = "localhost";
$user = "root";
$password = "";
$db = "user";  // Your database name

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed"]));
}

// Query to fetch data from contacts table
$sql = "SELECT id, contactName, location, phone, remarks FROM no_light_contacts";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $contacts = [];
    while($row = $result->fetch_assoc()) {
        $contacts[] = $row;
    }
    echo json_encode($contacts);
} else {
    echo json_encode(["message" => "No contacts found"]);
}

$conn->close();
?>
