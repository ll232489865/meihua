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
     var score = 0;
     var mouses = $('#table  .mouse_content');
     var time1;
     var constant = {
         holeNum:10,//洞个数
         showInterval:4000,//出现时间间隔
         hideInterval:8300,//出现多长时间后 隐藏
         totalScore:100,//总分上限
         timeScore:10,//每次积分
         timeWordsNum:3,//每次出现的单词的个数
         isStart:false,
     };
     var correctWord = null;


     // 1.跳出一个地鼠，过一会儿隐藏
     function show(word){     

         var randNum = Math.random() * constant.holeNum;
         var a = Math.floor(randNum);
         var mouse = mouses.get(a);

         if(!_show($(mouse),word)){
             show(word);
         }

         function _hide(){
             $(mouse).addClass('mouseDown').removeClass('mouseUp');
             $(mouse).find("img").addClass('mouseDown').removeClass('mouseUp');
             $(mouse).find("span").hide();
         }
         // setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式
         // time = setTimeout(_hide, 5500);
         // return time
     }

     function _hide($mouse_content) {
         if($mouse_content.height() == 0) return false;
         $mouse_content.addClass('mouseDown').removeClass('mouseUp');
         $mouse_content.find("img").addClass('mouseDown').removeClass('mouseUp');
         $mouse_content.find("span").hide();
     }

     function _show($mouse_content,word){
         if($mouse_content.hasClass("mouseUp")) return false;
         $mouse_content.addClass('mouseUp').removeClass('mouseDown');
         $mouse_content.find("img").addClass('mouseUp').removeClass('mouseDown');
         $mouse_content.find("span").text(word).show();
         return true;
     };
     
     function _hideAllHole() {
         if(mouses.length > 0){
            for(var i =0;i < mouses.length;i ++){
                _hide($(mouses[i]));
            }
         }
     }



     //2.获取单词或者句子
     function _getWord(){
         //通过ajax  TODO
         var words = ["get","input","words","acc","add","floor","mouse"];
         var word = words[template.getRandom(0,words.length)];
         return word;
     }

     function _getWrongWord(word){
        var ns = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n'];
        var index = template.getRandom(0,word.length);
        var o = word.charAt(index);
        var result = word.replace(o,ns[template.getRandom(0,ns.length)]);
        // console.log(result);
        return result;
     }

     // 3.跳出一批地鼠
     function play(){
         // for(var i =0 ;i < constant.timeWordsNum;i++){
         //     show(_getWord());
         // }
         correctWord = _getWord();
         var t1 = show(correctWord);
         var t2 = show(_getWrongWord(correctWord));
         var t3 = show(_getWrongWord(correctWord));
     }

     //4.判断正确与否  然后算分 还是减分
     function isCorrect(word){
        return word == correctWord ? true:false;
     }

     // 5.每隔一段时间跳出一批地鼠
     // time1 = setInterval(play, constant.showInterval);
    

     //开始游戏
    $("#startBtn").on("click",function(){
    	$(this).hide();
		play();
		 $("body").css('cursor', 'url(../images/mouse_game/cursor.ico), default');
		 constant.isStart =true;	 
		 return false;
    });

     //下个游戏
     $("#nextGameBtn").on("click",function(){
          location.href = "ballon_game.html";
     });
     
     // 打中地鼠
     $('.mouse_content').click(function(){     	
     	if(!$(this).hasClass("mouseUp")) return false;
         var $span = $(this).find("span");
         $(this).find("img").addClass('mouseDown').removeClass('mouseUp');
         $span.hide();
         _hideAllHole();         
         if($span.text()){
             if(isCorrect($span.text())){
                 score += constant.timeScore;
                 // 设置id=hit标签的src属性值为hit.wav并播放它
         		$('#hit').attr('src', '../music/mouse_game/hit.wav').get(0).play();
                 setTimeout(function () {
					 if(score < 100){
							play();
					 }                     
                 },300);
             }else{
                alert("选错了！");
                if(score>0){ 
					score -= constant.timeScore;
                }
                
                setTimeout(function () {
                    var t1 = show(correctWord);
                    var t2 = show(_getWrongWord(correctWord));
                    var t3 = show(_getWrongWord(correctWord));
                },300);
             }
         }

         //TODO
         // 设置id=score的标签的文本内容(在这里指的是p标签)
         $('#score').text('得分：' + score);
         $("body").css('cursor', 'url(../images/mouse_game/cursor-down.ico), default');
         setTimeout(function () {
             $("body").trigger("mouseup");
         },250);
         if(score>=constant.totalScore){
			 $("#nextGameBtn").show();
			 $("#startBtn").hide();
			 _hideAllHole(); 
             clearInterval(time1);
             alert('游戏结束');
             return
         }
         
         return false;
     });

     // 鼠标没有被按下时，指针图片改为image/cursor.ico
     $('body').mouseup(function(){    
     	if(constant.isStart) { 
     		$(this).css('cursor', 'url(../images/mouse_game/cursor.ico), default');
     	}         
     });
 })
