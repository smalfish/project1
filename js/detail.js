/**
 * Created by web-01 on 2017/10/18.
 */
 (()=>{
	 var contentImgs=$("[data-load=contentImgs]");
	 var li=$(".content-img li");
	 var btnLeft=$("[data-move=left]");
	 var btnRight=$("[data-move=right]");
     var LIWIDTH=1170;
     var movieList=new Array(btnLeft.length).fill(0);
     $.ajax({
         type:"GET",
         url:"data/01-index/film.php",
         success:function (data) {
             var strImgs='';
             var playUrl='playpage.html?mid=';
			 var width=1180*Math.ceil((data.length+1)/6);
			 $('.container .content .content-img').width(width+'px');
             for(var item of data){
                 if(item.mid==1){
                     strImgs+=`<li>
								<a href="${playUrl+item.mid}" class="whenMouseenter">
									<img class="first-img" src="${item.pic}" alt="">
								</a>
                                <div class="play first">
                                    <img src="img/play.png" alt="">
                                </div>
								<a href="${playUrl+item.mid}" class="movieTitle">${item.title}</a>
								<p>${item.subtitle}</p>
							</li>`
                 }else{
                 strImgs+=`<li>
								<a href="${playUrl+item.mid}" class="whenMouseenter">
									<img class="img" src="${item.pic}" alt="">
								</a>
                                <div class="play">
                                    <img src="img/play.png" alt="">
                                </div>
								<a href="${playUrl+item.mid}" class="movieTitle">${item.title}</a>
								<p>${item.subtitle}</p>
							</li>`
                 }
             }
             contentImgs[0].innerHTML=strImgs;
         },
         error:function(){
             alert('网络错误');
         }
     });
	 for (var i = 0; i < btnLeft.length; i++) {
			 btnLeft[i].style.display = "none";
			 btnRight[i].style.display = "block";
	 }
     btnLeft.on('click',function(e){
		var index=$(this).attr('id').slice(1);
        movieList[index]--;
         if (movieList[index] <= 0) {
             btnLeft[index].style.display = "none";
             btnRight[index].style.display = "block";
         } else if (movieList[index] >= 2) {
             btnRight[index].style.display = "none";
             btnLeft[index].style.display = "block";
         }else{
		     btnRight[index].style.display = "block";
             btnLeft[index].style.display = "block";
		 }
		e.preventDefault();
		contentImgs[index].style.left=-movieList[index]*LIWIDTH+"px";
     })
     btnRight.on('click',function(e){
        var index=$(this).attr('id').slice(1);
         movieList[index]++;
         if (movieList[index] <= 0) {
             btnLeft[index].style.display = "none";
             btnRight[index].style.display = "block";
         } else if (movieList[index] >= 2) {
             btnRight[index].style.display = "none";
             btnLeft[index].style.display = "block";
         }else{
		     btnRight[index].style.display = "block";
             btnLeft[index].style.display = "block";
		 }
        e.preventDefault();
        contentImgs[index].style.left=-movieList[index]*LIWIDTH+"px";
     })

     li.on('mouseover',function(e){
         $(this).children('.play').css('display','block');
     })
	 li.on('mouseout',function(e){
         $(this).children('.play').css('display','none');

     })
 })();
