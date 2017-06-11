require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "bootstrap" : "../js/libs/bootstrap.min",
        'common':'../js/common',
        "adminTemplate":'../output/admin/template',
        "validator" : "../js/widget/validator",
        "bootstrapValidator":'../js/libs/bootstrapValidator.min',
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
        'validator': {
　　　　　　　　deps: ['bootstrapValidator'],
　　　　　　　　exports: 'validator'
　　　　　　}
　　　　}
})
define(['jquery','adminTemplate','common','validator','bootstrapValidator'],function($,adminTemplate,common,validator){
    var resultData;
    var header = common.getApiKey();
    //查询用户信息
    common.ajaxObj(
        'settings/get',
        {
            headers:header
        }
        ,
        function(data){
            
            resultData = data.data;
            var newresultdata;
            
            resultData.userDetail.gender == 'male' ? newresultdata = $.extend({},resultData,{gender:'男'}):newresultdata = $.extend({},resultData,{gender:'女'});
            for (attr in resultData.userDetail)
            {
                if($('#'+attr)!=0){
                    $('#'+attr).text(resultData.userDetail[attr]);
                }
                
            }
            console.log(resultData)
        }
        
    )
    //修改用户信息
     $('#userInfoControl').on('show.bs.modal', function (e) {
        var target = e.relatedTarget;
        
        common.htmlModule({list:resultData},$('#userInfoControl')[0],adminTemplate);
        
        validator.ValidatorInit($('#form-horizontal'));
        
       

        setTimeout(function() {
            $('#form-horizontal').data('bootstrapValidator').validate();
        }, 200);
        $("#save_btn").click(function(){
             sexval = $('input:radio').filter(function(i){
                return ($(this).attr('name') == 'sex' && $(this)[0].checked)
            });
            if($('#form-horizontal').data('bootstrapValidator').isValid()){
                common.ajaxObj(
                'settings/modify',
                {
                    headers:{
                        "STUDENT-API-KEY": JSON.parse(localStorage.getItem("session")).apiKey,
                    }
                    ,
                    type:"post",
                    data:{
                        username:$('#userInfoControl #username').val(),
                        englishName:$('#userInfoControl #englishName').val(),
                        gender:sexval.val(),
                        email:$('#userInfoControl #email').val()
                    }
                }
                ,
                function(data){
                   common.ajaxObj(
                        'settings/get',
                        {
                            headers:{
                                "STUDENT-API-KEY": JSON.parse(localStorage.getItem("session")).apiKey,
                            }
                        }
                        ,
                        function(data){
                            
                            resultData = data.data;
                            var newresultdata;
                            
                            resultData.gender == 'male' ? newresultdata = $.extend({},resultData,{gender:'男'}):newresultdata = $.extend({},resultData,{gender:'女'});
                            for (attr in newresultdata)
                            {
                                if($('#'+attr)!=0){
                                    $('#'+attr).text(resultData[attr]);
                                }
                                
                            }
                            console.log(resultData)
                        }
                        
                    )
                    $('#alert-success').show();
                    setTimeout(function(){
                        
                        $('#alert-success').hide()
                        $('#userInfoControl').modal('hide')
                    },1000)
                }
                
            )
            }
            
        })
    })
    //重置密码
     $('#userInfoContro2').on('show.bs.modal', function (e) {
         validator.ValidatorInit($('#form-horizontal2'));
        $("#btn-successI").click(function(){
            if($('#form-horizontal2').data('bootstrapValidator').isValid())
            {
                common.ajaxObj(
                    'password/reset',
                    {
                        headers:{
                            "STUDENT-API-KEY": JSON.parse(localStorage.getItem("session")).apiKey,
                        }
                        ,
                        type:"post",
                        data:{
                            email:$('#reemail').val(),
                            validateCode:$('#recode').val(),
                            newPassword:$('#repassword').val()
                        }
                    }
                    ,
                    function(data){
                        $('#alert-successI').show();
                        setTimeout(function(){
                            $('#alert-successI').hide();
                            $('#userInfoContro2').modal('hide');
                            window.location.href= '../login/login.html'
                        },1000)
                    }
                    
                )
            }else{
                $('#form-horizontal2').data('bootstrapValidator').validate();
            }
        })
    })
    //验证码
    $('#vcode').click(function(){
        common.ajaxObj(
                'validateCode/get?email='+$('#reemail').val(),
                {
                    headers:{
                        "STUDENT-API-KEY": JSON.parse(localStorage.getItem("session")).apiKey,
                    }
                }
                ,
                function(data){
                   alert('验证码已经已经发送到您的邮箱');
                }
                
            )
    })
})
    