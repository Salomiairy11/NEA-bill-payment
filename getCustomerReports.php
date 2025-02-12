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

// Get total customers who are not admins
$totalCustomersQuery = "SELECT COUNT(*) AS totalCustomers FROM login WHERE usertype = 'user'";
$totalCustomersResult = $conn->query($totalCustomersQuery);
$totalCustomers = $totalCustomersResult->fetch_assoc()['totalCustomers'];

// Get  not admin customers who have paid
$customersPaidQuery = "
    SELECT COUNT(DISTINCT b.customer_id) AS customersPaid
    FROM bills b
    JOIN login l ON b.customer_id = l.customer_id
    WHERE b.status = 'Paid' AND l.usertype = 'user'
";
$customersPaidResult = $conn->query($customersPaidQuery);
$customersPaid = $customersPaidResult->fetch_assoc()['customersPaid'];

// Get not admin customers per branch
$customersPerBranchQuery = "
    SELECT b.branchName, COUNT(l.customer_id) AS customerCount
    FROM login l
    JOIN branches b ON l.branch_id = b.branchId
    WHERE l.usertype = 'user'
    GROUP BY b.branchName
";
$customersPerBranchResult = $conn->query($customersPerBranchQuery);
$customersPerBranch = [];
while ($row = $customersPerBranchResult->fetch_assoc()) {
    $customersPerBranch[] = $row;
}

// Get not admin customers per demand type
$customersPerDemandTypeQuery = "
    SELECT l.demandType, COUNT(l.customer_id) AS customerCount
    FROM login l
    WHERE l.usertype = 'user'
    GROUP BY l.demandType
";
$customersPerDemandTypeResult = $conn->query($customersPerDemandTypeQuery);
$customersPerDemandType = [];
while ($row = $customersPerDemandTypeResult->fetch_assoc()) {
    $customersPerDemandType[] = $row;
}

echo json_encode([
    "success" => true,
    "totalCustomers" => $totalCustomers,
    "customersPaid" => $customersPaid,
    "customersPerBranch" => $customersPerBranch,
    "customersPerDemandType" => $customersPerDemandType
]);

$conn->close();
?>

