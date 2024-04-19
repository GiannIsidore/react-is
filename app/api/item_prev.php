<?php


// Connect to your database
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