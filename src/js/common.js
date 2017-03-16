var path = document.getElementsByTagName("html")[0].className.indexOf('Account') != '-1' ? path = '../../' : path = '../';
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
var apiPath = function(path){
    return "http://192.168.1.10:8288/pc/" + path
}

require.config({
    paths : {
        "tpl":path+'../output/template',
        "footer":path+'../output/footer'
    }
    ,
    shim: {
        'tpl':{
            exports: 'tpl'
        }
　　}
})
define(['tpl'],function(template){
    function setModule(nanmeArray,data){
        if(nanmeArray instanceof Array)
        {
            //初始化加载模板
            nanmeArray.forEach(function(value,index,array){
                var htmlModule = template(value, data);
                document.getElementById(value).innerHTML = htmlModule;
            })
        }else{
            //一个个动态加载模板
            var htmlModule = template(nanmeArray.getAttribute('data-module'), data);
            nanmeArray.innerHTML = htmlModule;
        }
        
    }
    function htmlModule(data,html){
        setModule(['footer','header'],data);
        setHeight();
    }
    function localStorageObj(name,obj){
        var stringObj = JSON.stringify(obj); 
        localStorage.setItem(name, stringObj);
    }
    function routPath(p){
        return  {
            path : document.getElementsByTagName("html")[0].className.indexOf('Account') != '-1' ? path = '../' : path = './'
        }
    }
    function ajaxObj(url,parms,callback){
        $.ajax(apiPath(url),{
            dataType:'json',//服务器返回json格式数据
            type:'get',//HTTP请求类型
            timeout:60000,//超时时间
            headers:{},
            success:function(data){
                callback(data);
            },
            error:function(xhr,type,errorThrown){
                alert('错误')
            }
        });
    }
    var obj = {first: 0,second: null},path= routPath();
    htmlModule(path);

    function catchParameter(str,character){
        return str.substring(str.lastIndexOf(character)+1);
    }
    function setHeight(){
        var h = $('#header').outerHeight() +  $('.Foot').outerHeight();
        $('#setHeight').height($(window).height() - h);
    }
    return {
        htmlModule : htmlModule,
        routPath : routPath,
        localStorageObj : localStorageObj,
        ajaxObj:ajaxObj,
        catchParameter:catchParameter,
        setHeight:setHeight
    }
});