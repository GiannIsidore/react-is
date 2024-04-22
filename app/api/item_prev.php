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
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Method: GET, POST, OPTIONS");
header("Access-Control-Allow-Method: Content-Type, Authorization");
include '../class/delete.php';
include '../class/edit.php';
 if (isset($_POST['btn_delete'])){
          $db_delete=new soft_delete();
          $delete_item_id=$_POST['delete_item_id'];
          $db_delete->delete_item($delete_item_id);
         
        }
        if (isset($_POST['btn_edit'])){
          $db_manager=new edit_data();
          $edit_item_id=$_POST['edit_item_id'];
          $edit_item_name=$_POST['edit_item_name'];

          $item_check = $mysqli->query("SELECT item_id FROM items_table WHERE item_name = '$edit_item_name'") or die($mysqli->error);

          if ($item_check->num_rows > 0) {
            
            $error_message = "Error: The Item is already registered.";
            }else{
            
             
              $db_manager->edit_item($edit_item_id,$edit_item_name);
         
              
          }
        
      }
// Fetch data from your database (replace 'your_table' with your actual table name)
$sql = "SELECT i.item_id,
      i.item_name,
      el.employee_lname,
      COALESCE(SUM(CASE WHEN ilt.logs_status_id = 1 THEN ilt.item_quantity ELSE 0 END), 0) AS Total_added,
      COALESCE(SUM(CASE WHEN ilt.logs_status_id = 2 THEN ilt.item_quantity ELSE 0 END), 0) AS Total_deleted,
      COALESCE(SUM(CASE WHEN ilt.logs_status_id = 3 THEN ilt.item_quantity ELSE 0 END), 0) AS Total_released,
      (COALESCE(SUM(CASE WHEN ilt.logs_status_id = 1 THEN ilt.item_quantity ELSE 0 END), 0)
       - COALESCE(SUM(CASE WHEN ilt.logs_status_id = 2 THEN ilt.item_quantity ELSE 0 END), 0) 
       - COALESCE(SUM(CASE WHEN ilt.logs_status_id = 3 THEN ilt.item_quantity ELSE 0 END), 0)) AS Total_quantity
      FROM items_table i
      INNER JOIN employee_list el ON i.employee_id = el.employee_id
      LEFT JOIN item_logs_timestamp ilt ON i.item_id = ilt.item_id
      WHERE i.delete_status = 0
      GROUP BY i.item_id, i.item_name, el.employee_lname";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Output data as JSON
echo json_encode($data);

// Close connection
$conn->close();
?>