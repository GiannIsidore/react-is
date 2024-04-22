<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "inventory_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Update the origin to match your React app's origin
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond to preflight requests
    header("HTTP/1.1 200 OK");
    exit();
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true); // Get the raw POST data
    
    if (isset($data['save'])) {
        $itemName = isset($data['item_name']) ? $data['item_name'] : '';
        $employee_id = isset($_SESSION['employee_id']) ? $_SESSION['employee_id'] : ''; // Make sure to set the employee_id
        
        // Check if item with the same name already exists
        $item_check = $conn->query("SELECT item_id FROM items_table WHERE item_name = '$itemName'") or die($conn->error);
        
        if ($item_check->num_rows > 0) {
            // Item already exists
            $response = "Error: The item is already registered.";
        } else {
            // Item does not exist, insert into database
            $conn->query("INSERT INTO items_table(item_name, employee_id) VALUES ('$itemName', '$employee_id')") or die($conn->error);
            $response = "Item successfully recorded";
        }
        
        echo json_encode($response); // Return response to client
    }
}
?>