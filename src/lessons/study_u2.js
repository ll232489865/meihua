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
					showVideo(unitData);
				}
			},
			error: function() {
				alert("获取数据异常");
			}
		});
    };

    function showVideo(unitData){ 

    }


    $(".pic1_t").find(".pic_content").on("mouseover",function(){ 
       	$(".dialog_1").show();	
    }).on("mouseout",function(){ 
    	$(".dialog_1").hide();	
    });

    $(".pic2_t").find(".pic_content").on("mouseover",function(){ 
       	$(".dialog_2").show();	
    }).on("mouseout",function(){ 
    	$(".dialog_2").hide();	
    });

    $(".pic3_t").find(".pic_content").on("mouseover",function(){ 
       	$(".dialog_3").show();	
    }).on("mouseout",function(){ 
    	$(".dialog_3").hide();	
    });

    $(".pic4_t").find(".pic_content").on("mouseover",function(){ 
       	$(".dialog_4").show();	
    }).on("mouseout",function(){ 
    	$(".dialog_4").hide();	
    });


    $(".close").on("click", function() {
		location.href = getUrl + "/lessons/lessons.html";
    });
})
