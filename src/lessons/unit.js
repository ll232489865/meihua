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
    var getUrl = "http://192.168.188.128:8881";

    $('#unit').text('Unit'+template.catchParameter(window.location.href,'#'));

    $(".close").on("click", function() {
		location.href = getUrl + "/lessons/lessons.html";
	});
})
