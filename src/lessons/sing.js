require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "jpalayer" : "../js/libs/jquery.jplayer",
        "lrc" : "../js/libs/lrc",
        "moduleHtml":'../js/common'
    }
    ,
    shim: {
         'moduleHtml':{
            exports: 'template'
         }
         ,
         'lrc':{
            deps: ['jquery'],
            exports: 'lrc'
         }
　　　　}
})
define(['jquery','moduleHtml','jpalayer','lrc'],function($,template,jpalayer){

    //模拟数据
	var getUrl = "http://120.27.224.143:10010";
	var unit = "1";
	var song = "1";


	function initSong(url,lrc){ 
		url = getUrl + url;
		$("#lrc_content").text(lrc);
	    $("#jquery_jplayer_1").jPlayer({
			ready: function (event) {
				$(this).jPlayer("setMedia", {
					mp3:url //mp3的播放地址
				});
			},
			timeupdate: function(event) {
				if(event.jPlayer.status.currentTime==0){
					time = "";
				}else {
					time = event.jPlayer.status.currentTime;
				}
			},
			play: function(event) {
				//点击开始方法调用lrc。start歌词方法 返回时间time
				$.lrc.start($('#lrc_content').val(), function() {
					return time;
				});
			},
			ended:function(event){
				$("#lrc_list").removeAttr("style").html("<li>歌曲播放完毕！</li>");
			},
			swfPath: "/js",  		//存放jplayer.swf的决定路径
			solution:"html, flash", //支持的页面
			supplied: "mp3",		//支持的音频的格式
			wmode: "window"
		});
	}
	

	function loadSong(){ 
		 $.ajax({
                url:getUrl+'/v1/unit/'+unit+'/song/'+song+'/get',                
                dataType:'json',
                timeout:60000,
                headers:{"Content-Type": 'application/json','SUPERADMIN-API-KEY': 'ad4a83aa-bac1-4b94-8981-ba8dbe0b42dd'},                
                success:function(data){                   
                	initSong(data.data.componentGroups[0].components[0].resources[0].content,data.data.componentGroups[0].components[0].resources[1].content);	  
                },
                error:function(){ 
                	alert("获取数据异常");
                }
            });  
	}

	loadSong();
})
    