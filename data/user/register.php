<?php 
  header("Content-Type:text/plain;charset=UTF-8");
	#1、获取请求提交的数据
	$uname=$_REQUEST["uname"];
	$upwd=$_REQUEST["upwd"];
	$email=$_REQUEST["email"];
	$phone=$_REQUEST["phone"];
	#2、连接到数据库
  require_once("../init.php");
	#3、执行数据库操作
	$sql="insert into xxy_user(uname,upwd,email,phone,avatar) values('$uname','$upwd','$email','$phone','img/avatar/default.png')";
	$result=mysqli_query($conn,$sql);
	if($result === true){
		echo "注册成功";
	}else{
		echo "注册失败";
	}
?>