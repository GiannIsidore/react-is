<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Method: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "inventory_database";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $rawData = file_get_contents("php://input");

    $data = json_decode($rawData);
   
    if (isset($data->delete_item_id)) {
      $delete_item_id = $conn->real_escape_string($data->delete_item_id);
       
        
       
        $sql = "UPDATE `items_table` SET `delete_status`='1',`employee_id`='1' WHERE `item_id`= ?";
        
      
        $stmt = $conn->prepare($sql);
        
     
        $stmt->bind_param("i", $delete_item_id);
        
       
        if ($stmt->execute()) {
          
            echo json_encode(array("success" => true));
        } else {
            
            echo json_encode(array("error" => "Error updating item status: " . $conn->error));
        }
        
      
        $stmt->close();
    } else {
      
        echo json_encode(array("error" => "Missing delete_item_id parameter"));
    }
} else {
  
    echo json_encode(array("error" => "Invalid request method"));
}


$conn->close();
?>