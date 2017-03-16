require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
    }
})
define(['jquery'],function($){
    function fixedFloat(jqobj){
        var height = jqobj.outerHeight();
        var width = jqobj.width()-2;
        var top = jqobj.offset().top
        var flag = true;
        jqobj.wrap("<div class='wrap' style='height:"+height+"px'></div>");
        $(window).scroll(function(){
            if($('body').scrollTop() > top)
            {
                jqobj.css({
                    'position':'fixed',
                    'top':0,
                    'width':width
                })
            }else{
                jqobj.css({
                    'position':'static'
                })
            }
        })
    }
    return {
        fixedFloat:fixedFloat
    }
})