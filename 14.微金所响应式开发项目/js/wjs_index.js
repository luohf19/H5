$(function () {
    /*获取当前所有的item*/
    var items = $(".carousel-inner .item");
    /*监听屏幕大小改变*/
    $(window).on("resize", function () {
        /*1.获取屏幕的宽度*/
        var width = $(window).width();
        /*2.判断屏幕的宽度*/
        if(width >= 768){  /*说明是非移动端*/
            /*为每一个item添加子元素*/
            $(items).each(function(index, value){
                var item = $(this);
                /*当前自定义属性中 存储的图片路径*/
                var imgSrc = item.data("largeImage");
                console.log(imgSrc)
                /*添加非移动端的子元素*/
                item.html(
                    $('<a href="javascript:;" class="pcImg"></a>')
                        // .css("backgroundImage","url('"+imgSrc+"')")
                        .css("backgroundImage",'url("'+imgSrc+'")')
                );
            })
        }else {
            $(items).each(function(index, value){
                var item = $(this);
                var imgSrc = item.data("smallImage");
                console.log(imgSrc);
                item.html('<a href="javascript:;" class="mobileImg"><img src="'+imgSrc+'" alt="..."></a>');
            })

        }
    }).trigger("resize");
});