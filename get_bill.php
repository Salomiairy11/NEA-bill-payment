<!-- <?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow React frontend
header("Access-Control-Allow-Methods: GET, OPTIONS");
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
    echo json_encode(["message" => "Database connection failed"]);
    exit();
}

// Get parameters from query string
$customerId = isset($_GET['customerId']) ? $_GET['customerId'] : null;
$billId = isset($_GET['billId']) ? $_GET['billId'] : null;



if (!$customerId || !$billId) {
    echo json_encode(["message" => "Invalid parameters"]);
    exit();
}

// Fetch customer details
$customerQuery = $conn->prepare("SELECT * FROM login WHERE customer_id = ?");
$customerQuery->bind_param("s", $customerId);
$customerQuery->execute();
$customerResult = $customerQuery->get_result();

if ($customerResult->num_rows == 0) {
    echo json_encode(["message" => "Customer not found"]);
    exit();
}
$customer = $customerResult->fetch_assoc();

// Fetch bill details
$billQuery = $conn->prepare("SELECT * FROM bills WHERE customer_id = ? AND id = ?");
$billQuery->bind_param("si", $customerId, $billId);
$billQuery->execute();
$billResult = $billQuery->get_result();

if ($billResult->num_rows == 0) {
    echo json_encode(["message" => "Bill not found"]);
    exit();
}
$bill = $billResult->fetch_assoc();

// Return the data
echo json_encode([
    "success" => true,
    "bill" => $bill,
    "customer" => $customer
]);

$conn->close();
?> -->
