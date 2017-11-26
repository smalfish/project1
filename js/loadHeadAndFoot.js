/**
 * Created by web-01 on 2017/10/26.
 */
$("#header").load("header.html",function () {
    var isLogin=$("#list ul li:first"),
        loginout=$("#list ul li:eq(1)"),
    uname=sessionStorage.getItem("uname");
    let uid=sessionStorage.getItem('uid'),
        record=$('.record');
    var shelper=
        $("#shelper")[0],txtSearch=$("#textSearch")[0];
    if(uname){
        isLogin.html("<a>欢迎回来："+uname+"</a>");
        loginout.html("<a href='javascript:;' id='btn2'>退出登录</a>")
    };
    window.onclick=function(e){
        if(e.target.id!="shelper"&&e.target.id!="textSearch") {
            shelper.style.display = "none";
        }
    };
    $("#showLogin").click(function () {
        $(".login-bg").show();
    })
    $(".close").click(function () {
        console.log($(".close1"));
        $(this).parent().parent().parent().parent().hide();
    });
    txtSearch.onfocus=
        txtSearch.onkeyup=function(e) {
            var txt = this;
            if (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13) {
                if (txt.value != "") {
                    shelper.style.display = "block";
                    ajax("get", "data/01-index/search.php?kw=" + txt.value)
                        .then(data => {
                            if (data.length > 0) {
                                var html = "";
                                for (var obj of data) {
                                    html +=
                                        `<li title="${obj.title}">
                                           <div class="search-item"><a href="playpage.html?mid=${obj.mid}">${obj.title}</a></div>
                                         </li>`
                                }
                                shelper.innerHTML = html;
                            } else {
                                shelper.innerHTML = "未找到匹配商品";
                            }
                        })
                }
            }
        };
		if(uid){
          record.prev().click(function (e) {
            e.preventDefault();
            record.toggle();
          })
		}
        $.ajax({
            type:'GET',
            url:'data/01-index/record.php',
            data:{uid},
            success:function (data) {
                var str='<ul>';
                for(item of data){
                    str+=`<li>${item.aid+'.'+item.title+'已播放到'+item.play_time}</li>`
                }
                str+='</ul>';
                record.html(str);
            }
        })
    $("#btn2").click(function (e) {
        e.preventDefault();
        sessionStorage.clear();
        console.log(sessionStorage.getItem('uname'));
        location.reload();
    })
});
$("#footer").load("footer.html");
(()=>{
    function goTop(temp,time){
	temp=temp||0.1;
	time=time||10;
	var speed=1+temp;
	var oTop=$('#toTop');
	oTop.mouseover(function(){
	  this.style.color = "#ffffff"; 
      this.style.textIndent = "0em"; 
      this.style.backgroundImage = "none"; 
      this.style.backgroundColor = "#FF4401";
	})
    oTop.mouseleave(function(){
	  this.style.textIndent = "-9999em"; 
      this.style.backgroundImage = "url(img/icon.png)"; 
	})
	function getScrollTop() { //取得滚动条的竖直距离 
       return document.documentElement.scrollTop || document.body.scrollTop; 
    }
    function setScrollTop(value) { //设置滚动条的竖直距离
       document.documentElement.scrollTop = value; 
       document.body.scrollTop = value; 
    }
	window.onscroll=function(){
	    var scrolltop = getScrollTop();
	    if(scrolltop>500){
		    oTop.show();
		}else{
		    oTop.hide();
		}
	};
   oTop.click(function(){
	   var timer=setInterval(function(){
	      setScrollTop(Math.floor(getScrollTop()/speed));//取得滚动条竖直距离，除以speed后再给滚动条设置竖直距离 
	      if(getScrollTop()==0)
			  clearInterval(timer);
	   },time);
   })
  }
   goTop(0.1,16);
})();