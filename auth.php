<?php
session_start();

if (!isset($_SESSION['email'])) {
    // Redirect to login page or show error message
    header("Location: login.php");
    exit(); // Stop further execution
}
?>
