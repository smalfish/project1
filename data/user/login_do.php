<?php
  header("Content-Type:application/json;charset=utf-8");
  require_once("../init.php");
  $uname=$_REQUEST['uname'];
  $upwd=$_REQUEST['password'];
  $sql="select * from xxy_user where uname='$uname' and upwd='$upwd'";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_assoc($result);
  if($row==null){
    echo '{"code":-1,"msg":"用户名或密码不正确"}';
  }else{
    $uid=$row["uid"];
    echo '{"code":1,"msg":"登录成功","uid":'.$uid.'}';
  }
?>