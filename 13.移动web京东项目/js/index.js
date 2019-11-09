window.onload = function () {
    searchEffect();
    timeBack();
    bannerEffect();

}
    //头部搜索快的js效果
function searchEffect(){
    //1.获取当前banner的高度
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    //  获取search搜索快
    var search = document.querySelector(".js_search");
    //2.获取当前屏幕滚动时，banner滚出屏幕的距离
    window.onscroll = function () {
        // document.documentElement.scrollTop
        var offsetTop = document.documentElement.scrollTop; // 单词写错了？ 在浏览器里边确实拿不到body的值 像这种兼容性问题 你都要专门记一页笔记 走了 嗯嗯
        //3.计算比例值，获取透明度，设置背景颜色样式
        var opaticy = 0;
        //判断如果banner还没有完全滚出屏幕，那么才有必要计算透明度滑入设置透明度
        if(offsetTop < bannerHeight){
            opaticy = offsetTop/bannerHeight;
            // 设置样式
            search.style.backgroundColor = "rgba(233, 35, 34,"+opaticy+")";
        }
    }
}

    // 倒计时效果
function timeBack() {
    //1.获取用于展示时间的span
    var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
    //2.设置初始的倒计时事件
    var totalTime = 3700;
    // 开启定时器
    var timerId=setInterval(function () {
        if(totalTime <= 0){
            clearInterval(timerId);
            return;
        }
        totalTime--;
        //得到剩余时间的  时  分  秒
        // 获得小时
        var hour = Math.floor(totalTime/3600);
        // 获得分钟
        var minute = Math.floor(totalTime%3600/60);
        // 获得秒数
        var second =Math.floor(totalTime%60);
        spans[0].innerHTML=Math.floor(hour/10);
        spans[1].innerHTML=Math.floor(hour%10);
        spans[3].innerHTML=Math.floor(minute/10);
        spans[4].innerHTML=Math.floor(minute%10);
        spans[6].innerHTML=Math.floor(second/10);
        spans[7].innerHTML=Math.floor(second%10);
    }, 1000);
}

    // 轮播图效果
