/* 返回顶部 */
function toTop(min_height){
  var win = $(window);
  var toTop_html = '<div class="toTop">⬆️</div>';
  $("body").append(toTop_html);

  $(".toTop").click(//滚动动画
    function(){$('html,body').animate({scrollTop:0},500);
  }).hover(//为返回顶部增加鼠标进入的反馈效果，用添加删除css类实现
    function(){$(this).addClass("hover");},
    function(){$(this).removeClass("hover");
  });

  //获取页面的最小高度，无传入值则默认为600像素
  min_height ? min_height = min_height : min_height = 600;
  //为窗口的scroll事件绑定处理函数
  win.scroll(function(){
    //获取窗口的滚动条的垂直位置
    var s = win.scrollTop();
    //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
    if( s > min_height){
      $(".toTop").fadeIn(100);
    }else{
      $(".toTop").fadeOut(200);
    };
  });
};
toTop();