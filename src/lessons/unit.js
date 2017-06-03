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
	var getUrl = "http://120.27.224.143:10010";
	if (localStorage.session) {
		session = JSON.parse(localStorage.session);
	}

	var units = JSON.parse(localStorage.getItem("units"));
	var unitNum = template.catchParameter(window.location.href, '#');
	var unit = units[(unitNum-1)];

	var study = unit.study;
	var game = unit.game;
	var song = unit.song;

	console.log(href);
	var href = game.pageTemplates[0].template;//只修改游戏的地址
	$("#game").attr("href",href);
	
	$('#unit').text('Unit' + unitNum);

	$(".close").on("click", function() {
		location.href = getUrl + "/lessons/lessons.html";
	});
})

