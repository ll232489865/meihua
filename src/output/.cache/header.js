/*TMODJS:{"version":31,"md5":"f74f344221c16cb359cd77718b9d2702"}*/
template('header',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,path=$data.path,$out='';$out+=' <div class="Head"> <div class="Constr fix"> <div class="l mr20"> <a href="home/home.html" class="g3 tdn"> <img src="';
$out+=$escape(path);
$out+='../images/logo.png" alt="logo" class="vm ml30"> </a> </div> <ul class="r mt5 mr20"> <li class="Nav_item"> <a href="../lessons/lessons.html" title="Lessons"> <img src="';
$out+=$escape(path);
$out+='../images/study.png"alt="study" width="48px", height="48px"> </a> </li> <li class="Nav_item"> <a href="../setting/setting.html#0" title="Setting"> <img src="';
$out+=$escape(path);
$out+='../images/setting.png" alt="Setting" width="48px", height="48px"> </a> </li> <li class="Nav_item"> <a class="Nav_a" href="../admin/admin.html#1" title="Admin"> <img src="';
$out+=$escape(path);
$out+='../images/administrator.png" alt="Admin" width="48px", height="48px"> </a> </li> <li class="Nav_item"> <a class="Nav_a" href="../help/help.html" title="Help"> <img src="';
$out+=$escape(path);
$out+='../images/help.png" alt="Help" width="48px", height="48px"> </a> </li> </ul> </div> </div>  ';
return new String($out);
});