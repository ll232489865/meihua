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
    var getUrl = "http://120.27.224.143:10010";

    $('#unit').text('Unit'+template.catchParameter(window.location.href,'#'));

    $(".close").on("click", function() {
		location.href = getUrl + "/lessons/lessons.html";
	});
})
