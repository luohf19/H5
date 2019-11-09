
// -------------------------tools--------------------------
;(function (window, undefined) {
    var Tools = {
        getRandom: function (min, max) {

            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    // 暴露Tools 给window
    window.Tools = Tools;
})(window, undefined)

// --------------------------food-------------------------
// 所有的js文件中书写代码  都是全局作用域
// 但如果我需要的对象和全局作用的不一致  那么我们可以写一个自调用函数
// 自调用函数    作用是开启一个新的作用域  避免命名冲突
;(function (window, undefined) {
    // 记录上一次创建的食物   为删除做准备
    var elements = [];

    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'red';
    }

    // 渲染作用  可以让food显示在map上
    Food.prototype.render = function (map) {

        // 删除之前创建的食物
        remove();

        // 随机设置 x 和 y 的值

        // (map.offsetWidth / this.width - 1 ) * this.width = map.offsetWidth - this.width
        this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1 ) * this.width;
        this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1 ) * this.height;



        // 动态创建div  页面上显示的食物
        var div = document.createElement('div');
        map.appendChild(div);
        elements.push(div);    // push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
        // 设置div的样式
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;
        div.style.position = 'absolute'

    }
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            // 删除div   Node.removeChild() 方法从DOM中删除一个子节点。返回删除的节点。
            elements[i].parentNode.removeChild(elements[i]);
            // 删除数组中的元素
            // array.splice(start,deleteCount)    deleteCount  整数，表示要移除的数组元素的个数。
            // 有两个参数   第一个参数是从那个位置开始   第二个参数是删除几个元素
            elements.splice(0, 1);
        }

    }
    // 把Food构造函数  让外部可以访问
    window.Food = Food;  //因为window下面的所有成员  所有地方都是可以访问到的  是一个顶级对象

})(window, undefined)// 后面的这个括号就是自调用

// ---------------------------------Snake--------------------------------------
// 自调用函数  开启一个新的作用域   防止命名冲突

;(function (window, undefined) {
    var position = 'absolute';
    var elements = [];
    function Snake(options) {
        // 记录之前创建的蛇

        //  蛇节的大小
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        // 蛇移动的方向
        this.direction = options.direction || 'right';
        // 蛇的身体（蛇节）  第一个元素的蛇头
        this.body = [
            {x: 3, y: 2, color: 'red'},
            {x: 2, y: 2, color: 'blue'},
            {x: 1, y: 2, color: 'blue'},
        ];
    }
// 渲染作用  可以让snake显示在map上
    Snake.prototype.render = function (map) {
        // 删除之前创建的蛇
        remove();
        // 把每一个蛇节渲染到地图上
        for (var i = 0, len = this.body.length; i < len; i++) {
            // 蛇节
            var object = this.body[i];
            // 动态创建div
            var div = document.createElement('div');
            map.appendChild(div);
            // 记录当前蛇
            elements.push(div);
            // 样式栏设置
            div.style.position = position;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = object.x * this.width + 'px';
            div.style.top = object.y * this.height + 'px';
            div.style.backgroundColor = object.color;
        }
    }
    //私有成员
    function remove(){
        for (var i = elements.length - 1; i >= 0; i--){
            // 删除div
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组中的元素
            elements.splice(i, 1);
        }
    }


    // 控制蛇移动的方法
    Snake.prototype.move = function (food, map) {

        // 控制蛇的身体移动  （当前蛇节 到 上一个蛇节的位置）
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 控制蛇的头的移动
        // 判断蛇移动的方向
        var head = this.body[0];
        switch(this.direction){
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }
        // 判断蛇头是否和食物的坐标重和
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if (headX === food.x && headY === food.y) {
            // 让蛇增加一节
            // 获取蛇的最后一节
            var last = this.body[this.body.length - 1];
           /* this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            })*/
           var obj = {};
           extend(last, obj);
           this.body.push(obj);
            // 随机在地图上随机生成食物
            food.render(map);
        }
    }
    function extend(parent, child) {
        for(var key in parent) {
            // 不给复制同名属性
            if (child[key]) {
                continue;
            }
            child[key] = parent[key]
        }
    }

    // 暴漏构造函数给外部
    window.Snake = Snake;

})(window, undefined)
function remove() {
    for (var i = elements.length - 1; i >= 0; i--) {
        // 删除div
        elements[i].parentNode.removeChild(elements[i]);
        // 删除数组中的元素
        elements.splice(i, 1);
    }
}

// -------------------------------------game-----------------------------
// 使用自调用函数  创建一个新的作用域   防止命名冲突
;(function (window, undefined) {
    var that;
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;

    }
    Game.prototype.start = function () {
        // 1.把食物和蛇对象  渲染到地图上
        this.food.render(this.map);
        this.snake.render(this.map);

        // 2.开始游戏的逻辑
        // 2.1 让蛇移动起来
        runSnake();
        // 2.2 当蛇遇到边界游戏结束

        // 2.3 通过键盘控制蛇移动的方向
        bindKey();

        // 2.4 当蛇遇到食物 做相应的处理

    }

    // 通过键盘控制蛇移动的方向
    function bindKey() {
        document.addEventListener('keydown', function (e) {
            console.log(e.keyCode);// 打印对应的键盘码。
            // 37---left
            // 38---top
            // 39---right
            // 40---bottom
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        }.bind(that), false);
    }


    // 私有函数
    function runSnake() {
        var timerId = setInterval(function () {
            // 让蛇走一格
            // 定时期的function中的this是指向window对象的
            // 要获取游戏中的蛇属性
            this.snake.move(this.food, this.map);
            this.snake.render(this.map);

            // 2.2 当蛇遇到边界游戏结束// 获取蛇头的坐标
            var maxX = this.map.offsetWidth / this.snake.width -1;
            var maxY = this.map.offsetHeight / this.snake.height -1;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX) {
                clearInterval(timerId);
                alert('Game over');
            }
            if (headY < 0 || headY >= maxY) {
                clearInterval(timerId);
                alert('Game over');
            }
        }.bind(that), 300);
    }




    // 暴露构造函数给外部
    window.Game = Game;


})(window, undefined)

// ---------------------------------main----------------------------
;(function (window, undefined) {
    var map = document.getElementById('map');
    var game = new Game(map);
    game.start();
})(window, undefined)