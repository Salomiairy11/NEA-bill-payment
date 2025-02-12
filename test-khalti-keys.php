<?php
$secretKey = "Key aa815fe4787c4b209f6576ce7b85a10d"; // Include "Key " prefix

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://dev.khalti.com/api/v2/epayment/initiate/"); // Change to live API if needed
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "return_url" => "http://localhost:8080/nea-project/success.php",
    "website_url" => "http://localhost:8080/nea-project/",
    "amount" => 1000,
    "purchase_order_id" => "TestOrder123",
    "purchase_order_name" => "Electricity Bill",
    "customer_info" => [
        "name" => "Salomi",
        "email" => "test@example.com",
        "phone" => "9800000000"
    ]
]));

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: $secretKey",
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Response Code: " . $httpCode . "\n";
echo "Response: " . $response;
?>
