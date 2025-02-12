<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow React frontend
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
$host = "localhost";
$user = "root";
$password = "";
$db = "user";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

// Get data from the request body
$data = json_decode(file_get_contents("php://input"));
$billId = isset($data->billId) ? $data->billId : null;

// Validate the received data
if (!$billId) {
    echo json_encode(["success" => false, "message" => "Bill ID is required"]);
    exit();
}

// Update the bill status to 'Paid'
$updateQuery = $conn->prepare("UPDATE bills SET status = 'Paid' WHERE billId = ?");
$updateQuery->bind_param("i", $billId);

// Execute the query
$updateQuery->execute();

// Check if the query was successful
if ($updateQuery->affected_rows > 0) {
    echo json_encode(["success" => true, "message" => "Bill marked as Paid"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update bill status"]);
}

$conn->close();
?>
