/*TMODJS:{"version":1,"md5":"c62e8c9c7642f3413166cdd13accf1a0"}*/
template('psrlist',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$escape=$utils.$escape,$out='';$each(list,function(value,i){
$out+=' <div class="psr_box mt20 p20"> <h3 class="f16"> ';
$out+=$escape(value.name);
$out+=' </h3> <div class="fix mt10"> <div class="l mr20"> <a href="';
$out+=$escape(value.linkUrl);
$out+='"> <img src="';
$out+=$escape(value.picUrl);
$out+='" width="310" alt=""> </a> </div> <div class="cell"> <div class="fix"> <div class="l pct50 lh22"> <div>项目地点:';
$out+=$escape(value.addr);
$out+='</div> <div>报名截止日期:';
$out+=$escape(value.insrtTmstmp);
$out+='</div> <div>是否亲自：学生单飞</div> </div> <div class="l pct50 lh22"> <div>适合年龄:12-18岁</div> <div> 出发日期: <span class="rel"> <span class="Downlist Downlist_36 w200" data-rel="Downlistdown';
$out+=$escape(value.id);
$out+='"> <span class="Downlist_w"> 第1期 2017-03-30 共 7 天 学生 </span> <span class="Trigon"> </span> </span> <div id="Downlistdown';
$out+=$escape(value.id);
$out+='" class="DownlistWarp"> <div class="Downlist_link">第1期 2017-03-30 共 7 天 学生</div> <div class="Downlist_link">第2期 2017-05-10 共 5 天 学生</div> </div> </span> </div> </div> </div> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mt20 psr_tb"> <tr> <td align="40%" valign="middle"> <h4 class="f16"> 项目特色 </h4> <ul class="mt10 lh24"> <li>感受古韵风情，人文长城</li> <li>去了解远古的烽烟</li> <li>体味厚重的长城文化底蕴！</li> <li>徒步长城，爱上健行</li> <li>用双脚走出真实的自己！</li> </ul> </td> <td align="center" valign="middle"> <img src="css/img/theme-icon.png" alt=""> <div class="C_1 f20 b"> ￥430元 </div> </td> <td width="30%" align="center" valign="middle"> <a href="';
$out+=$escape(value.linkUrl);
$out+='" class="Btn_blue Btn_30">查看详情</a> </td> </tr> </table> </div> </div> </div> ';
});
return new String($out);
});