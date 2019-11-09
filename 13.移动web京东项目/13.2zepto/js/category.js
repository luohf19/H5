window.onload = function () {
    // 获取左侧栏
    var ct_cLeft = document.querySelector(".ct_cLeft");
    // 获取左侧栏的高度
    var leftHeight = ct_cLeft.offsetHeight;
    // 获取滑动列表
    var ulBox = ct_cLeft.querySelector("ul:first-of-type");
    // 获取ulBox中的li
    var lis = ulBox.querySelectorAll("li");
    // 获取滑动列表的高度
    var ulBoxHeight = ulBox.offsetHeight;
    // 设置最大静态状态下的top值
    var maxTop = 0;
    // 设置最小静态状态下的Top值
    var minTop = leftHeight- ulBoxHeight;
    // 设置最大滑动状态下的TOP值
    var maxBounceTop = maxTop + 100;
    // 设置最小滑动状态下的Top值
    var minBounceTop = minTop - 100;
    // console.log(ulBox)
    // 实现滑动
    var startY;
    var moveY;
    var distancesY;
    // 记录已经滑动的距离
    var currentY = 0;
    // 添加滑动事件
    ulBox.addEventListener("touchstart", function (e) {
        // 获取手指的起始目标
        startY = e.targetTouches[0].clientY;
    });
    ulBox.addEventListener("touchmove", function (e) {

        moveY = e.targetTouches[0].clientY;
        // 计算距离的差异
        distancesY = moveY - startY;
        // 判断滑动的时候是否超出当前指定的区间
        if(currentY+distancesY > maxBounceTop || currentY+distancesY < minBounceTop){
            return;
        }
        // 清除过渡
        ulBox.style.transition = "none";
        // 实现偏移操作： 应该在之前滑动距离的基础之上再进行滑动
        ulBox.style.top = (currentY + distancesY) + "px";
    });
    ulBox.addEventListener("touchend", function (e) {
        // 判断当前滑动距离是否在静止状态和滑动状态的top值之间
        if (currentY+distancesY < minTop ) {
            currentY = minTop;
            // 回到minTop的位置
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = minTop + "px";
        } else if (currentY+distancesY > maxTop) {
            currentY = maxTop;
            // 回到maxTop的位置
            ulBox.style.transition = "top 0.5s";
            ulBox.style.top = maxTop + "px";
        } else {
            // 记录当前互动的距离
            currentY += distancesY;
        }
    });

    // 为每一个Li元素设置添加一个索引值
    for(var i = 0; i < lis.length; i++){
        lis[i].index=i;
    }

    // 绑定移动端的Tap事件
    // itcast.tap(ulBox, function (e) {
    //     //1.修改li元素的样式，将所有li元素的active样式清除，再为当前被点击的Li元素添加active样式
    //     for(var i = 0; i < lib.length; i++ ){
    //         lib[i].classList.remove("active");
    //     }
    //     // 为当前li 添加样式
    //     var li = e.target.parentNode;
    //     // 获取li的高度
    //     var liHeight = li.offsetHeight;
    //     li.classList.add("active");
    //     // 2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定的静止状态相爱的最小top值。
    //     // 获取当前li元素的索引值
    //     var index = li.index;
    //     // 设置过渡
    //     ulBox.style.transition = "top 0.5s";
    //     if(-index*liHeight < minTop){
    //         // 只能偏移到mintop的位置
    //         ulBox.style.top = minTop + "px";
    //         currentY = minTop;
    //     } else {
    //         // 设置偏移
    //         ulBox.style.top = -index*liHeight + "px";
    //         currentY = -index*liHeight;
    //     }
    //
    // });

   /* $(ulBox).on("tap", function (e) {
        //1.修改li元素的样式，将所有li元素的active样式清除，再为当前被点击的Li元素添加active样式
        for(var i = 0; i < lib.length; i++ ){
            lib[i].classList.remove("active");
        }
        // 为当前li 添加样式
        var li = e.target.parentNode;
        // 获取li的高度
        var liHeight = li.offsetHeight;
        li.classList.add("active");
        // 2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定的静止状态相爱的最小top值。
        // 获取当前li元素的索引值
        var index = li.index;
        // 设置过渡
        ulBox.style.transition = "top 0.5s";
        if(-index*liHeight < minTop){
            // 只能偏移到mintop的位置
            ulBox.style.top = minTop + "px";
            currentY = minTop;
        } else {
            // 设置偏移
            ulBox.style.top = -index*liHeight + "px";
            currentY = -index*liHeight;
        }
    });*/

   // 绑定fastclick的使用
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            // /!*参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*!/
            FastClick.attach(document.body);
        }, false);
    }

   // fastclick使用的时候就是用来绑定添加click事件
    ulBox.addEventListener("click", function (e) {
        //1.修改li元素的样式，将所有li元素的active样式清除，再为当前被点击的Li元素添加active样式
        for(var i = 0; i < lis.length; i++ ){
            lis[i].classList.remove("active");
        }
        // 为当前li 添加样式
        var li = e.target.parentNode;
        // 获取li的高度
        var liHeight = li.offsetHeight;
        li.classList.add("active");
        // 2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定的静止状态相爱的最小top值。
        // 获取当前li元素的索引值
        var index = li.index;
        // 设置过渡
        ulBox.style.transition = "top 0.5s";
        if(-index*liHeight < minTop){
            // 只能偏移到mintop的位置
            ulBox.style.top = minTop + "px";
            currentY = minTop;
        } else {
            // 设置偏移
            ulBox.style.top = -index * liHeight + "px";
            currentY = -index * liHeight;
        }
    });

}