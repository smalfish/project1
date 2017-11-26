<?php
header('Content-Type: application/json;charset=UTF-8');
require_once("../init.php");

$filmId=$_REQUEST["filmId"];
@$pno=$_REQUEST["pno"];
$sql="SELECT count(*) FROM xxy_comment_info WHERE film_id=$filmId";
if(!$pno){
  $pno=1;
}else{
  $pno=intval($pno);
}
$output=[
  "recordCount"=>0, 
  "pageSize"=>5, "pageCount"=>0,"pno"=>1,
  "data"=>null   
];
$output["recordCount"]=
  sql_execute($sql)[0]["count(*)"];
$output["pageCount"]=ceil(
  $output["recordCount"]/$output["pageSize"]
);
$sql="SELECT content,user_id,time,zan,callback,(SELECT avatar from xxy_user WHERE user_id=uid) as avatar,(SELECT user_name from xxy_user WHERE user_id=uid) as user_name FROM xxy_comment_info where film_id=$filmId";
$output["pno"]=$pno;
$start=$output["pageSize"]*($pno-1);
$sql=$sql." limit $start,".$output["pageSize"];
$output["data"]=sql_execute($sql);
echo json_encode($output);