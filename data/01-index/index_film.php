<?php
header('Content-Type: application/json;charset=UTF-8');

require_once("../init.php");

$sql = "SELECT title,subtitle,img,href FROM xxy_index_film";
echo json_encode(sql_execute($sql));