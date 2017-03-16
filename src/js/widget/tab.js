require.config({
    paths : {
        "jquery" : "js/libs/jquery.min",
    }
})
define(['jquery'],function($){
    function tab(a, callback) {
        a.click(function() {
            var data = $(this).attr('data-rel');
            var firstData = data.match(/\S+_/i);
            var lastData = data.match(/[^_]+$/g);
            var re = new RegExp('^' + firstData, "i");
            var thisData = $('.Panel').filter(function(index) {
                return re.test($(this).attr('id')) == true;
            });
            $(this).addClass(firstData + 'on').siblings().removeClass(firstData + 'on');
            var thisPanel = thisData.filter(function(index) {
                return $(this).attr('id') == data
            });
            if(callback){
                callback(thisPanel,$(this));
            }else{
                thisData.removeClass('db').addClass('dn');
                thisPanel.removeClass('dn').addClass('db');
            }
        });
    } 
    return {
        tab:tab
    }
})