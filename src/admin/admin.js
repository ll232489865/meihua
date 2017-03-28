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
        //  $('#table').bootstrapTable({
        //    queryParams: function (params) {
        //         return {
        //                 rows: this.pageSize,
        //                 page: this.pageNumber,
        //                 sort: this.sortName,
        //                 order: this.sortOrder



        //                 };
        //         },                 //是否显示父子表
        //     columns: [{
        //         checkbox: true
        //     }, {
        //         field: 'Name',
        //         title: '部门名称'
        //     }, {
        //         field: 'ParentName',
        //         title: '上级部门'
        //     }, {
        //         field: 'Level',
        //         title: '部门级别'
        //     }, {
        //         field: 'Desc',
        //         title: '描述'
        //     }, ]
        // });

                var ButtonInit = function () {
                var oInit = new Object();
                var postdata = {};

                oInit.Init = function () {
                        //初始化页面上面的按钮事件
                };

                return oInit;
                };
});
