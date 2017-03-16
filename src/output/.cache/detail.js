/*TMODJS:{"version":1,"md5":"177ccea1f9bf3f21a0f9b9093e7da30a"}*/
template('detail',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,picUrl=$data.picUrl,addr=$data.addr,insrtTmstmp=$data.insrtTmstmp,$out='';$out+='<div class="Panel_tt"> <a href="javascript:" class="r f12 tdn C-2"> 分享内容<span class="fs">&gt;</span> </a> <i class="Panel_icon"> </i> <span class="Vm_dib"> ';
$out+=$escape(name);
$out+=' </span> </div> <div class="Panel_body" > <div class="psr_box p20"> <div class="fix"> <div class="l mr20"> <img src="';
$out+=$escape(picUrl);
$out+='" height="270" alt=""> </div> <div class="cell"> <div class="fix"> <div class="l pct50 lh22"> <div>项目地点:';
$out+=$escape(addr);
$out+='</div> <div>报名截止日期:';
$out+=$escape(insrtTmstmp);
$out+='</div> <div>是否亲自：学生单飞</div> </div> <div class="l pct50 lh22"> <div>适合年龄:12-18岁</div> <div> 出发日期: <span class="rel"> <span class="Downlist Downlist_36" data-rel="Downlistdown2" style="width: 100px;"> <span class="Downlist_w"> 综合排序(默认) </span> <span class="Trigon"> </span> </span> <div id="Downlistdown2" class="DownlistWarp" style="left: -1px; top: 26px; width: 130px;"> <div class="Downlist_link">综合排序(默认)</div> <div class="Downlist_link">出行日期-从远到近</div> <div class="Downlist_link">出行日期-从近到远</div> <div class="Downlist_link">费用升序</div> <div class="Downlist_link">费用降序</div> </div> </span> </div> </div> </div> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mt20 psr_tb"> <tr> <td align="40%" valign="middle"> <h4 class="f16"> 项目特色 </h4> <ul class="mt10 lh24"> <li>感受古韵风情，人文长城</li> <li>去了解远古的烽烟</li> <li>体味厚重的长城文化底蕴！</li> <li>徒步长城，爱上健行</li> <li>用双脚走出真实的自己！</li> </ul> </td> <td align="center" valign="middle"> <img src="css/img/theme-icon.png" alt=""> <div class="C_1 f20 b"> ￥430元 </div> </td> <td width="30%" align="center" valign="middle"> <div class="mb10"> <span class="Btn_red Btn_30">加入收藏</span> </div> <a class="Btn_blue Btn_30 tdn" href="create_order.html#0">立即预订</a> </td> </tr> </table> </div> </div> </div> </div> ';
return new String($out);
});