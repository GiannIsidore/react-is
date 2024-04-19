<?php
$servername="localhost";
$username = "root";
$password = "";
$dbname = "inventory_database";


$conn = new mysqli($servername, $username, $password, $dbname)or die (mysqli_error($conn));


?>