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
    $(function(){
        var h = $('#header').outerHeight() +  $('.Foot').outerHeight();
        $('.home_bg').height($(window).height() - h);
    })
});
