// 封装函数
// var timerId = null;
function animate (element, target) {
    if(element.timerId){
        clearInterval(element.timerId);  // 清除定时器
        timerId = null;
    }
    // 2.让盒子不停的向右移动
    element.timerId = setInterval(function () {
        // 让盒子停在500的位置
        // 判断盒子当前的位置是否到达
        // 最终盒子停止的位置
        // 步进  每次移动的距离
        var step = 6;
        // 盒子当前的位置
        var current = element.offsetLeft;

        //  从400到800执行动画，从800到400不执行  的解决办法
        // 判断如果当前位置>目标位置，此时的step  要小于0
        if (current > target){
            step = - Math.abs(step);   //  Math.abs()   是求绝对值
        }
        // Math.abs(current -target) < Math.abs(step)
        if (Math.abs(current -target) < Math.abs(step)){
            // 停止定时器
            clearInterval(element.timerId);
            // 让盒子到target的位置
            element.style.left = target + 'px';
            // 退出函数
            return;
        }
        // 移动盒子
        current += step;
        element.style.left = current + 'px';
    }, 20);
}
