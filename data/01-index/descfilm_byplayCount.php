<?php
header('Content-Type: application/json;charset=UTF-8');

require_once("../init.php");

$sql = "SELECT mid,play_count,title,subtitle FROM film ORDER BY play_count DESC LIMIT 0,10";
echo json_encode(sql_execute($sql));