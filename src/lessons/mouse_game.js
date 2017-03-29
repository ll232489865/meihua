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
    var score = 0;
    var mouses = $('#table img');
    var time1
    // 跳出一个地鼠，过一会儿隐藏
    function show(){
        var a = Math.floor(Math.random() * 9);
        var mouse = mouses.get(a);

        $(mouse).addClass('mouseUp').removeClass('mouseDown');

        function hide(){
            $(mouse).addClass('mouseDown').removeClass('mouseUp');
        }
        // setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式
        time = setTimeout(hide, 2500);
        return time
    }
    // 跳出一批地鼠
    function play(){
        var time1 = show();
        var time2 = show();
        var time3 = show();
    }
    // 每隔一段时间跳出一批地鼠
    time1 = setInterval(play, 2000);

    // 打中地鼠
    $('img').click(function(){
        $(this).addClass('mouseDown').removeClass('mouseUp');
        score = score + 10;
        if(score>=100){
            clearInterval(time1);
            alert('游戏结束');
            return
        }
        // 设置id=score的标签的文本内容(在这里指的是p标签)
        $('#score').text('得分：' + score);
        // 设置id=hit标签的src属性值为hit.wav并播放它
        $('#hit').attr('src', '../music/mouse_game/hit.wav').get(0).play();
    });

    // 鼠标被按下时，指针图片改为image/cursor-down.png
    // 鼠标没有被按下时，指针图片改为image/cursor.png
    $('body').mousedown(function(){
        $('#setHeight').css('cursor', 'url(../images/mouse_game/cursor-down.png), auto');
    }).mouseup(function(){
        $('#setHeight').css('cursor', 'url(../images/mouse_game/cursor.png), auto');
    });
})
