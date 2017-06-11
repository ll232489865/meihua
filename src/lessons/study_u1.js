require.config({
	paths: {
		"jquery": "../js/libs/jquery.min",
		"moduleHtml": '../js/common',
		"powerSwitch": '../js/libs/powerSwitch',
		"canvas": '../js/widget/canval',
	},
	shim: {
		'moduleHtml': {
			exports: 'template'
		},
		'canvas': {
			exports: 'canvas'
		},
		'powerSwitch': {
			deps: ['jquery'],
			exports: 'powerSwitch'
		}　　　　
	}
})
define(['jquery', 'moduleHtml', 'powerSwitch', 'canvas'], function($, template, powerSwitch, canvas) {
	// console.log(powerSwitch);
	var getUrl = "http://120.27.224.143:10010";
	var header = template.getApiKey();
	var unit = template.catchParameter(window.location.href, '#');
	var page = '1';
	var unitData = {};
	var allAudio = [];//获取到的所有音频数据
	var yingyueDom = document.getElementById("audio1");

	template.showPaint();

	$("#ce_position").find("a").powerSwitch({
		eventType: "hover",
		classAdd: "active",
		animation: "fade",
		onSwitch: function(image) {
			if (!image.attr("src")) {
				image.attr("src", image.attr("data-src"));
			}
		}
	}).eq(0).trigger("mouseover");
	$("#studyContain").css('height', $("#studyContain").parent().height() - 100)
	$('#canvas').attr('height', $('#ce_slide').height() - 30).attr('width', $('#ce_slide').width())

	$('#pens').click(function() {
		$('#canvas').css('visibility', 'visible');
		canvas.paint.init(true);
		$('#color').show()
	})
	$('#default').click(function() {
		$('#color').hide()
		canvas.paint.init(false);
		$('#canvas').css('visibility', 'hidden');
	})
	$(".ce_slide").delegate("img", "click", function() {
		var index = $(this).parent().index();
		var aa = createAudio($("#audio" + index).get(0).currentSrc)
		aa.play();
		aa = null;
	})

	function createAudio(src) {
		var audio = new Audio();
		audio.src = src;
		return audio
	}


	$(".pic_content").on("click", function() {
		_show($(this), true);	
		if ($(this).hasClass('s1')) {
			_show($(this).parent().siblings('.text'), true);
			$(this).parent().siblings('.text').addClass('readed');
            playSong("line up");
		} else if ($(this).hasClass('s2')) {
			_show($(".dialog_l"), true);
			$(".dialog_l").addClass("readed");
            playSong("What's your name?");
		} else if ($(this).hasClass('s3')) {
			_show($(".dialog_r"), true);
			$(".dialog_r").addClass("readed");
            playSong("I'm Cindy.");
		} else if ($(this).hasClass('s4')) {
			_show($(this).parent().siblings('.text1'), true);
			$(this).parent().siblings('.text1').addClass('readed');
            playSong("stand up");
		} else if ($(this).hasClass('s5')) {
			_show($(this).parent().siblings('.text2'), true);
			$(this).parent().siblings('.text2').addClass('readed');
            playSong("sit down");
		}
        updateProgress();
	});



	getData();

	function getData() {
		$.ajax({
			url: getUrl + '/v1/unit/' + unit + '/study/page/' + page + '/get',
			type: "get",
			dataType: 'json',
			timeout: 60000,
			headers: header,
			success: function(data) {
				unitData = data.data.componentGroups[0].components;
				if (unitData.length > 0) {
					updateCash(unitData);
				}
			},
			error: function() {
				alert("获取数据异常");
			}
		});
	};

	function updateCash(data) {//更新课程数据
		var item = {};
        unitData = [];
		for(var i =0;i <data.length;i ++){
            item = data[i].resources;
            item.readed = false;
            unitData.push(item);
		}
    }
    
    function  playSong(text) {//根据单词  然后更新缓存中read状态
		var item = {};
		for(var key in unitData){
            item = unitData[key];
            if(item[0].content == text){
                item.readed = true;
                yingyueDom.src =  getUrl + item[1].content;
                yingyueDom.load();
                yingyueDom.play();
                return;
			}
		}
    }


	
	function _show($dom, flag) {
		if (flag) {
			$dom.css({
				'opacity': 1
			});
		} else {
			if ($dom.hasClass('readed')) {
				return
			}
			$dom.css({
				'opacity': 0.3
			});
		}
	}
	
	
	function  updateProgress() {//更新课程进度
		//判断是否需要更新
		for(var i =0;i<unitData.length;i++){
			if(!unitData[i].readed) return;
		}
		//ajax更新
        updateGrade();
    }


    function updateGrade() {
        var param= {};
        param.data = {"unit": parseInt(unit),"part": "study","page": parseInt(page),"grade": 0};
        param.getUrl = getUrl;
        param.header = header;
        template.updateGrade(param);
    }



	//两个弹窗
	$(".pic2_t").find(".pic_left").on("mouseover", function() {
		_show($(".dialog_l"), true);
	}).on("mouseout", function() {
		_show($(".dialog_l"), false);
	});

	$(".pic2_t").find(".pic_right").on("mouseover", function() {
		_show($(".dialog_r"), true);
	}).on("mouseout", function() {
		_show($(".dialog_r"), false);
	});


	$(".pic4_t").find(".pic_1").on("mouseover", function() {
		_show($(this).parents(".pic4_t").find(".text1"), true);
	}).on("mouseout", function() {
		_show($(this).parents(".pic4_t").find(".text1"), false);
	});

	$(".pic4_t").find(".pic_2").on("mouseover", function() {
		_show($(this).parents(".pic4_t").find(".text2"), true);
	}).on("mouseout", function() {
		_show($(this).parents(".pic4_t").find(".text2"), false);
	});



	$(".pic1_t").on("mouseover", function() {
		_show($(this).find(".text"), true);
	}).on("mouseout", function() {
		_show($(this).find(".text"), false);
	});

	$(".close").on("click", function() {
		location.href = getUrl + "/lessons/lessons.html";
	});
})