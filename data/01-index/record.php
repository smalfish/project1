<?php
header('Content-Type: application/json;charset=UTF-8');

require_once("../init.php");

$uid=$_REQUEST["uid"];

$sql = "SELECT aid,play_time,(SELECT title FROM film WHERE mid=film_id) AS title FROM xxy_playrecord WHERE user_id=$uid";
echo json_encode(sql_execute($sql));