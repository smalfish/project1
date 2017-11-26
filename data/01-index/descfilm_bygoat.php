<?php
header('Content-Type: application/json;charset=UTF-8');

require_once("../init.php");

$sql = "SELECT mid,goat,title,subtitle FROM film ORDER BY goat DESC LIMIT 0,10";
echo json_encode(sql_execute($sql));