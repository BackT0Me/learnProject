require(["../../static/conf/config.js"],function(){
    require(["jquery","common","header"],function($){
        $(function(){
  
        
        //购物车全选
        $(".car_title .chooseAll i").on("click",function(){
            if($(this).attr("index") == "0"){
                $(".chooseAll i").addClass("active");
                $(".chooseAll i").attr("index","1");
                getPay();

            }else{
                $(".chooseAll i").removeClass("active");
                $(".chooseAll i").attr("index","0");
                getPay();
            }
        })
        //计算总价，获得的总积分
        function getPay(){
            let price = 0;
            $(".car_list .chooseAll i").each(function(i){
                if($(this).attr("index") == "1"){
                    price +=parseFloat($(this).parent().siblings(".jine").text().slice(1)) ;

                }
            })
            $("#pay").text("￥"+price.toFixed(2));
            $("#jf").text(parseInt(price));
        }    


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
        //将购物车中商品放入列表
        let data =JSON.parse(localStorage.getItem("car")) ;
        if(data){
            let list=template("shop_li",data);
            $(".car_lsit_all").append(list);
            $(".car_lsit_all").children().each(function(){
                
                if(Number($(this).children(".shuliang").children(".numcon").children("input").val())  > 1){
                    
                    $(this).children(".shuliang").children(".numcon").children(".minus").children().addClass("min");
                }
                
            })
        }
        choes();
        ms();
        add();
        delt();
        // 请求推荐数据

        $.ajax({
            dataType : "json",
            url : "http://localhost:8000/smartphone",
            success: function(data){
                
                let tj=template("tuijian",data.returnData.OutMasterDatas);
                $(".may_like").append(tj);
                //下面推荐的商品添加到购物车
                $(".may_like a").on("click",function(){
                    let imgSrc = $(this).siblings("img").attr("src");
                    let name = $(this).siblings("h2").text();
                    let price = $(this).siblings("p").text().slice(1);
                    
                    
                    //判断是否有购物车
                    if(localStorage.getItem("car")){

                        let car = JSON.parse(localStorage.getItem("car"));
                        let flag = false;
                        //判断购物车中是否有相同的商品，若有 number++
                            car.forEach(function(item){
                                if(item.goodname == name){
                                    item.number ++ ;
                                    flag = true;
                                    //添加相应的数量
                                    $(".car_list").each(function(i){
                                        let t = $(this).children(".ggod").children().eq(0).text();
                                        if(t == name){
                                            $(this).children(".shuliang").children(".numcon").children("input").val(item.number);
                                            $(this).children(".shuliang").children(".numcon").children(".minus").children().addClass("min")
                                        }
                                    })
                                }
                            });

                            //若没有将商品存入
                            if(flag == false){
                                car.push({goodname : name,color : "默认",number:1,imgsrc : imgSrc,pirce:price});
                                let list=template("shop_li",[{goodname : name,color : "默认",number:1,imgsrc : imgSrc,pirce:price}]);
                                $(".car_lsit_all").append(list);
                            }
                            localStorage.setItem("car",JSON.stringify(car));
                        
                        
                    }else{
                        let good = JSON.stringify({goodname : name,color : "默认",number:1,imgsrc : imgSrc,pirce : price});
                        let arr = "["+ good + "]";
                        
                        localStorage.setItem("car",arr);
                        let list=template("shop_li",[{goodname : name,color : "默认",number:1,imgsrc : imgSrc,pirce:price}]);
                        $(".car_lsit_all").append(list);
                    }
                    

                    choes();
                    ms();
                    add();
                    delt();
                    goodsnum();
                })

            }

        })

        //选择列表中商品
        function choes(){
            $(".car_list .chooseAll i").on("click",function(){
            if($(this).attr("index") == "0"){
                $(this).addClass("active");
                $(this).attr("index","1");
                getPay();
            }else{
                $(this).removeClass("active");
                $(this).attr("index","0");
                getPay();
                }
                let flag = true;
                $(".car_list .chooseAll i").each(function(i){
                    if($(this).attr("index") == "0"){
                        flag = false;
                    }
                })
                if(flag){
                    $(".car_title .chooseAll i").addClass("active");
                    $(".car_title .chooseAll i").attr("index","1");
                }else{
                    $(".car_title .chooseAll i").removeClass("active");
                    $(".car_title .chooseAll i").attr("index","0");
                }
                
            })
        }
        

        //从购物车删减商品
        function ms(){
                $(".minus").on("click",function(){
                let num = Number($(this).siblings("input").val())
                if(num > 1){
                    num--;
                    if(num == 1){
                        $(".minus i").removeClass("min");
                    }
                    $(this).siblings("input").val(num);
                    let retail = $(this).parent().parent().siblings(".jifen").text();
                    let name = $(this).parent().parent().siblings(".ggod").children().eq(0).text();
                    let color = $(this).parent().parent().siblings(".ggod").children().eq(1).text();
                    let car = JSON.parse(localStorage.getItem("car"));
                    car.forEach(function(item){
                        if(item.goodname == name&&item.color == color){
                            item.number -- ;
                        }
                    });
                    localStorage.setItem("car",JSON.stringify(car));
                    $(this).parent().parent().siblings(".jine").children("p").children("a").text(retail*num);
                    getPay();
                    goodsnum();
                }
                
            })
        }
        

        //从购物车增加商品
        function add(){
                $(".plus").on("click",function(){
                let num = Number($(this).siblings("input").val())
                
                    num++;
                    $(".minus i").addClass("min");
                    $(this).siblings("input").val(num);
                    let retail = $(this).parent().parent().siblings(".jifen").text();
                    let name = $(this).parent().parent().siblings(".ggod").children().eq(0).text();
                    let color = $(this).parent().parent().siblings(".ggod").children().eq(1).text();
                    let car = JSON.parse(localStorage.getItem("car"));
                    car.forEach(function(item){
                        if(item.goodname == name&&item.color == color){
                            item.number ++ ;
                        }
                    });
                    localStorage.setItem("car",JSON.stringify(car));
                    $(this).parent().parent().siblings(".jine").children("p").children("a").text(retail*num);
                    getPay();
                    goodsnum();
                
            })

        }
       
        //删除键删除商品
        function delt(){
                $(".del").on("click",function(){
                let name = $(this).parent().parent().siblings(".ggod").children().eq(0).text();
                    let color = $(this).parent().parent().siblings(".ggod").children().eq(1).text();
                    let car = JSON.parse(localStorage.getItem("car"));
                    let ind;
                    car.forEach(function(item,index){
                        if(item.goodname == name&&item.color == color){
                            ind = index;
                        }
                    });
                    car.splice(ind,1);
                    localStorage.setItem("car",JSON.stringify(car));
                    goodsnum();
                    $(this).parent().parent().parent().remove();
            })
        }
       


    
    
    })
    
    
    })
})