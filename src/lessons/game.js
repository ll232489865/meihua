require.config({
	paths: {
		"jquery": "../js/libs/jquery.min",
		"common": '../js/common'
	},
	shim: {
		'common': {
			exports: 'common'
		}　　　　
	}
})
define(['jquery', 'common'], function($, common) {
	$(function() {
		var ofenshu = document.getElementById("fenshu");
		var odaojishi = document.getElementById("daojishi");
		var yinyue = document.getElementById("yinyue");
		var wordaudio = document.getElementById("wordaudio"); //单词播放
		var Btn = document.getElementById("btn");
		var audio = document.getElementById("audio");
		var part = document.getElementById("part");
		var integral = document.getElementById("integral");
		var fenshu = 0;
		var next = document.getElementById("next");
		var daojishi = 60;
		var appleMain = document.getElementById("appleMain");
		var currentpart = document.getElementById('currentpart');
		var getUrl = "http://120.27.224.143:10010";
		var unit = "1";
		var　 page = "1";
		var options = {
			part: 0,
			integraljifen: 0,
			currentpart: 1,
			total: 2000000
		}
		var session = {};
		if (localStorage.session) {
			session = JSON.parse(localStorage.session);
		}
		var wordList = []; //记录第一次获取到的所有单词
		var nowIndex = 0; //当前是开始选择的那个单词
		var dataArray = [{
			wordList: ['zhangsan', 'lisi', 'wangwu', 'zhaoliu', 'heihei'],
			audio: '../images/ballon_game/0.mp3',
			targetWord: 'zhangsan'
		}, {
			wordList: ['heihei', 'haha', 'gaga', 'hehe', 'gg'],
			audio: '../images/ballon_game/0.mp3',
			targetWord: 'haha'
		}]


		Btn.onclick = function() {
			$(next).hide();
			Btn.style.display = 'none';
			audio.style.display = 'inline-block';
			part.style.display = 'none';
			integral.style.display = 'none';
			appleMain.style.display = 'block';
			showWords();
		}
		$(".appleItem").click(function() {
			var thisHtml = $(this).text();
			//console.log(thisHtml);
			if (thisHtml == dataArray[options.part].targetWord) {
				options.integraljifen += 10;
				$(integral).html(options.integraljifen);
				$(next).show();
				//alert('回答正确，加10分');
			} else {
				alert('回答错误')
				options.integraljifen -= 10;
				if (options.integraljifen <= 0) {
					options.integraljifen = 0
				}
				$(integral).html(options.integraljifen);
			}

		})
		$(next).click(function() {
			if (options.currentpart == options.total) {
				alert('游戏已经结束');
				return;
			}
			//options.part +=1;
			options.currentpart += 1;
			$(currentpart).html(options.currentpart);
			if(wordList.length-1 == nowIndex){ 
				alert("游戏结束");
				return false;
			}
			showWords1(wordList[nowIndex+1],nowIndex+1);
		})

		function showWords() {

			$.ajax({
				url: getUrl + '/v1/unit/' + unit + '/game/page/' + page + '/get',
				type: "get",
				dataType: 'json',
				timeout: 60000,
				headers: {
					"Content-Type": 'application/json',
					'SUPERADMIN-API-KEY': session.apiKey
				},
				success: function(data) {
					wordList = data.data.componentGroups[0].components;
					if (wordList.length > 0) {
						showWords1(wordList[0], 0);
					}

				},
				error: function() {
					alert("获取数据异常");
				}
			});
		}

		function showWords1(wordObj, index) {
			nowIndex = index;
			var refpositon = null;
			words = wordObj.resources;
			if (words) {
				dataArray[options.part].wordList = [];
				for (var i = 0; i < words.length; i++) { //根据position获取到正确等
					if (words[i].type == "sound") {
						refpositon = words[i].refPosition;
						wordaudio.src = getUrl + words[i].content;
					} else {
						if (refpositon == words[i].position) {
							dataArray[options.part].targetWord = words[i].content;
							dataArray[0].targetWord = words[1].content;
						}
						//correctWord = words[i];
						dataArray[options.part].wordList.push(words[i].content);
					}
				}

			}

			dataArray[options.part].wordList.forEach(function(value, index, array) {
				$(appleMain).find('span').eq(index).html(value);
			});
			wordaudio.load();
			wordaudio.play();
		}

		audio.onclick = function() {
			wordaudio.load();
			wordaudio.play();
		}

		$(".close").on("click", function() {
			location.href = getUrl + "/lessons/unit.html#" + unit;
		});

	})

})