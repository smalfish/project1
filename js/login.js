$("#btn1").click(function (e) {
    e.preventDefault();
    n=$("#uname").val();
    p=$("#upwd").val();
    var unameReg=/^[a-zA-Z0-9]{4,8}$/;
    var upwdReg=/^[a-zA-Z0-9]{3,8}$/;
    if(!unameReg.test(n)){
        alert("用户名格式不正确，字母数字6~8位");
        return;
    }
    if(!upwdReg.test(p)){
        alert("密码格式不正确，字母数字3~8位");
        return;
    }
    $.ajax({
        type:'GET',
        url:'data/user/login_do.php',
        data:{uname:n,password:p},
        success:function (data) {
            if(data.code>0){
                sessionStorage.setItem("uname",n);
                sessionStorage.setItem("uid",data.uid);
                sessionStorage.setItem("password",p);
                location.href=document.referrer;
            }else{
                alert(data.msg);
            }
        },
        error:function (data) {
            alert("您的网络出现故障");
        }

    })
})
