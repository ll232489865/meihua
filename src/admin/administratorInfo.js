require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "bootstrap" : "../js/libs/bootstrap.min",
        'common':'../js/common',
        "moduleHtml":'adminComm',
        "validator" : "../js/widget/validator",
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
        ,
        'bootstrapselect': {
　　　　　　　　deps: ['jquery','bootstrap'],
　　　　　　　　exports: 'bootstrapselect'
　　　　　　}
        ,
        'validator': {
　　　　　　　　deps: ['bootstrapValidator'],
　　　　　　　　exports: 'validator'
　　　　　　}
　　　　}
})
define(['jquery','common','validator','bootstrap','bootstrapValidator','bootstrapselect'],function($,common,validator){
        validator.ValidatorInit($('#form-horizontal3'));
        common.ajaxObj(
                'admin/user/query',
                {
                        headers:{
                        "SUPERADMIN-API-KEY": JSON.parse(localStorage.getItem("session")).apiKey,
                        }
                }
                ,
                function(data){
                    resultData = data.data;
                    var str = ''
                    console.log(resultData)
                    $.each(resultData,function(i,n){
                        // console.log(resultData)
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
                        var selectedOption = $('#selectpicker1 option').eq($("#selectpicker1").get(0).selectedIndex);
                        if($('#form-horizontal3').data('bootstrapValidator').isValid()){
                            common.ajaxObj(
                                'admin/zone/add',
                                {
                                        headers:{
                                                "SUPERADMIN-API-KEY": JSON.parse(localStorage.getItem("session")).apiKey,
                                        },
                                        data:{
                                                name : $('#zonename').val() ,
                                                address: $('#zoneaddress').val() ,
                                                managerId : selectedOption.data('id') ,
                                                managerName : $('#selectpicker1').selectpicker('val') ,
                                                contact: selectedOption.data('phone').toString()
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
