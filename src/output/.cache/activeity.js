/*TMODJS:{"version":1,"md5":"c5ac179e001b9be66edcb342f63622af"}*/
template('activeity',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$escape=$utils.$escape,$out='';$out+=' ';
$each(list,function(value,i){
$out+=' <li class="Srect_box"> <a href="';
$out+=$escape(value.linkUrl);
$out+='"> <img src="';
$out+=$escape(value.picUrl);
$out+='" width="100%" alt=""> </a> <div class="pr10 pl10"> <div class="Srect_area_tt"> ';
$out+=$escape(value.name);
$out+=' </div> <div class="Srect_area_tt"> 5年航海夏令营和学校活动经验；充分贯彻4C营地教育理念。 </div> <div class="mt20 fix Srect_col"> <span class="l"> <img src="css/img/floor-clock.png" alt="" class="mr5"> 2017-04-22 7天 </span> <span class="r"> 7980 元 </span> </div> </div> </li> ';
});
$out+=' ';
return new String($out);
});