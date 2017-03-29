require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "moduleHtml":'../js/common'
    }
    ,
    shim: {
         'moduleHtml':{
            exports: 'template'
         }
　　　　}
})
define(['jquery','moduleHtml'],function($,template){
    var ofenshu = document.getElementById("fenshu");
		var odaojishi = document.getElementById("daojishi");
		var yinyue = document.getElementById("yinyue");
		var Btn = document.getElementById("btn");

		var fenshu = 0;
		var daojishi = 60;

		//当页面上出现功能类似、属性类型，什么都类似的东西
		//应该封装成一个类
		function Ballon(){
			this.top = 600;
			this.left = 200 + Math.random() * 800;
			this.score = parseInt(Math.random() * 3) + 1;
			this.init();
			this.fly();
		}
		//初始化
		Ballon.prototype.init = function(){
			//创建DOM，并且给这个对象的dom属性
			this.dom = document.createElement("div");
			this.dom.innerHTML = "Hello";
			//更改类名
			this.dom.className = "ballon";
			//追加这个DOM元素
			document.body.appendChild(this.dom);
			//设置样式
			this.dom.style.left = this.left + "px";
			this.dom.style.top = this.top + "px";
			//设置背景定位，背景定位要根据自己的分数来设置。
			//精灵图有bug，分数和自己的真实用图差了1。
			var x = -(this.score - 1) % 3 * 146;
			var y = 0;
			this.dom.style.backgroundPosition = x + "px " + y + "px";

			var self = this;
			//绑定监听
			this.dom.onclick = function(){
				self.bomb();

				//音效
				yinyue.load();
				yinyue.play();
			}
		}
		Ballon.prototype.fly = function(){
			//备份this
			var self = this;
			//自己有自己的定时器
			this.timer = setInterval(function(){
				//更改top值
				self.top -= 2 * 1;
				//小于-100
				if(self.top < -100){
					self.bomb();
				}
				self.dom.style.top = self.top + "px";
			},30);
		}
		//爆炸方法
		Ballon.prototype.bomb = function(){
			clearInterval(this.timer);
			//移除DOM
			document.body.removeChild(this.dom);
		}

		var frameCount = 0;
		//让定时器每500毫秒一个球
		Btn.onclick = function () {
			var times = 5;
		    Btn.style.display = 'none';
			var timer = setInterval(function(){
				if (times > 0)
				new Ballon();
				times--;
		},1000);
	}
})
    