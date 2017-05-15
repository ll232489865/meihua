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
define(['jquery','adminTemplate','common','validator','bootstrapValidator','bootstraptable','bootstrapselect'],function($,adminTemplate,common,validator){
    var user = JSON.parse(localStorage.getItem("session")).user;
	var belongingZone =  JSON.parse(localStorage.getItem("session")).belongingZone;
	console.log(JSON.parse(localStorage.getItem("session")));
	//获取学区信息，以及登录包含信息
    var zoneData; //校区所有信息
	var zoneUse =[];	//已经被使用校区
	var zoneUnused =[]; //没有被使用的校区
	
	var fixedzone = [];  //如果登录是校区管理员或者老师登录，则有单独的相应校区，因为是固定的
	
	
	//另外，如果根据身份登录的不同，身份权限能选得选项也不同。
	
	
	//渲染bootstrapSelect,如果第2个参数为空，则使用默认的插件渲染，如第三个参数不为空，重新便利DOM
	function rendererSelect(selectDom,data){
		selectDom.selectpicker({
			style: 'btn-default',
			size: 4,
			liveSearch:true
		});
	}
	
	//根据用户身份确保一些消息是否显示隐藏，默认是admin的身份
    userOpstions  = {
        //zoneSelect:JSON.parse(localStorage.getItem("session")).user === 'superAdmin' ? true:false, //是否显示校区选择
        editInfo:false,//是否显示用户身份选择，只是添加有，现在不支持身份修改
		user:user,
		belongingZone
    }
    //根据不同身份表格展示不同用户信息分别超级管理员，校区管理员，以及教师
	function userTable(parm){
		var parms = {} ||  parm
		$('#table').bootstrapTable({
			classes:'table table-hover table-condensed',
			pagination: true, 
			queryParams:parms,
			url: 'http://120.27.224.143:10010/v1/admin/user/query',
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
					},
					{
							field: '_id',
							title:'用户ID'
					}, {
							field: 'username',
							title: '名称'
					}, {
							field: 'englishName',
							title: '英文名'
					}, {
							field: 'gender',
							title: '性别'
					}, {
							field: 'mobile',
							title: '电话'
					}, {
							field: 'userGroup',
							title: '身份'
					}
					, {
							field: 'email',
							title: '邮箱'
					}
					, {
							field: 'lastLoginTime',
							title: '最后登录时间'
					}
					, {
							field: 'creationTime',
							title: '创建帐号时间'
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
		if(user=='superAdmin'){
			common.ajaxObj(
				'admin/zone/query',
				{
					headers:common.dynamicKey()
				}
				,
				function(data){
					//所有校区赋值
					zoneData = data.data;
					zoneData.forEach(function(value,i,array){
						//把已经绑定过管理员的校区以及没有被绑定管理员的校区分别过滤出来
						value.managerId === undefined?  zoneUnused.push(value) : zoneUse.push(value)
					})
				}
			)
		}else{
			//老师或者校区管理员固定的校区
			fixedzone.push({belongingZone:JSON.parse(localStorage.getItem("session")).belongingZone,belongingId:JSON.parse(localStorage.getItem("session")).belongingId});
		}
	}())

    //删除记录
    $('#remove').click(function(){
        var selectIndex = $('input[name="btSelectItem"]:checked ').parent().next().text();
        if(selectIndex){
            common.ajaxObj(
                "admin/user/"+selectIndex+"/del",
                {
                    headers:common.dynamicKey()
                }
                ,
                function(data){
                    console.log(data);
                    $('#table').bootstrapTable('refresh');
                }
            )
        }else{
            alert('请选中一行记录')
        }
        
    })

    //编辑记录
    $('#btn_edit').click(function(){
        var selectIndex = $('input[name="btSelectItem"]:checked ').parent().next().text();
		debugger;
        if(selectIndex){

            common.ajaxObj(
                "admin/user/"+selectIndex+"/getDetail",
                {
                    headers:common.dynamicKey()
                }
                ,
                function(data){
                    console.log(data);
                    //绑定模板
                    common.htmlModule({list:$.extend({},data.data,zoneData,userOpstions)},$('#userInfoControl')[0],adminTemplate);   

                    console.log($.extend({},data.data,zoneData,userOpstions))
                    //显示弹出框
                    $('#userInfoControl').modal('show');
                    //设置验证
                    validator.ValidatorInit($('#form-horizontal'));
                    //启动下拉框，身份选择
                    $('#selectpicker1').selectpicker({
                            style: 'btn-default',
                            size: 4,
                            liveSearch:true
                    });
                    //启动下拉框，校区选择
                    $('#selectpicker2').selectpicker({
                            style: 'btn-default',
                            size: 4,
                            liveSearch:true
                    });
                    //得到
                    var selectuserGroup = $('#selectpicker1 option').filter(function(index){
                        return $(this).attr('data-id') ==data.data.userGroup
                    });
                    $('#selectpicker1').selectpicker('val',selectuserGroup.text())
                    $('#selectpicker2').selectpicker('val',data.data.address)
                    $("#save_btn").click(function(){ 
                        $('#form-horizontal').bootstrapValidator('validate');
                        sexval = $('input:radio').filter(function(i){
                            return ($(this).attr('name') == 'sex' && $(this)[0].checked)
                        })
                        var data = {
                            username:$('#username').val(),
                            englishName:$('#englishName').val(),
                            gender:sexval.val(),
                            mobile:$('#phone').val(),
                            belongingZoneId: JSON.parse(localStorage.getItem("session")).user==='superAdmin' ?$('#selectpicker2 option:selected').attr('data-id'):zoneData.managingId,
                            belongingZone:JSON.parse(localStorage.getItem("session")).user==='superAdmin' ? $('#selectpicker2').selectpicker('val'):zoneData.managingZone,
                            email:$('#email').val()
                        }
                        
                        if($('#form-horizontal').data('bootstrapValidator').isValid()){
                                var selectIndex = $('input[name="btSelectItem"]:checked ').parent().next().text();
                                if(selectIndex){
                                    common.ajaxObj(
                                        'admin/user/'+selectIndex+'/modify',
                                        {
                                            headers:common.dynamicKey(),
                                            type:'post',
                                            data:data
                                        }
                                        ,
                                        function(data){
                                            $('#table').bootstrapTable('refresh');
                                            $('#alert-success').show();
                                            setTimeout(function(){
                                                $('#alert-success').hide()
                                                $('#userInfoControl').modal('hide')
                                            },1000)
                                        }
                                        ,
                                        function(XMLHttpRequest, textStatus, errorThrown){
                                            $('#alert-danger').show()
                                            setTimeout(function(){
                                                $('#alert-danger').hide()
                                            },1000)
                                        }
                                    )
                                }else{
                                    alert('请选中一行记录')
                                }
                        }
                    })
                }
                ,
                function(XMLHttpRequest, textStatus, errorThrown){
                     console.log('cuowu')
                }
            )
        }else{
            alert('请选中一行记录')
        }
    })
    //添加一行
    function modiAdd(){
            sexval = $('input:radio').filter(function(i){
                return ($(this).attr('name') == 'sex' && $(this)[0].checked)
            })
            var data = {
                username:$('#username').val(),
                password:$('#password').val(),
                englishName:$('#englishName').val(),
                gender:sexval.val(),
                userGroup:$('#selectpicker1 option:selected').attr('data-id'),
                mobile:$('#phone').val(),
                belongingZoneId:$('#selectpicker2').is(':visible') ? $('#selectpicker2 option:selected').attr('data-id') : $('#zoneaUnbleSelect').attr('data-id'),
                belongingZone:$('#selectpicker2').is(':visible') ?  $('#selectpicker2').selectpicker('val') : $('#zoneaUnbleSelect').val(),
                email:$('#email').val()
            }
             if($('#form-horizontal').data('bootstrapValidator').isValid()){
                common.ajaxObj(
                    'admin/user/add',
                    {
                        headers:common.dynamicKey(),
                        type:'post',
                        data:data
                    }
                    ,
                    function(data){
                        $('#table').bootstrapTable('refresh');
                        $('#alert-success').show();
                        setTimeout(function(){
                            $('#alert-success').hide()
                            $('#userInfoControl').modal('hide')
                        },1000)
                    }
                    ,
                    function(XMLHttpRequest, textStatus, errorThrown){
                        $('#alert-danger').show()
                        setTimeout(function(){
                            $('#alert-danger').hide()
                        },1000)
                    }
                )
            } 
    }
    //模态框加载事件，包括了新增以及修改以及查看
    $('#btn_add').click(function(){
        //注册用户的时候，编辑身份是需要显示的
		console.log(userOpstions);
		 switch(user)
		{
			
			case 'superAdmin':
			common.htmlModule({list:$.extend({},zoneData,$.extend({},userOpstions,{editInfo:true}))},$('#userInfoControl')[0],adminTemplate);
			break;
			case 'teacher':
			common.htmlModule({list:$.extend({},fixedzone,$.extend({},userOpstions,{editInfo:true}))},$('#userInfoControl')[0],adminTemplate);
			break;
			case 'zoneAdmin':
			common.htmlModule({list:$.extend({},fixedzone,$.extend({},userOpstions,{editInfo:true}))},$('#userInfoControl')[0],adminTemplate);
			break;
		}		 
	
		
         //userGroup:JSON.parse(localStorage.getItem("session")).user
         
            validator.ValidatorInit($('#form-horizontal'));
			//身份选择
			rendererSelect($('#selectpicker1'))
            $('#selectpicker1').on('changed.bs.select',function (e) {
                //如果以超级管理员身份新增学生或者老师，则显示全部校区
				//如果以超级管理员身份新增校区管理员，则显示没有被管理的选取
				//如果以校区管理员身份新增老师或者学生，则显示当前校区管理员所管校区
				//如果以老师身份新增学生，则显示老师所属校区
				//另外，不论是超级管理员，校区管理员，还是教师，新增一个学生，那么都应该根据相应的校区ID，找到合适的老师
                if($('#selectpicker1').selectpicker('val') == '校区管理员'){
                    var str = '';
					zoneUnused.forEach(function(value,i,array){
						str += '<option data-id="student">'+ value.name +'</option>' 
					}) 
					$('#selectpicker2').html(str).selectpicker('refresh');
					
                }else{
					if(userOpstions.user=='superAdmin'){
						var str = '';
						zoneData.forEach(function(value,i,array){
							str += '<option data-id="student">'+ value.name +'</option>' 
						}) 
						$('#selectpicker2').html(str).selectpicker('refresh');
					}
					
					
				}

				if($('#selectpicker1').selectpicker('val') == '学生'){
					alert(111);
				}
				
            });
			//校区选择
            rendererSelect($('#selectpicker2'))
            //点击保存按钮的回调
            $("#save_btn").click(function(){ 
                $('#form-horizontal').bootstrapValidator('validate');
                modiAdd();
            })
            $('#userInfoControl').modal('show');
    })
  
});