function bannerEffect() {
    // 1.设置轮播图的页面结构
    // a.在开始的位置添加原始的最后一张图
    // b.在结束的位置添加原始的第一张图
    // 1.1获取轮播图结构
    var banner = document.querySelector(".jd_banner");
    // 1.2获取图片容器
    var imgBox = banner.querySelector("ul:first-of-type");
    // 1.3获取原始的第一张图
    var first = imgBox.querySelector("li:first-of-type");
    // 1.4获取原始的最后一张图
    var last = imgBox.querySelector("li:last-of-type");
    // 1.5在首位插入两张图
    imgBox.appendChild(first.cloneNode(true));
    // insertBefore（需要插入dom元素，位置）
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);



    // 2.设置对应的样式
    // 2.1获取所有的li
    var lis = imgBox.querySelectorAll("li");
    // 2.2获取li元素的数量
    var count = lis.length;
    // 2.3获取banner的宽度
    var bannerWidth = banner.offsetWidth;    // index是1就代表第一个 这个是单张图片的宽度  index乘以bannerWidth就是第0到index个图片的总宽度 这样吧 你给我解释一下
    // index.bannerWidth 是沙意思？   就是图片的数量 * 图片的宽度   我好像明白你说的了  但是怎么表达图片的数量呢 你不明白！
    // index.bannerWidth zh这个点是干啥的？ 是乘法符号？ ？？？ 乘法符号 是 * 直到把 ？
    // 知道   index.bannerWidth那给个表示的是什么
    // 这个是你抄错了 这个是BUG
    // 2.4设置图片盒子的宽度
    imgBox.style.width=count*bannerWidth+"px";
    // 2.5设置每一个li元素的宽度
    for(var i = 0; i < lis.length; i++ ){
        lis[i].style.width = bannerWidth+"px";
    }

    //  设置默认的索引值
    var index = 1;   // 这里定义了索引值 对呀刚才那块也有值呀 ！ 你看看你之前写的哈  数量乘以宽度等于总宽度 你数量.kua宽度是个啥？

    // 3.设置默认的偏移
    imgBox.style.left = - bannerWidth+"px";

    // 4.当屏幕变化的时候，重新设置宽度
    window.onresize = function() {
        // 4.1获取banner的宽度去覆盖全局的宽度值
        bannerWidth = banner.offsetWidth;
        // 4.2设置图片盒子的宽度
        imgBox.style.width=count*bannerWidth+"px";
        // 4.3设置每一个li元素的宽度
        for(var i = 0; i < lis.length; i++ ){
            lis[i].style.width = bannerWidth+"px";
        }


        // 4.4重新设置偏移
        imgBox.style.left = - index*bannerWidth+"px";
    }
        // 实现点标记
    var setIndicator = function (index) {
        var indicator = banner.querySelector("ul:last-of-type").querySelectorAll("li");
        // 先清除其他li元素的active样式
        for(var i = 0; i < indicator.length; i++){
            indicator[i].classList.remove("active");
        }
        // 为当前li元素添加active属性
        indicator[index-1].classList.add("active");
    }

    // 5.实现自动轮播（用到定时器）
    var timerId;
    var StartTime = function () {
       timerId = setInterval(function () {
            // 5.1变换索引
            index++;
            // 5.2添加过渡效果
            imgBox.style.transition="left 0.5s";
            // 5.3设置偏移
            imgBox.style.left = (-index*bannerWidth)+"px";
            setTimeout(function () {
                // 判断是否到最后一张，如果是则切换到第一张
                if(index == count-1){
                    // 从最后一张切换到第一张时 不需要过渡效果   需要取消
                    index = 1;
                    // 关闭过渡效果
                    imgBox.style.transition="none";
                    // 偏移到指定的位置
                    imgBox.style.left = (-index*bannerWidth)+"px";
                }
            }, 500)
        }, 2000);

    }
    StartTime();

    // 6.实现手动轮播
    var startX,moveX,distanceX;
    // 标记当前过渡效果是否已经执行完毕
    var isEnd = true;
    imgBox.addEventListener("touchstart",function (e) {
        // 清除定时器
        clearInterval(timerId);
        // 获取当前手指的起始位置
        startX = e.targetTouches[0].clientX;
    });
    // 为图片添加触摸事件--滑动过程
    imgBox.addEventListener("touchmove", function (e) {
        if(isEnd == true){
            // 清除过渡
            imgBox.style.transaction = "none";
            // 记录手指在滑动过程中的位置
            moveX = e.targetTouches[0].clientX;
            // 计算坐标的差异
            distanceX = moveX - startX;
            // 实现元素偏移  left参照最原始的坐标
            imgBox.style.left = (-index*bannerWidth + distanceX) + "px";   // index是4 index对象无bannerWidth属性 bannerWidth也未定义 这是啥玩意？
        }
    });
    // 为图片添加触摸结束事件--
    imgBox.addEventListener("touchend", function (e) {
        // 松开手指，标记当前过渡效果正在执行
        isEnd = false;
        // 获得当前滑动的距离，判断距离是否超出指定的范围  100px
        if(Math.abs(distanceX) > 100){
            // 判断滑动的方向
            if(distanceX > 0){  // 上一张
                index--;
            } else {   // 下一张
              index++;
            }
            // 翻页
            imgBox.style.transiction="left 0.5 ease-in-out";
            imgBox.style.left = -index*bannerWidth + "px";
        } else if(distanceX > 0){  // 得保证用户确实进行过滑动操作
            // 回弹
            imgBox.style.transition="left 0.5 ease-in-out";
            imgBox.style.left = -index*bannerWidth + "px";
        }
        // 将上一次Move所产生的数据重置为0
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });
    // webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个过渡效果执行完毕的时候，会触发的事件
    imgBox.addEventListener("webkitTransitionEnd", function () {
        // 如果到了最后一张（count - 1）, 回到索引1
        // 如果到来第一张（0）， 回到索引（count- 2）
            if(index == count-1){
                index = 1;
                // 清除过渡
                imgBox.style.transition="none";
                // 设置偏移
                imgBox.style.left = -index*bannerWidth + "px";
            } else if (index == 0){
                index = count-2;
                // 清除过渡
                imgBox.style.transition="none";
                // 设置偏移
                imgBox.style.left = -index*bannerWidth + "px";
            }
            setIndicator(index);
            setTimeout(function () {
                isEnd = true;
                // 清除之前添加的定时器
                clearInterval(timerId);
                // 重新开启定时器
                StartTime();
            },500);

    });

}