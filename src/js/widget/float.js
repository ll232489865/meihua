require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
    }
})
define(['jquery'],function($){
    function float(jqObj){
        //弹出层的id , 弹出层的宽哦，高，需要添加删除的class，计时器，弹出层容器，弹出层容器宽度
        var dataWarp = jqObj.data('target') ,width ,height ,className ,time, warp = $('#'+dataWarp),className = jqObj.attr('class'),warpWidth;
        function floatTime(){
            time = setTimeout(function() {
                jqObj.removeClass(className+'_on');
                warp.css({ 
                    "display": "none"
                });
            }, 300);
        }
        jqObj.mouseenter(function(){
            //鼠标经来的时候，对上述变量进行赋值
            dataWarp = $(this).data('target');
            width = $(this).innerWidth(),height = $(this).outerHeight(),time;
            warp = $('#'+dataWarp);
            warpWidth = warp.innerWidth() > width ? warp.width() : width;
            //如果计时器存在
            if(time) {
                clearTimeout(time);
            };
            $(this).addClass(className+'_on');
            warp.css({ 
                "display": "block", 
                "top": $(this).offset().top + height-1,
                "left": $(this).offset().left,
                'width':warpWidth
            });
        }).mouseleave(function(event){
            var toEle = $(event.toElement);
            if(toEle.parent()!= warp){
                floatTime();
            }
            
        });
        warp.mouseleave(function(event){
           floatTime();
        }).mouseenter(function(){
            clearTimeout(time);
        });
    }
    return {
        float:float
    }
})