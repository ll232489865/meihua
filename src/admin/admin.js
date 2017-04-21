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
    //根据用户身份确保一些消息是否显示隐藏，默认是admin的身份
    userOpstions  = {
        zoneSelect:JSON.parse(localStorage.getItem("session")).user === 'superAdmin' ? true:false, //是否显示校区选择
        editInfo:false//是否显示用户身份选择，只是注册有，现在不支持身份修改
    }
    
    //表格数据加载
    $('#table').bootstrapTable({
        classes:'table table-hover table-condensed',
        pagination: true, 
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
    //获取学区信息
    var zoneData;
    function  getZoneInfo(){
        //如果是超级管理员就返回所有的zone信息，提供界面信息选择
        var user = JSON.parse(localStorage.getItem("session")).user
        if(user=='superAdmin'){
            common.ajaxObj(
                'admin/zone/query',
                {
                    headers:common.dynamicKey()
                }
                ,
                function(data){
                    zoneData = data.data;
                    console.log(zoneData);
                    return zoneData;
                }
            )
        }else{
            zoneData = {
                managingZone:'001',
                managingId:'58f99ab65d937f67b2745d9b'
            }
        }
    } 
    getZoneInfo();

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
        if(selectIndex){

            common.ajaxObj(
                "admin/user/"+selectIndex+"/getDetail",
                {
                    headers:common.dynamicKey()
                }
                ,
                function(data){
                    
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
                belongingZoneId:$('#zoneSelect').is(':visible') ? $('#selectpicker2 option:selected').attr('data-id') : '',
                belongingZone:$('#zoneSelect').is(':visible') ?  $('#selectpicker2').selectpicker('val') : '',
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
         common.htmlModule({list:$.extend({},zoneData,$.extend({},userOpstions,{editInfo:true}))},$('#userInfoControl')[0],adminTemplate);
         //userGroup:JSON.parse(localStorage.getItem("session")).user
         
            validator.ValidatorInit($('#form-horizontal'));
            $('#selectpicker1').selectpicker({
                    style: 'btn-default',
                    size: 4,
                    liveSearch:true
            });
            $('#selectpicker1').on('changed.bs.select',function (e) {
                
                if($('#selectpicker1').selectpicker('val') == '校区管理员'){
                    $('#zoneSelect').hide();
                }else{
                    $('#zoneSelect').show();
                }
            });
            $('#selectpicker2').selectpicker({
                    style: 'btn-default',
                    size: 4,
                    liveSearch:true
            });
            //点击保存按钮的回调
            $("#save_btn").click(function(){ 
                $('#form-horizontal').bootstrapValidator('validate');
                modiAdd();
            })
            $('#userInfoControl').modal('show');
    })
  
});
