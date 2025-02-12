<?php
session_set_cookie_params([
    'lifetime' => 86400,  // Set session to expire in 1 day
    'path' => '/',
    'secure' => true, // Only if you're using HTTPS
    'httponly' => true
]);
session_start();
// Allow CORS for requests from the React frontend (localhost:3000)
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
    die(json_encode(["success" => false, "message" => "Database connection failed: " . mysqli_connect_error()]));
}

// Read the JSON data from the POST request
$data = json_decode(file_get_contents("php://input"), true);

// Check if data was received
if ($data === null) {
    echo json_encode(["success" => false, "message" => "No data received."]);
    exit();
}

$email = trim($data['email']);
$password = trim($data['password']);
$usertype = $data['usertype'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email format."]);
    exit();
}

// Check if email exists in the database
$checkEmailQuery = "SELECT * FROM login WHERE email = ?";
$stmt = mysqli_prepare($conn, $checkEmailQuery);
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    // Check if usertype matches
    if ($row['usertype'] !== $usertype) {
        echo json_encode(["success" => false, "message" => "User type mismatch."]);
    } elseif ($row['password'] === $password) { // Direct comparison
        echo json_encode(["success" => true, "message" => "Login successful!", "usertype" => $row['usertype']]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Email not registered."]);
}

// Close the database connection
mysqli_close($conn);
?>
