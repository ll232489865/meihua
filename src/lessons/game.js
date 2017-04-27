require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "common":'../js/common'
    }
    ,
    shim: {
         'common':{
            exports: 'common'
         }
　　　　}
})
define(['jquery','common'],function($,common){
	$(function(){
	var ofenshu = document.getElementById("fenshu");
	var odaojishi = document.getElementById("daojishi");
	var yinyue = document.getElementById("yinyue");
	var Btn = document.getElementById("btn");
	var audio = document.getElementById("audio");
	var part = document.getElementById("part");
	var integral = document.getElementById("integral");
	var fenshu = 0;
	var next = document.getElementById("next");
	var daojishi = 60;
	var appleMain = document.getElementById("appleMain");
	var currentpart = document.getElementById('currentpart');
	var options = {
		part : 0,
		integraljifen:0,
		currentpart:1,
		total:2
	}
	var dataArray  = [
		{
			wordList:['zhangsan','lisi','wangwu','zhaoliu','heihei'],
			audio:'../images/ballon_game/0.mp3',
			targetWord:'zhangsan'
		}
		,
		{
			wordList:['heihei','haha','gaga','hehe','gg'],
			audio:'../images/ballon_game/0.mp3',
			targetWord:'haha'
		}
	]
	dataArray[options.part].wordList.forEach(function(value, index, array){
		$(appleMain).find('span').eq(index).html(value);
	});
	Btn.onclick = function () {
		$(next).hide();
		Btn.style.display = 'none';
		audio.style.display = 'inline-block';
		part.style.display = 'inline-block';
		integral.style.display = 'block';
		appleMain.style.display = 'block';
	}
	$(".appleItem").click(function(){
		var thisHtml = $(this).text();
		console.log(thisHtml);
		if(thisHtml == dataArray[options.part].targetWord){
			options.integraljifen += 10;
			$(integral).html(options.integraljifen);
			$(next).show();
			alert('回答正确，加10分');
		}else{
			alert('回答错误，扣10分')
			options.integraljifen -= 10;
			if(options.integraljifen<=0){
				options.integraljifen =0
			}
			$(integral).html(options.integraljifen);
		}
		
	})
	$(next).click(function(){
		if(options.currentpart == options.total){
			alert('游戏已经结束');
			return;
		}
		options.part +=1;
		options.currentpart+=1;
		$(currentpart).html(options.currentpart);
		dataArray[options.part].wordList.forEach(function(value, index, array){
			$(appleMain).find('span').eq(index).html(value);
		});
		
	})
	})
    
})
    