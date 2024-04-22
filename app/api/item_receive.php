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

// Connect to your database


if (isset($_POST['add_item_id']) && isset($_POST['employee_id'])) {
    $employee_id = $_POST['employee_id'];
    $add_item_id = $_POST['add_item_id'];
    $add_serial_number = $_POST['add_serial_number'];
    $add_quantity = $_POST['add_quantity'];

    $result = $mysqli->query("INSERT INTO item_logs_timestamp(item_id,item_quantity,logs_status_id,employee_id,item_serial_number) VALUES('$add_item_id','$add_quantity',1,'$employee_id','$add_serial_number')");
    if ($result === TRUE) {
        echo '<script>alert("Quantity recorded successfully");</script>';
    } else {
        echo "Error: " . $mysqli->error;
    }
}
// Fetch data from your database (replace 'your_table' with your actual table name)
$sql = "SELECT i.logs_timestamp_id,
      i.logs_timestamp,
        it.item_name,
        i.item_serial_number,
        ls.log_status_name,
        i.item_quantity,
        el.employee_lname,
        el.employee_fname
    FROM item_logs_timestamp i
    INNER JOIN items_table it ON it.item_id=i.item_id
    INNER JOIN employee_list el on el.employee_id=i.employee_id
    INNER JOIN logs_status ls ON ls.log_status_id=i.logs_status_id
    WHERE i.logs_status_id=1
    ORDER BY i.logs_timestamp DESC";
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