require.config({
    paths : {
        "moduleHtml":'../js/common',
        "jquery" : "../js/libs/jquery.min",
        "powerSwitch":'../js/libs/jquery-powerSwitch',
    }
    ,
    shim: {
        'moduleHtml':{
            exports: 'template'
         }
         ,
         'powerSwitch':{
            deps: ['jquery'],
            exports: '$'
         }
　　　　}
})

define(['moduleHtml','jquery'],function(template,$){
    
});