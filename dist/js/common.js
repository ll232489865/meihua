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
    //对象化本地存储
    function localStorageObj(name,obj){
        var stringObj = JSON.stringify(obj); 
        localStorage.setItem(name, stringObj);
    }
    //获取地址
    function routPath(p){
        return  {
            path : document.getElementsByTagName("html")[0].className.indexOf('Account') != '-1' ? path = '../' : path = './'
        }
    }
    //请求封装
    function ajaxObj(url,parms,callback){
        var defaultCfg = {
            dataType:'json',//服务器返回json格式数据
            type:'get',//HTTP请求类型
            timeout:60000,//超时时间
            data:{},
            headers:{},
            success:function(data){
                callback(data);
            },
            error:function(xhr,type,errorThrown){
                console.log('错误');
            }
        }
        var cfg = $.extend(defaultCfg,parms);
        $.ajax(apiPath(url),cfg);
    }
    //直接调用加载头低部模板
    htmlModule(routPath());

    //获取hash取值
    function catchParameter(str,character){
        return str.substring(str.lastIndexOf(character)+1);
    }
    //设置高度
    function setHeight(){
        var h = $('#header').outerHeight() +  $('.Foot').outerHeight();
        $('#setHeight').height($(window).height() - h);
    }
    //得到url文件名
    function GetPageurl() 
    { 
        var url=window.location.href;//获取完整URL地址 
        var tmp= new Array();//临时变量，用于保存分割字符串 
        tmp=url.split("/");//按照"/"分割 
        var cc = tmp[tmp.length-1];//获取最后一部分，即文件名和参数 
        tmp=cc.split("?");//把参数和文件名分割开 
        return tmp[0];//返回值 
    }
     //得到参数
    function getQueryStringArgs() {
        var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
            args = {},
            items = qs.length ? qs.split("&") : [],
            item = null,
            name = null,
            value = null,
            parmStr = '?',
            i = 0,
            len = items.length;
   
        for (i = 0; i < len; i++) {
            item = items[i].split("=");
            
            // decodeURIComponent解码
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            parmStr+=decodeURIComponent(item[0]) + '=' + decodeURIComponent(item[1]) + (i==len-1?"":'&')
            if (name.length) {
                args[name] = value;
            }
        }
        return {
            parmObj:args,
            parmStr:parmStr
        }
    } 
    return {
        htmlModule : htmlModule,
        routPath : routPath,
        localStorageObj : localStorageObj,
        ajaxObj:ajaxObj,
        catchParameter:catchParameter,
        setHeight:setHeight,
        GetPageurl:GetPageurl,
        getQueryStringArgs:getQueryStringArgs
    }
});