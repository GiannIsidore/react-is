<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
$servername ="localhost";
$username = "root";
$password = "";
$dbname = "inventory_database";

$conn = new mysqli($servername, $username, $password, $dbname);





if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = validateInput($_POST["username"]);
    $password = validateInput($_POST["password"]);

    
    if (empty($username) || empty($password)) {
      echo '<script>alert("username and password are required");</script>';
      
    }
    else{
    // Validate user credentials using prepared statements
    $stmt = $conn->prepare("SELECT * FROM employee_list WHERE employee_username=? AND employee_password=? AND employee_roles=0");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User found, redirect to user dashboard
        $_SESSION['username'] = $username;
        
        exit();
    } else {
        // Check admin credentials using prepared statements
        $stmt = $conn->prepare("SELECT * FROM employee_list WHERE employee_username=? AND employee_password=? AND employee_roles=1");
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Admin found, redirect to admin dashboard
            $_SESSION['username'] = $username;
           
            exit();
        } else {
            // Invalid credentials
            $error_message = "Invalid username or password";

        }
    }

    $stmt->close();
}
}
$conn->close();

function validateInput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>