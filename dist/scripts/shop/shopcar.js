"use strict";require(["../../static/conf/config.js"],function(){require(["jquery","common","header"],function($){$(function(){function getPay(){var e=0;$(".car_list .chooseAll i").each(function(t){"1"==$(this).attr("index")&&(e+=parseFloat($(this).parent().siblings(".jine").text().slice(1)))}),$("#pay").text("￥"+e.toFixed(2)),$("#jf").text(parseInt(e))}function template(id,data){var template=document.getElementById(id).innerHTML;template="print(`"+template+"`)",template=template.replace(/<%=(.+?)%>/g,"`) \n print($1) \n print(`"),template=template.replace(/<%(.+?)%>/g,"`) \n $1 \n print(`");var codestr='\n                (function(data){\n                    let htmlstr = "";\n                    function print(val){\n                        htmlstr += val;\n                    }\n                    '.concat(template,"\n                    return htmlstr;\n                })\n            ");return eval(codestr)(data)}$(".car_title .chooseAll i").on("click",function(){"0"==$(this).attr("index")?($(".chooseAll i").addClass("active"),$(".chooseAll i").attr("index","1")):($(".chooseAll i").removeClass("active"),$(".chooseAll i").attr("index","0")),getPay()});var data=JSON.parse(localStorage.getItem("car"));if(data){var list=template("shop_li",data);$(".car_lsit_all").append(list),$(".car_lsit_all").children().each(function(){1<Number($(this).children(".shuliang").children(".numcon").children("input").val())&&$(this).children(".shuliang").children(".numcon").children(".minus").children().addClass("min")})}function choes(){$(".car_list .chooseAll i").on("click",function(){"0"==$(this).attr("index")?($(this).addClass("active"),$(this).attr("index","1")):($(this).removeClass("active"),$(this).attr("index","0")),getPay();var e=!0;$(".car_list .chooseAll i").each(function(t){"0"==$(this).attr("index")&&(e=!1)}),e?($(".car_title .chooseAll i").addClass("active"),$(".car_title .chooseAll i").attr("index","1")):($(".car_title .chooseAll i").removeClass("active"),$(".car_title .chooseAll i").attr("index","0"))})}function ms(){$(".minus").on("click",function(){var t=Number($(this).siblings("input").val());if(1<t){1==--t&&$(".minus i").removeClass("min"),$(this).siblings("input").val(t);var e=$(this).parent().parent().siblings(".jifen").text(),i=$(this).parent().parent().siblings(".ggod").children().eq(0).text(),n=$(this).parent().parent().siblings(".ggod").children().eq(1).text(),a=JSON.parse(localStorage.getItem("car"));a.forEach(function(t){t.goodname==i&&t.color==n&&t.number--}),localStorage.setItem("car",JSON.stringify(a)),$(this).parent().parent().siblings(".jine").children("p").children("a").text(e*t),getPay(),goodsnum()}})}function add(){$(".plus").on("click",function(){var t=Number($(this).siblings("input").val());t++,$(".minus i").addClass("min"),$(this).siblings("input").val(t);var e=$(this).parent().parent().siblings(".jifen").text(),i=$(this).parent().parent().siblings(".ggod").children().eq(0).text(),n=$(this).parent().parent().siblings(".ggod").children().eq(1).text(),a=JSON.parse(localStorage.getItem("car"));a.forEach(function(t){t.goodname==i&&t.color==n&&t.number++}),localStorage.setItem("car",JSON.stringify(a)),$(this).parent().parent().siblings(".jine").children("p").children("a").text(e*t),getPay(),goodsnum()})}function delt(){$(".del").on("click",function(){var i,n=$(this).parent().parent().siblings(".ggod").children().eq(0).text(),a=$(this).parent().parent().siblings(".ggod").children().eq(1).text(),t=JSON.parse(localStorage.getItem("car"));t.forEach(function(t,e){t.goodname==n&&t.color==a&&(i=e)}),t.splice(i,1),localStorage.setItem("car",JSON.stringify(t)),goodsnum(),$(this).parent().parent().parent().remove()})}choes(),ms(),add(),delt(),$.ajax({dataType:"json",url:"http://localhost:8000/smartphone",success:function(t){var e=template("tuijian",t.returnData.OutMasterDatas);$(".may_like").append(e),$(".may_like a").on("click",function(){var t=$(this).siblings("img").attr("src"),i=$(this).siblings("h2").text(),e=$(this).siblings("p").text().slice(1);if(localStorage.getItem("car")){var n=JSON.parse(localStorage.getItem("car")),a=!1;if(n.forEach(function(e){e.goodname==i&&(e.number++,a=!0,$(".car_list").each(function(t){$(this).children(".ggod").children().eq(0).text()==i&&($(this).children(".shuliang").children(".numcon").children("input").val(e.number),$(this).children(".shuliang").children(".numcon").children(".minus").children().addClass("min"))}))}),0==a){n.push({goodname:i,color:"默认",number:1,imgsrc:t,pirce:e});var r=template("shop_li",[{goodname:i,color:"默认",number:1,imgsrc:t,pirce:e}]);$(".car_lsit_all").append(r)}localStorage.setItem("car",JSON.stringify(n))}else{var l="["+JSON.stringify({goodname:i,color:"默认",number:1,imgsrc:t,pirce:e})+"]";localStorage.setItem("car",l);var s=template("shop_li",[{goodname:i,color:"默认",number:1,imgsrc:t,pirce:e}]);$(".car_lsit_all").append(s)}choes(),ms(),add(),delt(),goodsnum()})}})})})});