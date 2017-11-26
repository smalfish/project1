<?php
header('Content-Type: application/json;charset=UTF-8');

require_once("../init.php");
$mid=$_REQUEST['mid'];
$sql = "SELECT title,goat,play_count,pic FROM film WHERE mid=$mid";
echo json_encode(sql_execute($sql));