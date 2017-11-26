<?php
header('Content-Type: application/json;charset=UTF-8');

require_once("../init.php");

$sql = "SELECT mid,goat,pic,film_state FROM film";
echo json_encode(sql_execute($sql));