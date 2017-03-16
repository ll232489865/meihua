require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "moduleHtml":'../js/common',
        "powerSwitch":'../js/libs/jquery-powerSwitch',
    }
    ,
    shim: {
         'moduleHtml':{
            exports: 'template'
         }
　　　　}
})
define(['jquery','moduleHtml','powerSwitch'],function($,template,powerSwitch){
    $("#ce_position").find("a").powerSwitch({
        eventType: "hover",
        classAdd: "active",
        animation: "fade",
        autoTime: 5000,
        container: $("#bn_slide"),
        onSwitch: function(image) {
            if (!image.attr("src")) {
                image.attr("src", image.attr("data-src"));
            }
        }
    }).eq(0).trigger("mouseover");
})
    