(()=>{
    var bannerImgs=$("[data-load=bannerImgs]")[0],
        bannerInds=$("[data-load=bannerInds]")[0],
        n=0,LIWIDTH=1180,TRANS=300,INTERVAL=2000,
        timer=null;
    $.get("data/01-index/banners.php")
        .then(data=>{
            var banners=[...data];
            banners.push(banners[0]);
            var strImgs='';
            for(var img of banners){
                strImgs+=`<li>
                            <a href="${img.href}">
                              <img src="${img.img}">
                            </a>
                          </li>`
            }
            var strInds="<li></li>".repeat(banners.length-1);
            bannerImgs.innerHTML=strImgs;
            bannerImgs.style.width=1180*banners.length+"px";
            bannerInds.innerHTML=strInds;
            bannerInds.children[0].className="hover";
        return new Promise(resolve=>resolve());
    }).then(()=>{
        function moveOnce() {
            n++;
            var left=LIWIDTH*n;
            bannerImgs.style.left=-left+"px";
            bannerInds.children[n-1].className="";
            if(n==bannerImgs.children.length-1){
                bannerInds.children[0].className="hover";
                setTimeout(()=>{
                    bannerImgs.style.transition="";
                    bannerImgs.style.left=0;
                    n=0;
                    setTimeout(()=>{
                        bannerImgs.style.transition="all ."+TRANS/100+"s linear";
                    },100)
                },TRANS);
            }else
                bannerInds.children[n].className="hover";
        }
        timer=setInterval(moveOnce,INTERVAL+TRANS);
        return new Promise(resolve=>resolve(moveOnce));
    }).then((moveOnce)=>{
        bannerImgs.parentNode.onmouseover=function () {
            clearInterval(timer);
            timer=null;
        }
        bannerImgs.parentNode.onmouseout=function(){
            timer=setInterval(moveOnce,INTERVAL+TRANS);
        }
        for(let i=0;i<bannerInds.children.length;i++){
            bannerInds.children[i].onclick=function(){
                n=i;
                bannerImgs.style.left=-n*LIWIDTH+"px";
                bannerInds.querySelectorAll(".hover")[0].className="";
                bannerInds.children[i].className="hover";
            }
        }
        $("[data-move=left]")[0].onclick=function(e){
            e.preventDefault();
            if(n>0){
                n--;
                bannerImgs.style.left=-n*LIWIDTH+"px";
                bannerInds.children[n+1].className="";
                bannerInds.children[n].className="hover";
            }else{
                bannerImgs.style.transition="";
                n=bannerImgs.children.length-1;
                bannerImgs.style.left=-n*LIWIDTH+"px";
                setTimeout(()=>{
                    bannerImgs.style.transition=
                        "all ."+TRANS/100+"s linear";
                    n--;
                    bannerImgs.style.left=-n*LIWIDTH+"px";
                    bannerInds.children[0].className="";
                    bannerInds.children[n].className="hover";
                },100)
            }
        }
        $("[data-move=right]")[0].onclick=function(e){
            e.preventDefault();
            if(n<bannerInds.children.length-1){
                n++;
                bannerImgs.style.left=-n*LIWIDTH+"px";
                bannerInds.children[n-1].className="";
                bannerInds.children[n].className="hover";
            }else{
                n++;
                bannerImgs.style.left=-n*LIWIDTH+"px";
                bannerInds.lastElementChild.className="";
                bannerInds.firstElementChild.className="hover";
                setTimeout(()=>{
                    bannerImgs.style.transition="";
                    bannerImgs.style.left=0;
                    n=0;
                    setTimeout(()=>{
                        bannerImgs.style.transition=
                            "all ."+TRANS/100+"s linear";
                    },100)
                },TRANS)
            }
        }
    })
})();
(()=>{
    var recommendImgs=$("[data-load=recommendImgs]")[0],
        m=0,LIWIDTH=2.95,TRANS=3,INTERVAL=20,
        timer=null;
    $.get("data/01-index/recommend.php")
        .then(data=>{
            var banners=[...data];
            banners.push(banners[0]);
            banners.push(banners[1]);
            banners.push(banners[2]);
            banners.push(banners[3]);
            var strImgs='';;
            for(var img of banners){
                strImgs+=`<li>
                            <a href="${img.href}">
                              <img src="${img.img}">
                            </a>
                          </li>`
            }
            recommendImgs.innerHTML=strImgs;
            return new Promise(resolve=>resolve());
        }).then(()=>{
        function moveOnce() {
            m++;
            var left=LIWIDTH*m;
            recommendImgs.style.left=-left+"px";
            if(m==(recommendImgs.children.length-4)*100){
                setTimeout(()=>{
                    recommendImgs.style.transition="";
                    recommendImgs.style.left=0;
                    m=0;
                    setTimeout(()=>{
                        recommendImgs.style.transition="all ."+TRANS/100+"s linear";
                    },100)
                },TRANS);
            }
        }
        timer=setInterval(moveOnce,INTERVAL+TRANS);
        return new Promise(resolve=>resolve(moveOnce));
    }).then((moveOnce)=>{
        recommendImgs.parentNode.onmouseover=function () {
            clearInterval(timer);
            timer=null;
        }
        recommendImgs.parentNode.onmouseout=function(){
            timer=setInterval(moveOnce,INTERVAL+TRANS);
        }
    })
})();
(()=>{
   var btns=$("[data-trigger=tab]");
   var contents=$("#container .tab_img");
   var hotMovie=$("[data-load=hotMovie]")[0];
   var charts1=$("[data-load=charts1]")[0];
   var charts2=$("[data-load=charts2]")[0];
   var playUrl='playpage.html?mid=';
   contents[0].style.zIndex=10;
    for(var btn of btns){
       btn.onclick=function(e){
		e.preventDefault();
        var $tab=$(this).parent();
		    if(!$tab.hasClass("class")){
			  $tab.addClass("active").siblings().removeClass("active");
                $(this).addClass("active").parent().siblings().children().removeClass("active");
			}
        var i=this.href.lastIndexOf('#');
        var id=this.href.slice(i+1);
        for(var con of contents){
		   if(con.id==id){
		     con.style.zIndex=10;
		   }else{
		     con.style.zIndex="";
		   }
		}}
	}
	$.ajax({
        type:"GET",
        url:"data/01-index/index_film.php",
        success:function (data) {
           var strImgs='';
           for(img of data){
               strImgs+=`<li>
							   <a href="playpage.html">
								   <img src="${img.img}" alt="">
							   </a>
							   <div class="tabs">
								   <a href="playpage.html">立即播放</a>
								   <div class="percentage">
									   <h3 class="maintitle">${img.title}</h3>
									   <p class="subtitle">${img.subtitle}</p>
								   </div>
							   </div>
						   </li>`
           }
           hotMovie.innerHTML=strImgs;
        },
        error:function(){
            alert('网络错误');
        }
    });
	$.ajax({
        type:"GET",
        url:"data/01-index/descfilm_bygoat.php",
        success:function (data) {
           var strImgs='';
           for(var item of data){
               strImgs+=`<ul class="mov_list">
				<li  class="fa fa-star">★</li>
				<li class="two">${item.goat}</li>
				<li><a href="${playUrl+item.mid}">${item.title}</a></li>
			  </ul>`
           }
            charts1.innerHTML=strImgs;
        },
        error:function(){
            alert('网络错误');
        }
    });
	$.ajax({
        type:"GET",
        url:"data/01-index/descfilm_byplayCount.php",
        success:function (data) {
           var strImgs='';
           for(var item of data){
               if(item.play_count>10000)
                   item.play_count=(item.play_count/10000) +'亿';
               else
                   item.play_count+='万';
               strImgs+=`<ul class="mov_list">
				<li  class="fa fa-star">★</li>
				<li class="two">${item.play_count}</li>
				<li><a href="${playUrl+item.mid}">${item.title}</a></li>
			  </ul>`
           }
            charts2.innerHTML=strImgs;
        },
        error:function(){
            alert('网络错误');
        }
    });
	function loadList(number){
	 var content=$("#content"+number);
	 $.ajax({
        type:"GET",
        url:"data/01-index/film_state.php",
        success:function (data) {
           var str='';
           for(var item of data){
               if(item.film_state==number){
               str+=`<li>
						   <a href="${playUrl+item.mid}">
							   <img src="${item.pic}" alt="">
						   </a>
						   <div class="tabs">
							   <a href="${playUrl+item.mid}">立即播放</a>
							   <div class="percentage">
								   <h5>评分</h5>
								   <p>${item.goat}</p>
							   </div>
						   </div>
					   </li>`
               }
		   }
            content.html(str);
        },
        error:function(){
            alert('网络错误');
        }
     })
	};
	loadList(1);
	loadList(2);
	loadList(3);
})();