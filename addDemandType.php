<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
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
    die(json_encode(["message" => "Database connection failed"]));
}

// Read JSON data from request
$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data['value'], $data['rate'])) {
    echo json_encode(["message" => "Invalid input"]);
    exit();
}

$value = trim($data['value']);
$rate = floatval($data['rate']);
$unit = isset($data['unit']) ? trim($data['unit']) : ""; // ✅ Handle missing unit safely

// Validate input
if (empty($value) || $rate <= 0) {
    echo json_encode(["message" => "Invalid demand type or rate"]);
    exit();
}

// Check if demand type already exists
$checkQuery = $conn->prepare("SELECT value FROM demandType WHERE value = ?");
$checkQuery->bind_param("s", $value);
$checkQuery->execute();
$checkQuery->store_result();

if ($checkQuery->num_rows > 0) {
    echo json_encode(["message" => "Demand type already exists"]);
    exit();
}

// Insert new demand type (including unit if needed)
$sql = $conn->prepare("INSERT INTO demandType (value, rate, unit) VALUES (?, ?, ?)");
$sql->bind_param("sds", $value, $rate, $unit);

if ($sql->execute()) {
    echo json_encode(["message" => "Demand type added successfully!"]);
} else {
    echo json_encode(["message" => "Error adding demand type"]);
}

$conn->close();
?>
