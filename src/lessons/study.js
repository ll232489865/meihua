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
    var unit = template.catchParameter(window.location.href, '#');
 

    $(".close").on("click", function() {
		location.href = getUrl + "/lessons/lessons.html";
    });
})
