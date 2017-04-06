require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "bootstrap" : "../js/libs/bootstrap.min",
        'common':'../js/common',
        "adminTemplate":'../output/admin/template',
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
define(['jquery','adminTemplate','common','bootstrap','bootstrapValidator','bootstraptable','bootstrapselect'],function($,adminTemplate,common){
        
    //验证控件
    function ValidatorInit(){
        $('.form-horizontal').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                username: {
                    message: 'The username is not valid',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        }
                    //     stringLength: {
                    //         min: 6,
                    //         max: 30,
                    //         message: 'The username must be more than 6 and less than 30 characters long'
                    //     },
                    //     regexp: {
                    //         regexp: /^[a-zA-Z0-9_\.]+$/,
                    //         message: 'The username can only consist of alphabetical, number, dot and underscore'
                    //     },
                    //     remote: {
                    //         url: 'remote.php',
                    //         message: 'The username is not available'
                    //     },
                    //     different: {
                    //         field: 'password',
                    //         message: 'The username and password cannot be the same as each other'
                    //     }
                    }
                },
                email: {
                    validators: {
                        emailAddress: {
                            message: '这里填写的是一个符合格式的邮箱地址哦'
                        }
                        ,
                        notEmpty: {
                            message: '必填信息哦'
                        }
                    }
                }
                ,
                phone: {
                    validators: {
                        regexp: {/* 只需加此键值对，包含正则表达式，和提示 */
                            regexp: /^1[3458]{1}[0-9]{9}$/,
                            message: '11位的符合格式的手机号'
                        }
                        ,
                        notEmpty: {
                            message: '必填信息哦'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        identical: {
                            field: 'confirmPassword',
                            message: '密码与重复比吗必须一致'
                        },

                    }
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        identical: {
                            field: 'password',
                            message: '密码与重复比吗必须一致'
                        },
                    }
                },
                birthday: {
                    validators: {
                        date: {
                            format: 'YYYY/MM/DD',
                            message: 'The birthday is not valid'
                        }
                    }
                },
                gender: {
                    validators: {
                        notEmpty: {
                            message: 'The gender is required'
                        }
                    }
                },
                'languages[]': {
                    validators: {
                        notEmpty: {
                            message: 'Please specify at least one language you can speak'
                        }
                    }
                },
                'programs[]': {
                    validators: {
                        choice: {
                            min: 2,
                            max: 4,
                            message: 'Please choose 2 - 4 programming languages you are good at'
                        }
                    }
                },
                captcha: {
                    validators: {
                        callback: {
                            message: 'Wrong answer',
                            callback: function(value, validator) {
                                var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
                                return value == sum;
                            }
                        }
                    }
                }
            }
        });
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
        headers: {
                'SUPERADMIN-API-KEY'  : JSON.parse(localStorage.getItem("session")).apiKey
                }
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
    $.ajax({
        url:'http://120.27.224.143:10010/v1/admin/zone/query',
        type:"get",
        dataType:'json',
        timeout:60000,
        headers:{
                'SUPERADMIN-API-KEY' : JSON.parse(localStorage.getItem("session")).apiKey
        },
        success:function(data){
            zoneData = data.data;
            console.log(zoneData);
        }
        ,
        error:function(XMLHttpRequest, textStatus, errorThrown){
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
        }
    })
    //删除记录
    $('#remove').click(function(){
        var selectIndex = $('input[name="btSelectItem"]:checked ').parent().next().text();
        if(selectIndex){
            $.ajax({
            url:"http://120.27.224.143:10010/v1/admin/user/"+selectIndex+"/del",
            type:"get",
            dataType:'json',
            timeout:60000,
            headers:{
                    'SUPERADMIN-API-KEY' : JSON.parse(localStorage.getItem("session")).apiKey
            },
            success:function(data){
                $('#table').bootstrapTable('refresh');
            }
            ,
            error:function(XMLHttpRequest, textStatus, errorThrown){
            }
        })
        }else{
            alert('请选中一行记录')
        }
        
    })

    //编辑记录
    $('#btn_edit').click(function(){
        var selectIndex = $('input[name="btSelectItem"]:checked ').parent().next().text();
        if(selectIndex){
            $.ajax({
                url:"http://120.27.224.143:10010/v1/admin/user/"+selectIndex+"/getDetail",
                type:"get",
                dataType:'json',
                timeout:60000,
                headers:{
                        'SUPERADMIN-API-KEY' : JSON.parse(localStorage.getItem("session")).apiKey
                },
                success:function(data){
                    common.htmlModule({list:$.extend({},data.data,zoneData)},$('#userInfoControl')[0],adminTemplate);
                    console.log($.extend({},data.data,zoneData));
                    $('#userInfoControl').modal('show');
                    ValidatorInit();
                    $('#selectpicker1').selectpicker({
                            style: 'btn-default',
                            size: 4,
                            liveSearch:true
                    });
                    $('#selectpicker2').selectpicker({
                            style: 'btn-default',
                            size: 4,
                            liveSearch:true
                    });
                    var selectuserGroup = $('#selectpicker1 option').filter(function(index){
                        return $(this).attr('data-id') ==data.data.userGroup
                    });
                        $('#selectpicker1').selectpicker('val',selectuserGroup.text())
                        $('#selectpicker2').selectpicker('val',data.data.address)
                    
                    $("#save_btn").click(function(){ 
                        $('.form-horizontal').bootstrapValidator('validate');
                        sexval = $('input:radio').filter(function(i){
                            return ($(this).attr('name') == 'sex' && $(this)[0].checked)
                        })
                        var data = {
                            username:$('#username').val(),
                            englishName:$('#englishName').val(),
                            gender:sexval.val(),
                            userGroup:$('#selectpicker1 option:selected').attr('data-id'),
                            mobile:$('#phone').val(),
                            belongingZoneId:$('#selectpicker2 option:selected').attr('data-id'),
                            belongingZone:$('#selectpicker2').selectpicker('val'),
                            email:$('#email').val()
                        }
                        
                        if($('.form-horizontal').data('bootstrapValidator').isValid()){
                                var selectIndex = $('input[name="btSelectItem"]:checked ').parent().next().text();
                                if(selectIndex){
                                    $.ajax({

                                        url:'http://120.27.224.143:10010/v1/admin/user/'+selectIndex+'/modify',
                                        type:"post",
                                        dataType:'json',
                                        timeout:60000,
                                        headers:{
                                            "Content-Type": 'application/json',
                                            'SUPERADMIN-API-KEY' : JSON.parse(localStorage.getItem("session")).apiKey
                                        },
                                        data:JSON.stringify(data),
                                        success:function(data){
                                            $('#table').bootstrapTable('refresh');
                                            $('#alert-success').show();
                                            setTimeout(function(){
                                                $('#alert-success').hide()
                                                $('#userInfoControl').modal('hide')
                                            },1000)
                                        }
                                        ,
                                        error:function(XMLHttpRequest, textStatus, errorThrown){
                                            $('#alert-danger').show()
                                            setTimeout(function(){
                                                $('#alert-danger').hide()
                                            },1000)
                                        }
                                    })
                                }else{
                                    alert('请选中一行记录')
                                }
                        }
                    })
                }
                ,
                error:function(XMLHttpRequest, textStatus, errorThrown){
                }
            })
        }else{
            alert('请选中一行记录')
        }
    })
    //保存以及修改的方法
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
                belongingZoneId:$('#selectpicker2 option:selected').attr('data-id'),
                belongingZone:$('#selectpicker2').selectpicker('val'),
                email:$('#email').val()
            }
            
            if($('.form-horizontal').data('bootstrapValidator').isValid()){
                $.ajax({
                    url:'http://120.27.224.143:10010/v1/admin/user/add',
                    type:"post",
                    dataType:'json',
                    timeout:60000,
                    headers:{
                        "Content-Type": 'application/json',
                        'SUPERADMIN-API-KEY' : JSON.parse(localStorage.getItem("session")).apiKey
                    },
                    data:JSON.stringify(data),
                    success:function(data){
                        $('#table').bootstrapTable('refresh');
                        $('#alert-success').show();
                        setTimeout(function(){
                            $('#alert-success').hide()
                            $('#userInfoControl').modal('hide')
                        },1000)
                    }
                    ,
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        $('#alert-danger').show()
                        setTimeout(function(){
                            $('#alert-danger').hide()
                        },1000)
                    }
                })
            }
    }
    //模态框加载事件，包括了新增以及修改以及查看
    $('#btn_add').click(function(){
         common.htmlModule({list:zoneData},$('#userInfoControl')[0],adminTemplate);
         
            ValidatorInit();
            $('#selectpicker1').selectpicker({
                    style: 'btn-default',
                    size: 4,
                    liveSearch:true
            });
            $('#selectpicker2').selectpicker({
                    style: 'btn-default',
                    size: 4,
                    liveSearch:true
            });
            //点击保存按钮的回调
            $("#save_btn").click(function(){ 
                $('.form-horizontal').bootstrapValidator('validate');
                modiAdd();
            })
            $('#userInfoControl').modal('show');
    })
    // $('#userInfoControl').on('show.bs.modal', function (e) {
    //     var triggerBtn = $(e.relatedTarget);
        
    //     common.htmlModule({list:zoneData},$('#userInfoControl')[0],adminTemplate);
    //     ValidatorInit();
    //     $('#selectpicker1').selectpicker({
    //             style: 'btn-default',
    //             size: 4,
    //             liveSearch:true
    //     });
    //     $('#selectpicker2').selectpicker({
    //             style: 'btn-default',
    //             size: 4,
    //             liveSearch:true
    //     });
    //     //点击保存按钮的回调
    //     $("#save_btn").click(function(){ 
    //         $('.form-horizontal').bootstrapValidator('validate');
    //         modiAdd();
    //     })
        
    // })
});
