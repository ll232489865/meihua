require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "bootstrap" : "../js/libs/bootstrap.min",
        'common':'../js/common',
        "adminTemplate":'../output/admin/template',
        "bootstrapValidator":'../js/libs/bootstrapValidator.min',
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
　　　　}
})
define(['jquery','common','adminTemplate','bootstrapValidator','bootstrap','bootstrapselect'],function($,common,adminTemplate,bootstrapValidator){
    var resultData;
    //查询用户信息
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
    //修改用户信息
     $('#userInfoControl').on('show.bs.modal', function (e) {
        common.htmlModule({list:resultData},$('#userInfoControl')[0],adminTemplate);
        sexval = $('input:radio').filter(function(i){
            return ($(this).attr('name') == 'sex' && $(this)[0].checked)
        })
        $("#save_btn").click(function(){
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
        })
    })
    //重置密码
     $('#userInfoContro2').on('show.bs.modal', function (e) {
        common.htmlModule({list:resultData},$('#userInfoControl')[0],adminTemplate);
        sexval = $('input:radio').filter(function(i){
            return ($(this).attr('name') == 'sex' && $(this)[0].checked)
        })
        $(".btn-successI").click(function(){
            
            common.ajaxObj(
                'password/reset',
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
                    
                }
                
            )
        })
    })
})
    