require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "bootstrap" : "../js/libs/bootstrap.min",
        'common':'../js/common',
        "adminTemplate":'../output/admin/template',
        "validator" : "../js/widget/validator",
        "bootstraptable":'../js/libs/bootstrap-table.min',
        "bootstrapValidator":'../js/libs/bootstrapValidator.min',
        "bootstrapzhcn":'../js/libs/bootstrap-table-zh-CN',
        "bootstrapselect":'../js/libs/bootstrap-select.min'
    }
    ,
    shim: {
        'bootstrap': {
　　　　　　　　deps: ['jquery'],
　　　　　　　　exports: 'bootstrap'
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
        ,
        'bootstrapValidator': {
　　　　　　　　deps: ['jquery','bootstrap'],
　　　　　　　　exports: 'bootstrapValidator'
　　　　　　}
        ,
        'validator': {
　　　　　　　　deps: ['bootstrapValidator'],
　　　　　　　　exports: 'validator'
　　　　　　}
　　　　}
})
define(['jquery','common','validator','bootstrap','bootstrapValidator','bootstraptable','bootstrapselect'],function($,common,validator){
    var user = JSON.parse(localStorage.getItem("session")).user;
    var belongingZone =  JSON.parse(localStorage.getItem("session")).belongingZone;
    console.log(JSON.parse(localStorage.getItem("session")));
    //获取学区信息，以及登录包含信息
    var zoneData; //校区所有信息
    var zoneUse =[];	//已经被使用校区
    var zoneUnused =[]; //没有被使用的校区

    var fixedzone = [];  //如果登录是校区管理员或者老师登录，则有单独的相应校区，因为是固定的
    validator.ValidatorInit($('#form-horizontal3'));

    //根据不同身份表格展示不同用户信息分别超级管理员，校区管理员，以及教师
	function userTable(parm){
		var parms = {} ||  parm
		$('#table').bootstrapTable({
			classes:'table table-hover table-condensed',
			pagination: true,
			queryParams:parms,
			url: 'http://120.27.224.143:10010/v1/admin/zone/query',
			method: 'get',
			clicktoselect:'btSelectItem',
			pageNumber:1,
			pageSize: 20,
			ajaxOptions:{
			headers: common.dynamicKey()
			}
			,
			 columns: [
					{
						checkbox: true
					}, {
							field: 'name',
							title: '校区名'
					}, {
							field: 'identifier',
							title: '唯一识别码'
					}, {
							field: 'address',
							title: '地址'
					}, {
							field: 'managerName',
							title: '管理员'
					}, {
							field: 'contact',
							title: '联系方式'
					}, {
							field: 'creationTime',
							title: '添加时间'
					}
			]
		});

	}

    //不同身份登录，所做的事情也不一样，所以有一个身份初始化的函数
	//比如不同的身份登录，表格的用户是不同的
	//比如超级管理身份登录，那么添加成员功能里面的校区就有选择，但是如果是校区管理员身份登录，添加成员功能里面的选择选择就是死的
	(function(){
		//后台登录，只有老师，校区管理员，超级管理员三种
		//渲染表格
		userTable();
		// if(user=='superAdmin'){
		// 	common.ajaxObj(
		// 		'admin/zone/query',
		// 		{
		// 			headers:common.dynamicKey()
		// 		}
		// 		,
		// 		function(data){
		// 			//所有校区赋值
		// 			zoneData = data.data;
		// 			zoneData.forEach(function(value,i,array){
		// 				//把已经绑定过管理员的校区以及没有被绑定管理员的校区分别过滤出来
		// 				value.managerId === undefined?  zoneUnused.push(value) : zoneUse.push(value)
		// 			})
		// 		}
		// 	)
		// }else{
		// 	//老师或者校区管理员固定的校区
		// 	fixedzone.push({belongingZone:JSON.parse(localStorage.getItem("session")).belongingZone,belongingId:JSON.parse(localStorage.getItem("session")).belongingId});
		// }
	}())

    common.ajaxObj(
            'admin/user/query',
            {
                headers: common.dynamicKey(),
            }
            ,
            function(data){
                resultData = data.data;
                var str = ''
                $.each(resultData,function(i,n){
                    if(resultData[i].userGroup==='zoneAdmin'){
                          str+='<option data-phone="'+resultData[i].mobile+'" data-id="'+resultData[i]._id+'">'+resultData[i].username+'</option>'
                    }
                })
                $("#selectpicker1").html(str);
                $("#selectpicker1").selectpicker({
                    style: 'btn-default',
                    size: 4,
                    liveSearch:true
                });
                $('#zoneAdmin').click(function(){

                    if($('#form-horizontal3').data('bootstrapValidator').isValid()){
                        common.ajaxObj(
                            'admin/zone/add',
                            {
                                    headers: common.dynamicKey(),
                                    data:{
                                            name : $('#zonename').val() ,
                                            address: $('#zoneaddress').val() ,
                                            contact: $('#zoneaContact').val()
                                    }
                                    ,
                                    type:'post'
                            }
                            ,
                            function(data){
                               alert('校区添加成功');
                            }
                    )
                    }else{
                            $('#form-horizontal3').data('bootstrapValidator').validate();
                    }

                })
            }
    )
});
