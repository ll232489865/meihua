require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "bootstrap" : "../js/libs/bootstrap.min",
        "moduleHtml":'adminComm',
        "bootstrapValidator":'../js/libs/bootstrapValidator.min',
        "bootstraptable":'../js/libs/bootstrap-table.min',
        "bootstrapzhcn":'../js/libs/bootstrap-table-zh-CN',
        "bootstrapselect":'../js/libs/bootstrap-select.min',
    }
    ,
    shim: {
        'bootstrap': {
　　　　　　　　deps: ['jquery'],
　　　　　　　　exports: 'bootstrap'
　　　　　　}
        ,
        'bootstrapValidator': {
　　　　　　　　deps: ['jquery','bootstrap'],
　　　　　　　　exports: 'bootstrapValidator'
　　　　　　}
        ,
        'bootstraptable': {
　　　　　　　　deps: ['jquery','bootstrap'],
　　　　　　　　exports: 'bootstraptable'
　　　　　　}
        ,
        'bootstrapselect': {
　　　　　　　　deps: ['jquery','bootstrap'],
　　　　　　　　exports: 'bootstrapselect'
　　　　　　}

　　　　}
})
define(['jquery','bootstrap','bootstrapValidator','bootstraptable','bootstrapselect','adminComm'],function($){
        
        $('.selectpicker').selectpicker({
                style: 'btn-default',
                size: 4,
                liveSearch:true
        });
        // $.ajax({
        //         url:'http://120.27.224.143:10010/v1/admin/zone/query',
        //         type:"get",
        //         dataType:'json',
        //         timeout:60000,
        //         headers:{
        //                 'apiKey':localStorage.getItem("session"),
        //                 'contentType' : 'application/json'
        //         },
        //         success:function(data){
        //             console.log(data);
        //         }
        //         ,
        //         error:function(XMLHttpRequest, textStatus, errorThrown){
        //                 console.log(XMLHttpRequest);
        //                 console.log(textStatus);
        //                 console.log(errorThrown);
        //         }
        //     })
        // $.ajax({
        //         url:'http://120.27.224.143:10010/v1/admin/zone/query',
        //         type:"get",
        //         dataType:'json',
        //         timeout:60000,
        //         headers:{
        //                 'SUPERADMIN-API-KEY':JSON.parse(localStorage.getItem("session")),
        //                 'contentType' : 'application/json'
        //         },
        //         success:function(data){
        //             console.log(data);
        //         }
        //         ,
        //         error:function(XMLHttpRequest, textStatus, errorThrown){
        //                 console.log(XMLHttpRequest);
        //                 console.log(textStatus);
        //                 console.log(errorThrown);
        //         }
        //     })
});
