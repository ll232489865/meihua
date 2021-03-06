require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "moduleHtml":'../js/common',
        "powerSwitch":'../js/libs/powerSwitch',
        "canvas":'../js/widget/canval',
    }
    ,
    shim: {
         'moduleHtml':{
            exports: 'template'
         },
         'canvas':{
            exports: 'canvas'
         },
         'powerSwitch':{
            deps: ['jquery'],
            exports: 'powerSwitch'
         }
　　　　}
})
define(['jquery','moduleHtml','powerSwitch','canvas'],function($,template,powerSwitch,canvas){
    // console.log(powerSwitch);
    var getUrl = "http://120.27.224.143:10010";
    var header = template.getApiKey();
    var unit = template.catchParameter(window.location.href, '#');
    var page = '1';
    var unitData = {};
    var yingyueDom = document.getElementById("audio1");

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
    $("#studyContain").css('height',$("#studyContain").parent().height()-100)
    $('#canvas').attr('height',$('#ce_slide').height()-30).attr('width',$('#ce_slide').width())

    $('#pens').click(function(){
        $('#canvas').css('visibility','visible');
        canvas.paint.init(true);
        $('#color').show()
    })
    $('#default').click(function(){
        $('#color').hide()
        canvas.paint.init(false);
        $('#canvas').css('visibility','hidden');
    })
    $(".ce_slide").delegate("img","click",function(){
        var index = $(this).parent().index();
        var aa = createAudio($("#audio"+index).get(0).currentSrc)
        aa.play();
        aa=null;
    })
    function createAudio(src){
        var audio = new Audio();
        audio.src = src;
        return audio
    }








	template.showPaint();
    getData();
    function getData(){ 
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

	//点击事件
	$(".pic_content").on("click",function(){ 
		_show($(this),true);
		if($(this).hasClass('pic1_img')){
            _show($(".dialog_1"),true);
            $(".dialog_1").addClass("readed");
            playSong("Fine");
		} else if($(this).hasClass('pic2_img')){
            _show($(".dialog_2"),true);
            $(".dialog_2").addClass("readed");
            playSong("Hi, how are you?");
        }else if($(this).hasClass('pic3_img')){
            _show($(".dialog_3"),true);
            $(".dialog_3").addClass("readed");
            playSong("Thank you!");
        }else if($(this).hasClass('pic4_img')){
            _show($(".dialog_4"),true);
            $(".dialog_4").addClass("readed");
            playSong("Here you are.");
        }
        updateProgress();
	});



    $(".pic1_t").find(".pic_content").on("mouseover",function(){       
       	_show($(".dialog_1"),true);
    }).on("mouseout",function(){
        _show($(".dialog_1"),false);
    });

    $(".pic2_t").find(".pic_content").on("mouseover",function(){ 
        _show($(".dialog_2"),true);
    }).on("mouseout",function(){
        _show($(".dialog_2"),false);
    });

    $(".pic3_t").find(".pic_content").on("mouseover",function(){
        _show($(".dialog_3"),true);
    }).on("mouseout",function(){
        _show($(".dialog_3"),false);
    });

    $(".pic4_t").find(".pic_content").on("mouseover",function(){ 
        _show($(".dialog_4"),true);
    }).on("mouseout",function(){
        _show($(".dialog_4"),false);
    });


    $(".close").on("click", function() {
		location.href = getUrl + "/lessons/lessons.html";
    });
})
