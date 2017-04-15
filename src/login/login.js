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
        // var h = $('#header').outerHeight();
        $(function(){
        $("#bn_position").find("a").powerSwitch({
                eventType: "hover",
                classAdd: "active",
                animation: "fade",
                autoTime:3000,
                // container: $("#bn_slide"),
                // onSwitch: function(image) {
                //     if (!image.attr("src")) {
                //         image.attr("src", image.attr("data-src"));
                //     }
                // }
            }).eq(0).trigger("mouseover");
        })
        // $('.mainCon').height($(window).height() - h);
        $('#login_btn').click(function(){
             $.ajax({
                url:'http://120.27.224.143:10010/v1/login?username='+$('#id_username').val(),
                type:"post",
                dataType:'json',
                timeout:60000,
                headers:{"Content-Type": 'application/json'},
                data: JSON.stringify({"data":$('#id_password').val()}),
                success:function(data){
                    console.log(data);
                    var code = data.ret.code;
                    var user = data.data.userDetail.userGroup;
                    template.localStorageObj("session",{apiKey : data.data.apiKey,user:user});
                    if(code==0){
                        switch(user)
                        {
                            case 'student':
                            window.location.href="../lessons/lessons.html"
                            break;
                            case 'superAdmin':
                            window.location.href="../admin/admin.html"
                            break;
                            case 'teacher':
                            window.location.href="../admin/admin.html"
                            break;
                            case 'admin':
                            window.location.href="../admin/admin.html"
                            break;
                        }
                    }
                }
            })
        })
    })
});
