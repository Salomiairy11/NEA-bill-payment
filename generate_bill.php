<?php
header("Access-Control-Allow-Origin: *");
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

if (!$data) {
    echo json_encode(["success" => false, "message" => "No data received."]);
    exit();
}

$customerId = isset($data['customer_id']) ? mysqli_real_escape_string($conn, $data['customer_id']) : '';

if (empty($customerId)) {
    echo json_encode(["success" => false, "message" => "Customer ID is required."]);
    exit();
}

$meterReadDate = mysqli_real_escape_string($conn, $data['meter_read_date']);
$previousReading = (float) $data['previous_reading'];
$currentReading = (float) $data['current_reading'];
$consumption = $currentReading - $previousReading;
$rate = 10; // Example per unit rate
$payableAmount = $consumption * $rate;

$query = "INSERT INTO bills (customer_id, meterReadDate, previousReading, currentReading, consumption, payableAmount, billDate, status) 
          VALUES ('$customerId', '$meterReadDate', '$previousReading', '$currentReading', '$consumption', '$payableAmount', NOW(), 'Unpaid')";

if (mysqli_query($conn, $query)) {
    echo json_encode(["success" => true, "message" => "Bill generated successfully.", "payableAmount" => $payableAmount]);
} else {
    echo json_encode(["success" => false, "message" => "Error generating bill: " . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
