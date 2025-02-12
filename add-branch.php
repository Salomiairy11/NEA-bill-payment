<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$host = "localhost";
$user = "root";
$password = "";
$db = "user";

$conn = mysqli_connect($host, $user, $password, $db);
if (!$conn) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . mysqli_connect_error()]));
}

$data = json_decode(file_get_contents("php://input"), true);

if ($data === null) {
    echo json_encode(["success" => false, "message" => "No data received."]);
    exit();
}

$branchId = trim($data['branchId']);
$branchName = trim($data['branchName']);
$address = trim($data['address']);
$status = $data['status'] ? 'Active' : 'Inactive';  // Convert checkbox to Active/Inactive

// Insert the data into the database
$query = "INSERT INTO branches (branchId, branchName, address, status) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ssss", $branchId, $branchName, $address, $status);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Branch added successfully!"]);
} else {
    echo json_encode(["success" => false, "message" => "Database insertion failed."]);
}

// Close the database connection
mysqli_close($conn);
?>
