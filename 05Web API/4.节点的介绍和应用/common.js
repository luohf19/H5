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
