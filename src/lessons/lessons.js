require.config({
    paths : {
        "jquery" : "../js/libs/jquery.min",
        "moduleHtml":'../js/common'
    }
    ,
    shim: {
         'moduleHtml':{
            exports: 'template'
         }
　　　　}
})
define(['jquery','moduleHtml'],function($,template){
    
    // var colorInfo = {
    //     learingData:[
    //         {
    //             img:'1@2x.png',
    //             color:"#00712C"
    //         }
    //         ,
    //         {
    //             img:'2@2x.png',
    //             color:"#00712C"
    //         }
    //         ,
    //         {
    //             img:'3@2x.png',
    //             color:"#724100"
    //         }
    //         ,
    //         {
    //             img:'4@2x.png',
    //             color:"#724100"
    //         }
    //         ,
    //         {
    //             img:'5@2x.png',
    //             color:"#00546F"
    //         }
    //         ,
    //         {
    //             img:'6@2x.png',
    //             color:'#750A0A'
    //         }
            
    //     ]
    //     ,
    //     nostudy:{
    //         img:'未激活单元@2x.png',
    //         color:'#404040'
    //     }

    // }
    
    // var unitData = {
    //     data:[
    //         {unit:1,type:'',color:''},
    //         {unit:2,type:'',color:''},
    //         {unit:3,type:'',color:''},
    //         {unit:4,type:'',color:''},
    //         {unit:5,type:'',color:''},
    //         {unit:6,type:'',color:''},
    //         {unit:7,type:'',color:''},
    //         {unit:8,type:'',color:''},
    //         {unit:9,type:'',color:''},
    //         {unit:10,type:'',color:''},
    //         {unit:11,type:'',color:''},
    //         {unit:12,type:'',color:''},
    //     ]
    //     ,
    //     learing:5,
    //     total:13
    // }
    // var result = unitData.data;
    // for(var i=0,len=result.length;i<len;i++){
    //     $.extend(result[i],{top:Math.floor(i/ 4)*200 + 'px'})
    //     if(i<unitData.learing +1){
    //         var random = Math.floor ( Math.random ( ) * 5 + 1 );
    //         $.extend(
    //             result[i],
    //             {
    //                 color:colorInfo.learingData[random].color,
    //                 img:colorInfo.learingData[random].img
    //             }
    //         );
            
    //     }else{
    //         $.extend(
    //             result[i],
    //             {
    //                 color:colorInfo.nostudy.color,
    //                 img:colorInfo.nostudy.img
    //             }
    //         );
    //     }
        
    //     if((Math.floor(i/ 4))%2 === 0){
    //         $.extend(result[i],{position:'left',distance:(i/4)%1*100 +'%'})
    //     }else{
    //         $.extend(result[i],{position:'right',distance:(i/4)%1*100 +'%'})
    //     }
        
    // }
    // var str = ''
    // $.each( result, function(i, n){
    //     var href = (i <= unitData.learing)?'unit.html#'+(i+1) : 'javascript:'
    //     str += '<a href="'+href+'" class="lesson_item tdn cpi" style="'+n.position+':'+n.distance+'; top:'+n.top+';">'+
    //                 '<img src="../images/'+n.img+'" width="100%" height="100%" alt="">'+
    //                 '<span class="rel lesson_w" style="text-shadow:'+n.color+' 2px 0 2px,'+n.color+' 0 2px 2px,'+n.color+' -2px 0 2px,'+n.color+' 0 -2px 2px;">unit'+(i+1)+'</span>'+
    //             '</a>'
        
    // })  
    // $('#lesson_main').html(str);
    // var imgPosition = [];
    // $('#lesson_main a').each(function(i,n){
    //     imgPosition.push({
    //         x : $(this).position().left,
    //         y : $(this).position().top
    //     })
    // })
});
