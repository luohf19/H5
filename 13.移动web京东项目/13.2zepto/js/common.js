// 封装移动端的tap事件 
var itcast={
    // 添加dom元素  让我们可以为任意的元素添加tap事件
    tap:function (dom,callback) {
        // 判断是否传入对象同时对象应该是一个dom元素
        if (!dom || typeof dom != "object") {
            return;
        }
        var startX,startY,startTime;
        dom.addEventListener("touchstart", function (e) {
            // 判断是否只有一根手指
            if(e.targetTouches.length > 1){  // 说明不止一根手指
                return;
            }
            // 记录手指开始的事件
            startTime = Date.now();  // 获取当前时间 单位是毫秒
            // 记录手指开始的坐标
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
            // 来做一些与事件相关的初始化操作
        })
        dom.addEventListener("touchend", function (e) {
            // 判断是否只有一根手指
            if(e.targetTouches.length > 1){  // 说明不止一根手指
                return;
            }
            // 判断时间差异  （我们设定时间差异值为150毫秒）
            if (Date.now()-startTime > 150) {
                return;
            }
            // 判断松开手指时的坐标与触摸开始时的坐标的距离差异
            var endX = e.changedTouches[0].clientX;
            var endY = e.changedTouches[0].clientY;
            if(Math.abs(endX-startX) < 6 &&Math.abs(endY-startY) < 6){
                console.log("这就是移动端的单击事件");

                // 执行tap事件响应后的处理操作
                // 判断用户是否传入回调函数
                callback && callback(e);
            }

        })





    }
}