function my$(id){
    return document.getElementById(id);
}

// 处理浏览器兼容性问题
// 获取第一个子元素
function getFirstElementChild(element){
    var node, nodes = element.childNodes, i = 0;
    while(node = nodes[i++]){
        if(node.nodeType === 1){
            return node;
        }
    }
    return null;
}

// 获取下一个兄弟节点   浏览器兼容性问题的处理
function getNextElementSibling(element) {
    var el = element;
    while(el = el.nextSibling){
        if (el.nodeType === 1){
            return el;
        }
    }
    return null;
}

// 处理innertext和textcontent的兼容性问题
//设置标签之间的内容
function setInnerText(element, content){
    // 判断当前浏览器是否支持   innerText
    if(typeof element.innerText === 'string'){
        element.innerText = content;
    }else {
        element.textContent = content;
    }
}


// 获取页面滚动距离的浏览器兼容性问题处理
function getScroll() {   // 获取页面滚动出去的距离
    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
    }

}


// 获取鼠标在页面的位置  处理浏览器兼容性
function getPage(e) {
    var pageX = e.pageX || e.clientX + getScroll().scrollLeft;
    var pageY = e.pageY || e.clientY + getScroll().scrollTop;
    return {
        pageX:pageX,
        pageY:pageY
    }
}
