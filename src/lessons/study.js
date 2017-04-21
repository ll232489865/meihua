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
    $('#canvas').attr('height',$('#ce_slide').height()).attr('width',$('#ce_slide').width())
    
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
})
    