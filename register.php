<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Create database connection
$host = "localhost";
$user = "root";
$password = "";
$db = "user";

$conn = mysqli_connect($host, $user, $password, $db);
if (!$conn) {
    echo json_encode(["message" => "Database connection failed: " . mysqli_connect_error()]);
    exit();
}

// Read JSON data from request
$data = json_decode(file_get_contents("php://input"), true);
if ($data === null) {
    echo json_encode(["message" => "Invalid JSON received.", "error" => json_last_error_msg()]);
    exit();
}

$email = trim($data['email']);
$password = trim($data['password']);
$usertype = $data['usertype'];
$employeeCode = $data['employee_code'] ?? '';
$address = $data['address'];
$phoneNo = $data['phoneNo'];
$branchName = $data['branchName'];
$demandType = trim($data['demandType']);

// Validate demandType
$validDemandTypes = ["5A", "10A", "15A"];
if (!in_array($demandType, $validDemandTypes)) {
    echo json_encode(["message" => "Invalid demand type selected."]);
    exit();
}

// Fetch branchId for branchName
$branchQuery = $conn->prepare("SELECT branchId FROM branches WHERE branchName = ?");
$branchQuery->bind_param("s", $branchName);
$branchQuery->execute();
$branchResult = $branchQuery->get_result();
if ($branchResult->num_rows === 0) {
    echo json_encode(["message" => "Selected branch does not exist."]);
    exit();
}
$branchRow = $branchResult->fetch_assoc();
$branchId = $branchRow['branchId'];

// Generate unique customerId and scNo
$customerId = "CUST" . strtoupper(substr(md5(mt_rand()), 0, 8));  
$scNo = "SC" . strtoupper(substr(md5(mt_rand()), 0, 8));  

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["message" => "Invalid email format."]);
    exit();
}

// Check if email already exists
$checkEmailQuery = "SELECT * FROM login WHERE email = ?";
$stmt = $conn->prepare($checkEmailQuery);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    echo json_encode(["message" => "Email is already registered. Please use a different email."]);
    exit();
}

if($usertype==='user'){
    $sql = "INSERT INTO login (email, password, usertype, customer_id, sc_no, address, phoneNo, demandType, branch_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssss", $email, $password, $usertype, $customerId, $scNo, $address, $phoneNo, $demandType, $branchId);
}

if ($stmt->execute()) {
    echo json_encode(["message" => "User registered successfully!"]);
} else {
    echo json_encode(["message" => "Error: Could not register. Please try again."]);
}

// Close database connection
$conn->close();
?>

