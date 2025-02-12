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

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST['bill_id']) || !isset($_POST['total_amount'])) {
        echo json_encode(['status' => 'error', 'message' => 'Missing bill details.']);
        exit();
    }

    // Sanitize inputs
    $bill_id = htmlspecialchars($_POST['bill_id'], ENT_QUOTES, 'UTF-8');
    $total_amount = htmlspecialchars($_POST['total_amount'], ENT_QUOTES, 'UTF-8');

    // Optional: Validate that `bill_id` and `total_amount` are in the expected format
    if (!is_numeric($total_amount) || empty($bill_id)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid bill details.']);
        exit();
    }

    // Return JSON response for JavaScript to handle redirection
    echo json_encode(['status' => 'redirect', 'url' => 'khalti_payment.php']);
    exit();
}
?>
