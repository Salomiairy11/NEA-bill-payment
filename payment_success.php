<link rel = "stylesheet" href="./paymentdecision.css">
<?php
echo "<div id='content-wrapper'>"; // Outer wrapper
$host = "localhost";
$user = "root";
$password = "";
$db = "user"; // Database name

$conn = mysqli_connect($host, $user, $password, $db);
if (!$conn) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . mysqli_connect_error()])); 
}
// Check if necessary parameters are provided in the URL
if (isset($_GET['pidx']) && isset($_GET['status']) && $_GET['status'] === 'Completed') {
    $pidx = $_GET['pidx'];
    $transactionId = $_GET['transaction_id'];
    $amount = $_GET['amount'];
    $purchaseOrderId = $_GET['purchase_order_id'];


    // Prepare and execute the query to update the bill status
    $stmt = $conn->prepare("UPDATE bills SET status='Paid' WHERE billId=?");
    $stmt->bind_param("i", $purchaseOrderId); // Bind the bill ID for updating
    $stmt->execute();

    // Display success message
    echo "<div class='payment-status-container payment-status-success'>";
    echo"<img class='image-logo' src='./logo.png'>"; // Inner success div
    echo "<h2 class='payment-status-heading'>Payment Successful!</h2>";
    echo "<a href='http://localhost:3000/consumer' class='payment-status-dashboard-button'>Back to Dashboard</a>";
    echo "</div>"; // Close inner success div
} else {
    // Display failure message if status is not 'Completed' or parameters are missing
    echo "<div class='payment-status-container payment-status-failure'>"; // Inner failure div
    echo "<h2 class='payment-status-heading'>Payment Failed!</h2>";
    echo "<a href='http://localhost:3000/consumer' class='payment-status-dashboard-button'>Back to Dashboard</a>";
    echo "</div>"; // Close inner failure div
}

echo "</div>"; // Close outer wrapper
?>
