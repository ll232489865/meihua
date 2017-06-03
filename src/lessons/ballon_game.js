require.config({
	paths: {
		"jquery": "../js/libs/jquery.min",
		"moduleHtml": '../js/common'
	},
	shim: {
		'moduleHtml': {
			exports: 'template'
		}　　　　
	}
})
define(['jquery', 'moduleHtml'], function($, template) {


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
	  var getUrl = "http://120.27.224.143:10010";
	  var unit = "1";
	  var page = '1';
	  var header  = template.getApiKey();

	  var constant = {
	  	   maxScore : 2000000,
	  	   maxPart : 5,
	  	   nowPart : 1
	  };
		var ofenshu = document.getElementById("fenshu");
		var odaojishi = document.getElementById("daojishi");
		var yinyue = document.getElementById("yinyue");
		var wordaudio = document.getElementById("wordaudio");//单词播放
		var Btn = document.getElementById("btn");
		var audio = document.getElementById("audio");
	    var part = document.getElementById("part");
		var integral = document.getElementById("integral");
		var $nextGame = $("#nextGame");//下一个游戏
		var fenshu = 0;
		var next = document.getElementById("next");
		var daojishi = 60;
		var integraljifen = 0
		var nowIndex = 0; //当前是开始选择的那个单词
		var wordList = []; //记录第一次获取到的所有单词


		//当页面上出现功能类似、属性类型，什么都类似的东西
		//应该封装成一个类
		function Ballon(wordList,audioUrl,targetWord,index){
			this.top = 600 - Math.random() * 150;
			this.minTop = Math.random() * 100;
			this.left = 200 + this.Objlist.length % 5 * 164 + (10+Math.random()*(50-10+1));
			this.score = parseInt(Math.random() * 5) + 1;
			this.targetWord = targetWord;
			this.wordList = wordList;
			this.audioUrl = audioUrl;
			this.index = index;
			this.flyspeed = (20+Math.random()*(40-20+1));
			this.init();
			this.fly();
		}
		Ballon.prototype = {
			Objlist:[],
			createTime:null,
			ballNum:5,

		};
		//初始化
		Ballon.prototype.init = function(){
			//创建DOM，并且给这个对象的dom属性
			this.dom = document.createElement("div");
			this.dom.innerHTML = this.wordList;

			//更改类名
			this.dom.className = "ballon";
			//追加这个DOM元素
			document.body.appendChild(this.dom);
			//设置样式
			this.dom.style.left = this.left + "px";
			this.dom.style.top = this.top + "px";
			this.dom.setAttribute('world',this.wordList);
			this.dom.setAttribute('data-index',this.index);

			//设置背景定位，背景定位要根据自己的分数来设置。
			//精灵图有bug，分数和自己的真实用图差了1。
			var x = -(this.score - 1) % 5 * 164;
			var y = 0;
			this.dom.style.backgroundPosition = x + "px " + y + "px";

			var self = this;
			//绑定监听
			this.dom.onclick = function(){
				var that = this;
				//如果是错的气球，则因藏匿其他的气球
				if(this.getAttribute('world')!=self.targetWord)
				{
					self.bomb();
					if(integraljifen>=10){
						integraljifen -= 10;
						integral.innerHTML = integraljifen;
					}
					//音效

					yinyue.load();
					yinyue.play();
				}else{
					clearInterval(self.timer);
					//积分+10
					integraljifen += 10;
					//积分设置
					integral.innerHTML = integraljifen;
					if(integraljifen == constant.maxScore){ //100分
						if(constant.nowPart == constant.maxPart){
							$nextGame.show();
							$(".ballon").hide();
							$(next).hide();
							//return;
						}else{
							constant.nowPart++;
							$(part).html(constant.nowPart+"/"+constant.maxPart);
							integraljifen = 0;
							integral.innerHTML = integraljifen;
							$(next).show();
						}
					}else{
						$(next).show();
					}
					//设置是否继续创建标识
					Ballon.createTime = true ;
					//便利气球数组
					//console.log(self.Objlist);
					self.Objlist.forEach(function(value, index, array){

						//如果是对的气球，则因藏匿其他的气球并且移除DOM
						if(value.dom.innerHTML != self.targetWord){
							value.dom.style.display = 'none';
							setTimeout(function() {
								if(self.Objlist.length > 1){
									document.body.removeChild(value.dom);
									self.Objlist.splice(that.getAttribute('data-index')-1,1)
								}
							});

						}
					});
					self.dom.className = 'ballon'
					self.dom.onclick = null;
					self.Objlist.splice(this.getAttribute('data-index')-1,1)
					$(self.dom).addClass('sucss animate3');
					$(self.dom).css({ "left": "50%", "top": "50%" , "marginLeft": "-80px" , "marginTop": "-200px" });
					//$(next).show();
				}

			}
			this.Objlist.push(this);
		}
		Ballon.prototype.fly = function(){
			//备份this
			var self = this;
			//自己有自己的定时器
			this.timer = setInterval(function(){
				//更改top值
				self.top -= 2 * 1;
				//小于-100
				if(self.top < self.minTop){
					// self.bomb();
					self.dom.className ="ballon animate"
					clearInterval(self.timer);
				}
				self.dom.style.top = self.top + "px";
			},self.flyspeed);
		}
		//爆炸方法
		Ballon.prototype.bomb = function(){
			clearInterval(this.timer);
			this.Objlist.splice(this.dom.getAttribute('data-index')-1,1)

			//移除DOM

			document.body.removeChild(this.dom);

		}

		var frameCount = 0;
		//让定时器每500毫秒一个球

		//开始方法，点击按钮与下一条按钮相同
		Btn.onclick = function () {
			var times = 5;
		    Btn.style.display = 'none';
			audio.style.display = 'inline-block';
			part.style.display = 'inline-block';
			integral.style.display = 'none';
			showWords();
	}


	next.onclick = function(){
		$('.ballon').remove();
		if(nowIndex == wordList.length-1){
			//updateGrade();
			alert("游戏结束");
			return false;
		}
		showWords1(wordList[nowIndex+1],nowIndex+1);
	}

	showWords = function(){
		var refpositon = null;
     	  $.ajax({
                url:getUrl+'/v1/unit/'+unit+'/game/page/'+page+'/get',
                type:"get",
                dataType:'json',
                timeout:60000,
                headers:header,
                success:function(data){
                	wordList = data.data.componentGroups[0].components;
                	if (wordList.length > 0) {
						showWords1(wordList[0], 0);
					}
                },
                error:function(){
                	alert("获取数据异常");
                }
            });
	}

	showWords1 = function(wordObj,index){
		nowIndex = index;
		words = wordObj.resources;
		if(words){
			dataArray[0].wordList = [];
			for(var i=0;i < words.length;i++ ){ //根据position获取到正确等
				if (words[i].type == "sound") {
					refpositon = words[i].refPosition;
					wordaudio.src = getUrl+words[i].content;
				}else{
					if(refpositon == words[i].position){
 						correctWord = words[i].content;
				     	dataArray[0].targetWord = words[1].content;
					}
						//correctWord = words[i];
						dataArray[0].wordList.push(words[i].content);
				}
			}

		}

				     	Ballon.Objlist = [];
						Ballon.createTime = null;
						var times = 5;
						    Btn.style.display = 'none';
							audio.style.display = 'inline-block';
							part.style.display = 'inline-block';
							integral.style.display = 'none';
							var timer = setInterval(function(){
								if (times > 0 && !(Ballon.createTime))
								{
									new Ballon(dataArray[0].wordList[5-times],wordaudio.src,correctWord,[5-times]);
									times--;
								}else{
									clearInterval(timer);

								}
								if(times == 2){
									wordaudio.load();
					   				 wordaudio.play();
								}
						},1000);
	}

	$nextGame.on("click",function(){
		location.href = "game.html";
	});

	audio.onclick = function(){
		wordaudio.load();
		wordaudio.play();
	}

	$(".close").on("click",function(){
           location.href = getUrl + "/lessons/unit.html#"+unit;
	});

	function updateGrade() {
		var param = {"unit": unit,"part": "game","page": page,"grade": 0};
			$.ajax({
				url: getUrl + '/v1/progress/update',
				type: "post",
				dataType: 'json',
				timeout: 60000,
				data: JSON.stringify(param),
				headers: header,
				success: function(data) {
					//TODO 更新本地的进度
				},
				error: function() {
					alert("更新数据异常");
				}
			});
		}

})