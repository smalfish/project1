<?php
header('Content-Type: application/json;charset=UTF-8');

require_once("../init.php");
$fid=$_REQUEST['fid'];
$sql = "SELECT mid,title,subtitle,pic,(SELECT fname FROM film_family WHERE fid=$fid) AS fname FROM film WHERE family_id=$fid";
echo json_encode(sql_execute($sql));