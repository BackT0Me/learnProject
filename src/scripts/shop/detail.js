require(["../../static/conf/config.js"],function(){
    require(["jquery","common","header"],function($){
        //头js
        //模板解析
        function template(id,data) { 
            let template = document.getElementById(id).innerHTML;

            template = 'print(`' + template + '`)';
            
            template = template.replace(/<%=(.+?)%>/g,'`) \n print($1) \n print(`' );

            template = template.replace(/<%(.+?)%>/g,'`) \n $1 \n print(`');

            var codestr= `
                (function(data){
                    let htmlstr = "";
                    function print(val){
                        htmlstr += val;
                    }
                    ${template}
                    return htmlstr;
                })
            `;

            return eval(codestr)(data);
        }
        // 请求推荐数据

        $.ajax({
            dataType : "json",
            url : "http://localhost:8000/erji",
            success: function(data){
                
                let tj=template("tuijian",data.returnData.OutMasterDatas);
                $(".menu_content").append(tj);
                
            }

        })

        //放大镜功能
        var $smallImg = $("#smallImg");//小图
        var $bigImg = $("#bigImg")//大图
        var $smallCursor = $("#smallCursor");//小可视区域
        var $bigCursor = $(".big_pic");//大可视区域
        
        $(".middle_pic").on("mouseenter",function(e){
            $smallCursor.show();
            $bigCursor.show();
            $bigCursor.animate({
                height : "320px",
                width : "320px",
                left : "917px",
                top : "150px"
            },500,function(){
                $smallCursor.width($smallImg.width()/$bigImg.width() * $bigCursor.width());
                $smallCursor.height($smallImg.width()/$bigImg.width() * $bigCursor.width());
            })
            

            $(".middle_pic").on("mousemove",move);
        })

        $(".middle_pic").on("mouseleave",function(){
            $(".middle_pic").off("mousemove",move);
            $smallCursor.hide();
            $bigCursor.hide();
            $bigCursor.css({
                height: "1px",
                width: "1px",
                left: "625px",
                top: "313px"
            })
        })
        
        function move(e) {
            let times = $bigImg.width()/$smallImg.width();
            let _left = e.clientX - $smallImg.offset().left;
            let _top = e.clientY - $smallImg.offset().top;

            let left =Math.min($smallImg.width()-$smallCursor.width(),Math.max(0,_left - $smallCursor.width()/2)) ;
            let top = Math.min($smallImg.height()-$smallCursor.height(),Math.max(0,_top - $smallCursor.height()/2))
            $smallCursor.css({left,top});

            $bigImg.css({
                left : -times * left,
                top : -times * top
            })
        }

        

        //换图片
        let color = "blue";

        $(".small_pic_one").on("click",function(){
            $(this).addClass("small_pic_chosen");
            if(color=="blue"){
                $(".big_pic img").attr("src","../../../imges/15525720912328593_900X900.jpg");
                $(".middle_pic img").attr("src","../../../imges/15525720912328593_570X570.jpg");
            }
            if(color=="black") {
                $(".middle_pic img").attr("src","../../../imges/15525734991932877_570X570.jpg");
                $(".middle_pic img").attr("src","../../../imges/15525734991932877_900X900.jpg")
            }
            
            $(this).siblings().removeClass("small_pic_chosen");
        })
        
        $(".small_pic_sec").on("click",function(){
            $(this).addClass("small_pic_chosen");
            if (color == "blue"){
                $(".big_pic img").attr("src","../../../imges/15525732850006038_900X900.jpg");
                $(".middle_pic img").attr("src","../../../imges/15525732850006038_570X570.jpg");
            }
            if(color == "black"){
                $(".big_pic img").attr("src","../../../imges/15525735097344210_900X900.jpg");
                $(".middle_pic img").attr("src","../../../imges/15525735097344210_570X570.jpg");
            }
            $(this).siblings().removeClass("small_pic_chosen");
        })

        $(".good_blue").click(function(){
            $(this).addClass("color_chosen");
            $(this).siblings().removeClass("color_chosen");
            color = "blue";
            $(".small_pic_one").css({
                background : 'url("../../imges/15525720912328593_100X100.jpg")',
                backgroundSize : "100%"
            })
            $(".middle_pic img").attr("src","../../../imges/15525720912328593_570X570.jpg");
            $(".small_pic_sec").css({
                background : 'uel("../../imges/15525732850006038_100X100.jpg")',
                backgroundSize : "100%"
            })
        })

        $(".good_black").click(function(){
            $(this).addClass("color_chosen");
            $(this).siblings().removeClass("color_chosen");
            color = "black";
            $(".small_pic_one").css({
                
                background : 'url("../../imges/15525734991932877_100X100.jpg")',
                backgroundSize : "100%"
            })
            $(".middle_pic img").attr("src","../../../imges/15525734991932877_570X570.jpg");
            $(".small_pic_sec").css({
                
                background : 'url("../../imges/15525735097344210_100X100.jpg")',
                backgroundSize : "100%"
            })
        })

        //添加购物车
        $(".addcart").click(function(){
            //判断是否有购物车
            if(localStorage.getItem("car")){

                let car = JSON.parse(localStorage.getItem("car"));
                let flag = false;
                //判断购物车中是否有相同的商品，若有 number++
                    car.forEach(function(item){
                        if(item.goodname == "AKG N200BT 入耳式无线蓝牙运动耳机" && item.color == color){
                            item.number ++ ;
                            flag = true;
                        }
                    });
                    //若没有将商品存入
                    if(flag == false){
                        car.push({goodname : "AKG N200BT 入耳式无线蓝牙运动耳机",color : color,number:1,imgsrc : "../../imges/15525720912328593_100X100.jpg",pirce:"999.00"});
                    }
                    localStorage.setItem("car",JSON.stringify(car));
                
                
            }else{
                let good = JSON.stringify({goodname : "AKG N200BT 入耳式无线蓝牙运动耳机",color : color,number:1,imgsrc : "../../imges/15525720912328593_100X100.jpg",pirce : "999.00"})
                let arr = "["+ good + "]";
                
                localStorage.setItem("car",arr);
            }
        })

        //出现btn_back按钮 + 防抖
        function debounce(fun , interval) { 
            let t = null;
            return function (){
                clearTimeout(t);
                t = setTimeout(() => {
                    fun();
                }, interval);
            }
        }
        
        $(window).scroll(debounce(function(){
            if($(window).scrollTop()>700){
                $(".btn_back").show(200);
            }else{
                $(".btn_back").hide(200);
            }
        },50))
        
        $(".btn_back").on("click",function(){
            $(window).scrollTop(0);
        })



    //end
    })
})