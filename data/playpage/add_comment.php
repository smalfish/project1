<?php
  header("Content-Type:text/plain;charset=UTF-8");
  require_once('../init.php');
  $mid=$_REQUEST['mid'];
  $uid=$_REQUEST["uid"];
  $con=$_REQUEST['con'];
  $sql="INSERT INTO xxy_comment_info VALUES (NULL,$mid,$uid,'$con','2017年11月1日',0,0,0)";
  $result=mysqli_query($conn,$sql);
  if($result==true){
    echo '评论成功';
  }else{
    echo '评论失败';
  }
?>