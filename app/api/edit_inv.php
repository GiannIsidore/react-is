<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "inventory_database";

$conn = new mysqli($servername, $username, $password, $dbname);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin:  http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");





if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    die();
}

    $rawData = file_get_contents("php://input");

    $data = json_decode($rawData);
   if (isset($data->edit_item_id)) {
  $old_item_id = $conn->real_escape_string($data->edit_item_id);

  if (isset($data->edit_item_name)) {
    $edit_item_name = $conn->real_escape_string($data->edit_item_name);

    $sql = "UPDATE `items_table` SET `item_name` = ? WHERE `item_id` = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $edit_item_name, $old_item_id);
  }
    
            if ($stmt->execute()) {
              if ($stmt->affected_rows > 0) {
                echo json_encode(array("success" => true));
              } else {
                echo json_encode(array("error" => "Item not found"));
              }
            } else {
              echo json_encode(array("error" => "Error updating item: " . $conn->error));
            }
        
            $stmt->close();
        
} else {
    echo json_encode(array("error" => "Invalid request method"));
}

$conn->close();

?>