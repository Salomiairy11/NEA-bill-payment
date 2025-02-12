<link rel="stylesheet" href="./billTable.css">
<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$host = "localhost";
$user = "root";
$password = "";
$db = "user"; // Database name

$conn = mysqli_connect($host, $user, $password, $db);
if (!$conn) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . mysqli_connect_error()])); 
}

// Fetch customer_id from GET request
if (isset($_GET['customer_id']) && !empty($_GET['customer_id'])) {
    $customerId = $_GET['customer_id'];
} else {
    echo json_encode(['success' => false, 'message' => 'Customer ID is missing']);
    exit;
}

$bills = [];

// Fetch bills for the given customer_id
$query = "SELECT b.billId, b.customer_id, b.meterReadDate, b.previousReading, 
                 b.currentReading, b.consumption, b.payableAmount, b.billDate, b.status,
                 l.email, l.sc_no, l.address, l.phoneNo, l.usertype, l.branch_id, l.demandType,
                 d.value as demand_type, d.rate
          FROM bills b
          INNER JOIN login l ON b.customer_id = l.customer_id
          INNER JOIN demandtype d ON l.demandType = d.value
          WHERE b.customer_id = ?"; 

if ($stmt = $conn->prepare($query)) {
    // Bind customer_id to the query parameter
    $stmt->bind_param("s", $customerId);  // Assuming customer_id is a string

    // Execute the query
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $bills[] = $row;
        }
    }
}
$conn->close();
?>

<script src="https://khalti.com/static/khalti-checkout.js"></script>
<div class="my-bill-container common-styles">
    <div class='headinglogo'>
        <h2 class="section-heading">My Bills</h2>
         <img src="./logo.png" />
    </div>
    <?php if (!empty($bills)) { ?>
        <div class="table-container data-display-card">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Bill No</th>
                        <th>SC No</th>
                        <th>Meter Read Date</th>
                        <th>Previous Reading</th>
                        <th>Current Reading</th>
                        <th>Units Consumed</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($bills as $bill) { ?>
                        <tr>
                            <td><?php echo htmlspecialchars($bill['billId']); ?></td>
                            <td><?php echo htmlspecialchars($bill['sc_no']); ?></td>
                            <td><?php echo htmlspecialchars($bill['meterReadDate']); ?></td>
                            <td><?php echo htmlspecialchars($bill['previousReading']); ?></td>
                            <td><?php echo htmlspecialchars($bill['currentReading']); ?></td>
                            <td><?php echo htmlspecialchars($bill['consumption']); ?></td>
                            <td><?php echo number_format($bill['payableAmount'], 2); ?></td>
                            <td><?php echo htmlspecialchars($bill['status']); ?></td>
                            <td>
                                <?php if ($bill['status'] === 'Unpaid') { ?>
                                    <form method="POST" action="khalti_payment.php">
                                        <input type="hidden" name="bill_id" value="<?php echo htmlspecialchars($bill['billId']); ?>">
                                        <input type="hidden" name="total_amount" value="<?php echo htmlspecialchars($bill['payableAmount']); ?>">
                                        <button type="submit" class="pay-now-button">Pay Now</button>
                                    </form>
                                <?php } else { ?>
                                    <span class="paid-status">Paid</span>
                                <?php } ?>
                            </td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    <?php } else { ?>
        <p class="no-data-message">No bills found.</p>
    <?php } ?>
</div>