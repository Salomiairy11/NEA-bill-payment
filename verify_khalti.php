<?php
// Enable CORS for local testing (if required)
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database connection
$host = "localhost";
$user = "root";
$password = "";
$db = "user";

$conn = mysqli_connect($host, $user, $password, $db);
if (!$conn) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . mysqli_connect_error()])); 
}

// Get the POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate the incoming request
if (!isset($data['token']) || !isset($data['amount']) || !isset($data['bill_id'])) {
    echo json_encode(["success" => false, "message" => "Invalid request. Token, amount, and bill_id are required."]);
    exit;
}

$token = $data['token'];
$billId = $data['bill_id'];
$amount = $data['amount'];

// Khalti live secret key (as per your provided key)
$secretKey = "aa815fe4787c4b209f6576ce7b85a10d";

// Prepare the headers for the Khalti API
$headers = [
    "Authorization: Key $secretKey", // Khalti secret key as Bearer token
    "Content-Type: application/json"
];

// Prepare the payload for the payment verification
$payload = json_encode([
    "token" => $token,
    "amount" => $amount // Amount in paisa
]);

// Send a request to verify the payment
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://khalti.com/api/v2/payment/verify/");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

// Check if the request was successful
if (!$response) {
    echo json_encode(["success" => false, "message" => "Failed to connect to Khalti API"]);
    exit;
}

$responseData = json_decode($response, true);

// Check if the response contains the correct payment verification data
if (isset($responseData['idx']) && $responseData['idx']) {
    // Payment verified successfully. Now update the bill status to 'Paid'
    $stmt = $conn->prepare("UPDATE bills SET status = 'Paid' WHERE billId = ?");
    $stmt->bind_param("s", $billId); // Assuming billId is a string
    $stmt->execute();
    $stmt->close();
    echo json_encode(["success" => true, "message" => "Payment verified and bill status updated!"]);
} else {
    // Payment verification failed (response does not contain 'idx')
    echo json_encode(["success" => false, "message" => "Payment verification failed from Khalti."]);
}
?>
