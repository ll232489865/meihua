require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "moduleHtml":'../js/common'
    }
})
define(['jquery','moduleHtml'],function($,template){
    $(function(){
        console.log(456);
        var h = $('#header').outerHeight() +  $('.Foot').outerHeight();
        $('.home_bg').height($(window).height() - h);

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
                    debugger;
                    localStorage.setItem("session",JSON.stringify(data.data.apiKey));

                    window.location.href="../admin/admin.html"
                }
            })
        })
           
        
    })
});
