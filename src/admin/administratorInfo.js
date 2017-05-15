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
