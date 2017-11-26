<?php
  header("Content-Type:text/plain;charset=UTF-8");
  require_once("../init.php");
  @$uname=$_REQUEST["uname"];
  @$email=$_REQUEST["email"];
  if($uname){
  $sql="select * from xxy_user where uname='$uname'";
  if(count(sql_execute($sql,MYSQLI_ASSOC))==0)
     echo "true";
  else
     echo "false";
  }
  else if($email){
  $sql="select * from xxy_user where email='$email'";
  if(count(sql_execute($sql,MYSQLI_ASSOC))==0)
     echo "true";
  else
     echo "false";
  }else{
  @$phone=$_REQUEST["phone"];
  $sql="select * from xxy_user where phone='$phone'";
  if(count(sql_execute($sql,MYSQLI_ASSOC))==0)
     echo "true";
  else
     echo "false";
  }
?>