require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "moduleHtml":'../js/common',
        "powerSwitch":'../js/libs/powerSwitch'
    }
    ,
    shim:{
        'powerSwitch': {
　　　　　　　　deps: ['jquery'],
　　　　　　　　exports: 'powerSwitch'
　　　　　　}
    }
})
define(['jquery','moduleHtml','powerSwitch'],function($,template,powerSwitch){
    $(function(){
        $(function(){
        $("#bn_position").find("a").powerSwitch({
                eventType: "hover",
                classAdd: "active",
                animation: "fade",
                autoTime:3000,
            }).eq(0).trigger("mouseover");
        })
        $('#login_btn').click(function(){
             $.ajax({
                url:'http://120.27.224.143:10010/v1/login?username='+$('#id_username').val(),
                type:"post",
                dataType:'json',
                timeout:60000,
                headers:{"Content-Type": 'application/json'},
                data: JSON.stringify({"data":$('#id_password').val()}),
                success:function(data){
                    var code = data.ret.code;
                    var user = data.data.userDetail.userGroup;
					var belongingZone = data.data.userDetail.belongingZone
					var belongingId = data.data.userDetail._id

                    template.localStorageObj("session",{apiKey : data.data.apiKey,user:user,belongingZone:belongingZone,belongingId:belongingId});
					debugger;
                    if(code==0){
						window.location.href="../lessons/lessons.html"
                    }
                    if(code == 401001){
                        window.location.href="../login/login.html"
                    }

                }
            })
        })
    })
});
