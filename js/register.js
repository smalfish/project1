(()=>{
    var result=true;
	var unameReg=/^[a-zA-Z0-9]{4,8}$/,
        upwdReg=/^[a-zA-Z0-9]{3,8}$/,
		phoneReg=/^(\+86|0086)?\s*1[34578]\d{9}$/,
		emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
    $("input[name=uname]").blur(e=>{
        vali($(e.target),"data/user/vali.php",unameReg);
    })
    function vali($txt,url,reg){
        return new Promise(resolve=>{
            var $span=$txt.parent().next();
            if($txt.val()==""){
                $span.removeClass("right").addClass("error")
                    .text("不能为空！");
                result=false;
            }else if(!reg.test($txt.val())){
			    $span.removeClass("right").addClass("error")
                    .text("格式不正确！");
			}
			else{
                $.get(url,$txt.attr("name")+"="+$txt.val())
                    .then(data=>{
                        if(data=="true"){
                            $span.removeClass("error").addClass("right")
                                .text("可用");
                            result=true;
                            resolve();
                        }else{
                            $span.removeClass("right").addClass("error")
                                .text("不可用");
                            result=false;
                        }
                    })
            }
        })
    }
    $("input[name=email]").blur(e=>{
        vali($(e.target),"data/user/vali.php",emailReg);
    })
    $("input[name=phone]").blur(e=>{
        vali($(e.target),"data/user/vali.php",phoneReg);
    })
    function checkPwd(){
        var $upwd=$("input[name=upwd]"),
            $upwd2=$("#upwd2"),
            $span=$upwd2.parent().next();
        if($upwd.val()!=$upwd2.val()){
            $span.addClass("error").text("两次输入的密码不一致");
            result=false;
        }else{
            $span.removeClass("error").text("");
            result=true;
        }
    }
    $("input[name=upwd]").blur(checkPwd);
    $("#upwd2").blur(checkPwd);
    $("#btn1").click(e=>{
        e.preventDefault();
        Promise.all([
            vali($("input[name=uname]"),"data/user/vali.php",unameReg),
            vali($("input[name=phone]"),"data/user/vali.php",phoneReg),
            vali($("input[name=email]"),"data/user/vali.php",emailReg),
        ]).then(()=>{
            checkPwd();
            if(result){
                $.post("data/user/register.php",
                    $("#form1").serialize())
                    .then(data=>{
                        alert(data);
                    })
            }
        })
    })
})()