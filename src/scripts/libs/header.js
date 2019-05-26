
//header 的滑动特效
$(".header_content_left>ul>li").on("mouseover",function(){
    $(this).children(".item").show();
    $(this).children(".smartphone")
            .stop()
            .slideDown();


})
$(".header_content_left>ul>li").on("mouseleave",function(){
    $(this).children(".item").hide();
    $(this).children(".smartphone")
            .stop()
            .slideUp();

})
//登录
$(".user").parent().click(function(){
    if($(this).text() == "登录"){
        window.close();
        window.open("http://localhost:9999/pages/index/login.html");
        
    }else{
        addCookie("name","",-1);
        $(".user").parent().html('<i class="user"></i>登录');
        $(".remind").append(clone);
        $("#log").hide();
        $("#log_num").removeClass("done_st");
        $("#log_text").removeClass("done_te");
    }
})

function addCookie(key, value, days) {
    var now = new Date();
    now.setDate(now.getDate() + days);
    document.cookie = key + "=" + value + "; expires=" + now + ";path=" + "/";
}
// 登录状态验证
function getCookie(key) {
    var str = document.cookie;
    if(!str) return null; 
    var reg1 = new RegExp("(^|\s)"+key + "=([^;]+)$");
    var reg2 = new RegExp("(^|\s)"+key + "=([^;]+);");
    if(reg1.test(str)) {
        return str.match(reg1)[2];
    } else {
        return str.match(reg2)[2];
    }
}
let clone = $(".remind p").clone();
if (getCookie("name")){
    $(".remind p").remove();
    $("#log").show();
    $(".user").parent().html('<i class="user"></i>注销');
    $("#log_num").addClass("done_st");
    $("#log_text").addClass("done_te");
}else{
    $("#log").hide();
    $(".user").parent().html('<i class="user"></i>登录');
    $("#log_num").removeClass("done_st");
    $("#log_text").removeClass("done_te");
}

//购物车检测
function goodsnum(){
    let goodnum = localStorage.getItem("car");
    let number = 0;
    if(goodnum){
        goodnum = JSON.parse(goodnum);
       goodnum.forEach(function(item){
           number += item.number;
       }) 
    }
    $(".cart span").text(number);
}
goodsnum();