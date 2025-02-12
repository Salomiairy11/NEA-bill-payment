<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = "localhost";
$user = "root";
$password = "";
$db = "user";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

$sql = "
    SELECT l.customer_id, 
           l.sc_no, 
           IFNULL(l.demandType, 'Unknown') AS demandType, 
           b.billId AS bill_id, 
           b.payableAmount AS bill_amount, 
           IFNULL(b.status, 'Unpaid') AS status
    FROM login l
    LEFT JOIN bills b ON l.customer_id = b.customer_id
    ORDER BY l.customer_id, b.billDate DESC
";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $customers = [];
    while ($row = $result->fetch_assoc()) {
        $customer_id = $row['customer_id'];

        if (!isset($customers[$customer_id])) {
            $customers[$customer_id] = [
                'customer_id' => $customer_id,
                'sc_no' => $row['sc_no'],
                'demandType' => $row['demandType'], // Make sure this is included
                'bills' => []
            ];
        }

        if ($row['bill_id'] !== null) {
            $customers[$customer_id]['bills'][] = [
                'id' => $row['bill_id'],
                'bill_amount' => $row['bill_amount'],
                'status' => $row['status']
            ];
        }
    }
    echo json_encode(["success" => true, "customers" => array_values($customers)]);
} else {
    echo json_encode(["success" => false, "message" => "No customers found"]);
}

$conn->close();
?>
