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
    return "http://120.27.224.143:10010/v1/" + path
}

require.config({
    paths : {
        "tpl":path+'../output/main/template',
        "tpl2":path+'../output/admin/template',
        'jquery':path+'../js/libs/jquery.min'
    }
})

var userset ={
      superAdmin:'SUPERADMIN-API-KEY',
      teacher:'TEACHER-API-KEY',
      student:'STUDENT-API-KEY',
      zoneAdmin:'ZONEADMIN-API-KEY'
}
define(['tpl','tpl2','jquery'],function(template,tpl2,$){
    
    function setModule(nanmeArray,data,templateObj){
        var newtemplate = templateObj || template;
        if(nanmeArray instanceof Array)
        {
            //初始化加载模板
            nanmeArray.forEach(function(value,index,array){
                if(document.getElementsByTagName("html")[0].className.indexOf('Account')== '-1'){
                    var htmlModule = newtemplate(value, data);
                }else{
                    var htmlModule = tpl2(value, data);
                }
                if(document.getElementById(value)){
                    document.getElementById(value).innerHTML = htmlModule;
                }
                
            })
            setHeight();
        }else{
            //一个个动态加载模板
            var htmlModule = newtemplate(nanmeArray.getAttribute('data-module'), data);
            nanmeArray.innerHTML = htmlModule;
        }
        
    }
    function htmlModule(data,html,templateObj){
        if(!html)
        {
            if(document.getElementsByTagName("html")[0].className.indexOf('Account')== '-1'){
                setModule(['footer'],{list:data});
                $('#logout').click(function(){
                    var user = userset[JSON.parse(localStorage.getItem("session")).user]
                    $.ajax({
                        url:'http://120.27.224.143:10010/v1/logout',
                        type:"get",
                        headers:{
                            "Content-Type": 'application/json',
                            'STUDENT-API-KEY'  : JSON.parse(localStorage.getItem("session")).apiKey
                        }
                        ,
                        dataType:'json',
                        timeout:60000,
                        success:function(data){
                            var code = data.ret.code;
                            if(code==0){
                                localStorage.removeItem('session');
                                window.location.href = '../login/login.html';
                            }
                            if(code == 401001){
                                window.location.href="../login/login.html";
                            }
                            
                        }
                        ,
                        error:function(XMLHttpRequest, textStatus, errorThrown){
                            if(errorThrown == 'Unauthorized'){
                                localStorage.removeItem('session');
                                window.location.href = '../login/login.html';
                            }
                        }
                    })
                    
                })
            }else{
                setModule(['header2'],data);
                $('#logout').click(function(){
                    var user = userset[JSON.parse(localStorage.getItem("session")).user];
                    $.ajax({
                        url:'http://120.27.224.143:10010/v1/logout',
                        type:"get",
                        headers:{
                            "Content-Type": 'application/json',
                            'SUPERADMIN-API-KEY' : JSON.parse(localStorage.getItem("session")).apiKey
                        }
                        ,
                        dataType:'json',
                        timeout:60000,
                        success:function(data){
                            localStorage.removeItem('session');
                            window.location.href = '../login/login.html';
                        }
                        ,
                        error:function(XMLHttpRequest, textStatus, errorThrown){
                            if(errorThrown == 'Unauthorized'){
                                localStorage.removeItem('session');
                                window.location.href = '../login/login.html';
                            }
                        }
                    })
                })
            }
        }else{
            setModule(html,data,templateObj);
        }
        
        
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
    function ajaxObj(url,parms,callback,errorback){
        var defaultCfg = {
            dataType:'json',//服务器返回json格式数据
            type:'get',//HTTP请求类型
            timeout:60000,//超时时间
            data:{},
            headers:{
                'Content-Type': 'application/json'
            },
            success:function(data){
                callback(data);
            },
            error:function(xhr,type,errorThrown){
                errorback&&errorback(xhr,type,errorThrown)
            }
        }
        $.extend(defaultCfg.headers,parms.headers);
        var cfg = $.extend({},defaultCfg,{data:JSON.stringify(parms.data)},{type:parms.type});

        $.ajax(apiPath(url),cfg);
    }
    //直接调用加载头低部模板
    htmlModule($.extend(routPath(),{session:localStorage.getItem('session')}));

    //获取hash取值
    function catchParameter(str,character){
        return str.substring(str.lastIndexOf(character)+1);
    }
    //设置高度
    function setHeight(){
        var h = $('#header').outerHeight();
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


	//获取一个最小min 最大max的随机数 整数
    function getRandom(min,max){ 
		return Math.floor(Math.random()*max + min);
    }
    //根据身份返回不同的 headers 键值对
    function dynamicKey(){
       var key =  JSON.parse(localStorage.getItem("session")).user;
       switch(key)
        {
            case 'superAdmin':
            return {
                'SUPERADMIN-API-KEY':JSON.parse(localStorage.getItem("session")).apiKey
            }
            break;
            case 'student':
            return {
                'STUDENT-API-KEY':JSON.parse(localStorage.getItem("session")).apiKey
            }
            break;
            case 'teacher':
            return {
                'TEACHER-API-KEY':JSON.parse(localStorage.getItem("session")).apiKey
            }
            break;
            case 'zoneAdmin':
            return {
                'ZONEADMIN-API-KEY':JSON.parse(localStorage.getItem("session")).apiKey
            }
            break;
        }
    }

    //动态构造header
    function getApiKey(){   	
    	

     	/* return {
          //   	"Content-Type": 'application/json',
          //       'SUPERADMIN-API-KEY':'198ef2c8-84d4-485c-ac47-55dca2266d00'
          //   }
		return {
            	"Content-Type": 'application/json',
                'STUDENT-API-KEY':'c89b5057-2a52-4abf-b942-5023b590cfb3'
            }*/

           var key =  JSON.parse(localStorage.getItem("session")).user;
       switch(key)
        {
            case 'superAdmin':
            return {
            	"Content-Type": 'application/json',
                'SUPERADMIN-API-KEY':JSON.parse(localStorage.getItem("session")).apiKey
            }
            break;
            case 'student':
            return {
            	"Content-Type": 'application/json',
                'STUDENT-API-KEY':JSON.parse(localStorage.getItem("session")).apiKey
            }
            break;
            case 'teacher':
            return {
            	"Content-Type": 'application/json',
                'TEACHER-API-KEY':JSON.parse(localStorage.getItem("session")).apiKey
            }
            break;
            case 'zoneAdmin':
            return {
            	"Content-Type": 'application/json',
                'ZONEADMIN-API-KEY':JSON.parse(localStorage.getItem("session")).apiKey
            }
            break;
        }
    }


     function showPaint(){   
     	return;
    	var roll = JSON.parse(localStorage.getItem("session")).user;
    	if(roll == 'teacher'){ 
    		$(".ce_slide_control").show();
    	}else{ 
			$(".ce_slide_control").hide();
    	}
    	
    }

    function updateGrade(param) {
        var key =  JSON.parse(localStorage.getItem("session")).user;
        if(key != "student") return;
        $.ajax({
            url: param.getUrl + '/v1/progress/update',
            type: "post",
            dataType: 'json',
            timeout: 60000,
            data: JSON.stringify(param.data),
            headers: param.header,
            success: function(data) {
                var result = data;
            },
            error: function() {
                alert("更新数据异常");
            }
        });
    }

    return {
        htmlModule : htmlModule,
        routPath : routPath,
        localStorageObj : localStorageObj,
        ajaxObj:ajaxObj,
        catchParameter:catchParameter,
        setHeight:setHeight,
        GetPageurl:GetPageurl,
        getQueryStringArgs:getQueryStringArgs,
        getRandom:getRandom,
        dynamicKey:dynamicKey,
        getApiKey:getApiKey,
        showPaint:showPaint,
        updateGrade:updateGrade
    }
});