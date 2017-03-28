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
define(['jquery','bootstrap','bootstrapValidator','bootstraptable','bootstrapselect'],function($){
        $('.selectpicker').selectpicker({
                style: 'btn-default',
                size: 4,
                liveSearch:true
        });
});
