/*TMODJS:{"version":"1.0.0"}*/
!function(){function a(a,b){return(/string|function/.test(typeof b)?h:g)(a,b)}function b(a,c){return"string"!=typeof a&&(c=typeof a,"number"===c?a+="":a="function"===c?b(a.call(a)):""),a}function c(a){return l[a]}function d(a){return b(a).replace(/&(?![\w#]+;)|[<>"']/g,c)}function e(a,b){if(m(a))for(var c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)}function f(a,b){var c=/(\/)[^\/]+\1\.\.\1/,d=("./"+a).replace(/[^\/]+$/,""),e=d+b;for(e=e.replace(/\/\.\//g,"/");e.match(c);)e=e.replace(c,"/");return e}function g(b,c){var d=a.get(b)||i({filename:b,name:"Render Error",message:"Template not found"});return c?d(c):d}function h(a,b){if("string"==typeof b){var c=b;b=function(){return new k(c)}}var d=j[a]=function(c){try{return new b(c,a)+""}catch(d){return i(d)()}};return d.prototype=b.prototype=n,d.toString=function(){return b+""},d}function i(a){var b="{Template Error}",c=a.stack||"";if(c)c=c.split("\n").slice(0,2).join("\n");else for(var d in a)c+="<"+d+">\n"+a[d]+"\n\n";return function(){return"object"==typeof console&&console.error(b+"\n\n"+c),b}}var j=a.cache={},k=this.String,l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},n=a.utils={$helpers:{},$include:function(a,b,c){return a=f(c,a),g(a,b)},$string:b,$escape:d,$each:e},o=a.helpers=n.$helpers;a.get=function(a){return j[a.replace(/^\.\//,"")]},a.helper=function(a,b){o[a]=b},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:this.template=a,/*v:1*/
a("footer",'<div class="Foot"> <div class="Link_solie"></div> <div class=" bgf5 tc"> Copyright(C)2010-2017 \u534e\u7f8e\u5c11\u513f\u82f1\u8bed </div> </div> </div>'),/*v:1*/
a("header",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.path,e="";return e+=' <div class="Head"> <div class="Constr fix"> <div class="l mr20"> <a href="home/home.html" class="g3 tdn"> <img src="',e+=c(d),e+='../images/logo.png" alt="logo" class="vm ml30"> </a> </div> <ul class="r mt5 mr20"> <li class="Nav_item"> <a href="../lessons/lessons.html" title="Lessons"> <img src="',e+=c(d),e+='../images/study.png"alt="study" width="48px", height="48px"> </a> </li> <li class="Nav_item"> <a href="../setting/setting.html#0" title="Setting"> <img src="',e+=c(d),e+='../images/setting.png" alt="Setting" width="48px", height="48px"> </a> </li> <li class="Nav_item"> <a class="Nav_a" href="../admin/admin.html#1" title="Admin"> <img src="',e+=c(d),e+='../images/administrator.png" alt="Admin" width="48px", height="48px"> </a> </li> <li class="Nav_item"> <a class="Nav_a" href="../help/help.html" title="Help"> <img src="',e+=c(d),e+='../images/help.png" alt="Help" width="48px", height="48px"> </a> </li> </ul> </div> </div>  ',new k(e)})}();