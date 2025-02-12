<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


$host = "localhost";
$user = "root";
$password = "";
$db = "user";
$conn = new mysqli($host, $user, $password, $db);

$data = json_decode(file_get_contents("php://input"), true);
$contactName = $data['contactName'] ?? null;
$location = $data['location'] ?? null;
$phone = $data['phone'] ?? null;
$remarks = $data['remarks'] ?? null;

if ($contactName && $location && $phone) {
    $query = $conn->prepare("INSERT INTO no_light_contacts (contactName, location, phone, remarks) VALUES (?, ?, ?, ?)");
    $query->bind_param("ssss", $contactName, $location, $phone, $remarks);
    
    if ($query->execute()) {
        echo json_encode(["message" => "Contact Added Successfully"]);
    } else {
        echo json_encode(["message" => "Failed to Add Contact"]);
    }
} else {
    echo json_encode(["message" => "Invalid Data"]);
}
$conn->close();
?>
