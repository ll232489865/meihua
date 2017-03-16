/*TMODJS:{"version":30,"md5":"911d89354b47fef60207b6345f5071d4"}*/
template('header',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,path=$data.path,$out='';$out+=' <div class="Head"> <div class="Constr fix"> <div class="l mr20"> <a href="../lessons/lessons.html" class="g3 tdn"> <img src="';
$out+=$escape(path);
$out+='../images/logo.png" height="62" alt="图片Alt" class="vm"> </a> </div> <ul class="r mt10"> <li class="Nav_item"> <a class="Nav_a Nav_off" href="../lessons/lessons.html" title="首页">Lessons</a> </li> <li class="Nav_item"> <a class="Nav_a" href="../setting/setting.html#0" onclick="window.location.reload()" title="最新公告">Setting</a> </li> <li class="Nav_item"> <a class="Nav_a" href="../admin/admin.html#1" onclick="window.location.reload()" title="用户中心">Admin</a> </li> <li class="Nav_item"> <a class="Nav_a" href="../help/help.html" title="合作推广">Help</a> </li> <li class="Nav_item"> <a class="Nav_a" href="../login/login.html" title="合作推广">login</a> </li> </ul> </div> </div>  ';
return new String($out);
});