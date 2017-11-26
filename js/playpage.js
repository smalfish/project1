(()=>{
	let commentInfo=$('.comment_info')[0];
	let uid=sessionStorage.getItem('uid'),
		textarea=$('#textarea'),
		playFilm=$('#playingfilm'),
	    mid=location.search.slice(5);
	textarea.keyup(()=>{
	  let remaining=140-textarea.val().length;
	  textarea.next().html('还剩'+remaining+'字');
	});
	$("#btn").click(function(e){
	  e.preventDefault();
	  let con=textarea.val();
	  $.ajax({
	    type:'GET',
		url:'http://localhost/myProject/data/playpage/add_comment.php',
        data:{uid,con,mid},
        success:function(data){
		  textarea.val('');
		  location.reload();
		},
        error:function(){
		  alert('网络连接错误');
		}
	  })
	})
	$.ajax({
		type:'GET',
		url:'data/playpage/loadVideo.php?',
		data:{mid:mid},
		success:function (data) {
			 let item=data[0];
             let str='';
			 if(item.play_count>10000)
				 item.play_count=(item.play_count/10000) +'亿';
			 else
				 item.play_count+='万';
			 str+=`<h3>${item.title}</h3>
				  <div class="video-info clearfix">
					<div class="video-left col-sm-6">
						<a href="#" class="piclist_img">
							<img src="${item.pic}" alt="">
						</a>
						<p class="video-time">
							<span>1:00</span>
						</p>
					</div>
					<div class="video-right col-sm-6 text-right">
						<h4>${item.title}</h4>
						<p>${item.play_count}</p>
					</div>
				  </div>`
			playFilm.html(str);
        },
        error:function () {
			alert('网络错误');
        }
	})
	function loadpage(n){
     $.ajax({
       type:'GET',
	   url:'data/playpage/comment.php?',
       data:{filmId:mid,pno:n},
	   success:function(data){
	      let strInfo='';
	      for(ci of data.data){
	        strInfo+=`<li class="comment clearfix">
					    <div class="user">
						   <img src="${ci.avatar}" alt="">
					    </div>
					    <div class="comment-info">
						   <a class="uname" href="#">${ci.user_name}</a>
						   <p class="comment-content">${ci.content}</p>
						   <div class="operate">
							   <span>${'赞('+ci.zan+')'}</span>
							   <span>${'回复('+ci.callback+')'}</span>
							   <span>分享</span>
						   </div>
					    </div>
				      </li>`;
	      }
	      commentInfo.innerHTML=strInfo;
	      var html= "";
           if(data.pno-2>0){
               html += `<a href="javascript:;" class="pager">${data.pno-2}</a>`;
           }
           //判断是否显示上一页
           if(data.pno-1>0){
             html += `<a href="javascript:;" class="pager">${data.pno-1}</a>`;
           }
           html += `<a href="javascript:;" class="pager active">${data.pno}</a>`;
           //判断是否显示下一页
           if(data.pno+1<=data.pageCount){
              html += `<a href="javascript:;" class="pager">${data.pno+1}</a>`;
           }
           //判断是否显示下下一页
           if(data.pno+2<=data.pageCount){
              html += `<a href="javascript:;" class="pager">${data.pno+2}</a>`;
           }
	       $("#pages").html("<a href='javascript:;' class='previous'>上一页</a>"+
		     html+"<a href='javascript:;' class='next'>下一页</a>");
		   if(n==1)
               $("#pages>a:first").addClass("disabled");
		   if(n==data.pageCount)
               $("#pages>a:last").addClass("disabled");
		   if(n!=1&&n!=data.pageCount)
			 $("#pages>a:first","#pages>a:last")
			 .removeClass("disabled");
	    }
      })
    }
    loadpage(1);
	//页码点击触发loadpage事件
    $("#pages").on("click","a:not(.disabled):not(.active)",e=>{
  	  e.preventDefault();
	  var $a=$(e.target);
      var n=parseInt($("#pages>a.active").html());
      console.log(n);
      if($a.html()=="上一页"){
	     loadpage(n-1);
      }else if($a.html()=="下一页"){
	     loadpage(n+1);
      }else{
	     loadpage($a.html());
	  }
    })
})();