$(function () {
    setTimeout(function () {
        $(".section1").addClass('comein');
    }, 200);
    $("#fullpage").fullpage({
       navigation: true,   /*显示项目符号*/
       loopBottom: true,   /*循环滚动*/
       onLeave:function(index, nextIndex, direction){
            if(nextIndex != 1){
                $("#bg").addClass("rotate");
            } else {
                $("#bg").removeClass("rotate");
            }
            // 第二屏幕的制作
            // 当我们进入第二屏的时候   图片会变大
            if(nextIndex == 2 ){
                $(".p2").css("transform", "translateX(-50%) translateY(-50%) translateZ(0px) scale(1)");
            } else {
                $(".p2").css("transform", "translateX(-50%) translateY(-50%) translateZ(3000px) scale(1)");
            }
            // 第三屏的制作
           // 当我们进入第三屏幕的时候   盒子进入  屏幕
           if(nextIndex == 3){
               $(".p3").css("transform", "translateZ(-50px) rotateX(30deg)");
               $(".words-03").css("transform", "translateZ(0px) rotateX(0deg)");
           }
           // 第四屏的制作
           if(nextIndex == 4){
               $(".p3").css("transform", "translateZ(-200px) rotateX(-45deg) translateX(3000px)");
               $(".words-03").css("transform", "translateZ(1200px) rotateX(-60deg)");
           }
       }
    });
});