require(["../../static/conf/config.js"],function(){
    require(["jquery","common","header"],function($){
        $(function(){
            let navs =Array.from($(".nav_slider").children());
            let navs2 = Array.from($(".nav_slider2").children());
            let count = 1;

            //轮播图
            let t = setInterval(() => {
                $("#sliderfir").animate({
                    left: -1537*(count%6)
                },500,function(){
                    navChoose();
                    
                    if(count%6 == 5){
                        $("#sliderfir").css({
                            left : 0
                        });
                        count = 0;
                    }
                    count++;
                });  
            }, 3000);

            let count2 =0;
            let t2 = setInterval(() => {
                $("#slidersec").animate({
                    left: -997*(count2%3)
                },500,function(){
                    navChoose2();
                    
                    if(count2%3 == 2){
                        $("#slidersec").css({
                            left : 0
                        });
                        count2 = 0;
                    }
                    count2++;
                });  
            }, 3000);

            //划入暂停
            $("#sliderfir").on("mouseenter",function(){
                clearInterval(t);
            })

            $("#slidersec").on("mouseenter",function(){
                clearInterval(t2);
            })
            //划出开始
            $("#sliderfir").on("mouseleave",function(){
				t = setInterval(function(){
					$("#sliderfir").animate({
                        left: -1537*(count%6)
                    },500,function(){
                        navChoose();
                        if(count%6 == 5){
                            $("#sliderfir").css({
                                left : 0
                            })
                            count = 0;
                        }
                        count++;
                    });   				
				}, 3000);
            })
            
            $("#slidersec").on("mouseleave",function(){
				t2 = setInterval(function(){
					$("#slidersec").animate({
                        left: -997*(count2%3)
                    },500,function(){
                        navChoose2();
                        if(count2%3 == 2){
                            $("#slidersec").css({
                                left : 0
                            })
                            count2 = 0;
                        }
                        count2++;
                    });   				
				}, 3000);
            })
            
            //轮播图下面的小按钮
            function navChoose(){
                navs.forEach(function(nav, index){
					if(index == (count%5)) nav.className = "slider_active";
					else nav.className = "";
				})
            }

            function navChoose2(){
                navs2.forEach(function(nav, index){
					if(index == (count2%2)) nav.className = "slider_active";
					else nav.className = "";
				})
            }
            //小按钮的点击事件
            navs.forEach(function(nav, index){
				nav.onclick = function(){
					count = index;
                    navChoose();
                    $("#sliderfir").animate({
                        left: -1537*(count%6)
                    },500,function(){
                        navChoose();
                        if(count%6 == 5){
                            $("#sliderfir").css({
                                left : 0
                            })
                            count = 0;
                        }
                        
                    });
					
				}
            })

            navs2.forEach(function(nav, index){
				nav.onclick = function(){
					count2 = index;
                    navChoose2();
                    $("#slidersec").animate({
                        left: -997*(count%3)
                    },500,function(){
                        navChoose();
                        if(count2%3 == 2){
                            $("#slidersec").css({
                                left : 0
                            })
                            count2 = 0;
                        }
                        
                    });
					
				}
            })

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
            

            
            
            //请求ajax数据
            $.ajax({
                dataType : "json",
                url : "http://localhost:8000/smartphone",
                success: function(data){

                    let col3=template("col3",data.returnData.OutMasterDatas);
                    $(".col3").append(col3);
                    console.log(data.returnData.OutMasterDatas);
                }

            })
            $.ajax({
                dataType : "json",
                url : "http://localhost:8000/camare",
                success: function(data){

                    let hot=template("hot",data.returnData.OutMasterDatas);
                    $(".goods_list_sec_content").append(hot);
                    console.log(data.returnData.OutMasterDatas);
                }

            })
            $.ajax({
                dataType : "json",
                url : "http://localhost:8000/smartphone",
                success: function(data){

                    let col4=template("col4",data.returnData.OutMasterDatas);
                    $(".col4").append(col4);
                    console.log(data.returnData.OutMasterDatas);
                }

            })

            //goods_list lunbo
            let listcount1 = 0;
            let headers = Array.from($(".header3 li"));
            let goodsList1 = setInterval(() => {
                $(".header3 li").removeClass("active");
                $(".header3 li").eq(listcount1).addClass("active");
                $(".col3 .goods_list_one").eq(listcount1).animate({
                    opacity : 1
                },500,function(){
                    listcount1++;
                    if(listcount1 == 3) listcount1=0;
                })
                $(".col3 .goods_list_one").eq(listcount1).siblings().not(".btn").animate({
                    opacity : 0
                },500)
                
            }, 2000);
            
            $(".col3").on("mouseenter",function(){
                clearInterval(goodsList1);
            })

            $(".col3").on("mouseleave",function(){
                goodsList1 = setInterval(() => {
                    $(".header3 li").removeClass("active");
                    $(".header3 li").eq(listcount1).addClass("active");
                    $(".col3 .goods_list_one").eq(listcount1).animate({
                        opacity : 1
                    },500,function(){
                        listcount1++;
                        if(listcount1 == 3) listcount1=0;
                    })
                    $(".col3 .goods_list_one").eq(listcount1).siblings().not(".btn").animate({
                        opacity : 0
                    },500)
                    
                }, 2000);
            })  

            $(".col3 .btn_left").on("click",function(){
                
                listcount1 = listcount1 - 1 >=0? listcount1-1 : 2;
                $(".header3 li").removeClass("active");
                $(".header3 li").eq(listcount1).addClass("active");
                $(".col3 .goods_list_one").eq(listcount1).animate({
                    opacity : 1
                },500)
                $(".col3 .goods_list_one").eq(listcount1).siblings().not(".btn").animate({
                    opacity : 0
                },500)
            })

            $(".col3 .btn_right").on("click",function(){
                listcount1 = listcount1 + 1 <=2?listcount1+1 : 0;
                $(".header3 li").removeClass("active");
                $(".header3 li").eq(listcount1).addClass("active");
                $(".col3 .goods_list_one").eq(listcount1).animate({
                    opacity : 1
                },500)
                $(".col3 .goods_list_one").eq(listcount1).siblings().not(".btn").animate({
                    opacity : 0
                },500)
            })

            headers.forEach(function(nav, index){
				nav.onclick = function(){
                    listcount1 = index;
                    $(".header3 li").removeClass("active");
                    $(".header3 li").eq(listcount1).addClass("active");
                    $(".col3 .goods_list_one").eq(listcount1).animate({
                        opacity : 1
                    },500)
                    $(".col3 .goods_list_one").eq(listcount1).siblings().not(".btn").animate({
                        opacity : 0
                    },500)
					
				}
            })


            // 列表2 的轮播
            let listcount2 = 0;
            let headers2 = Array.from($(".header4 li"));
            let goodsList2 = setInterval(() => {
                $(".header4 li").removeClass("active");
                $(".header4 li").eq(listcount2).addClass("active");
                $(".col4 .goods_list_one").eq(listcount2).animate({
                    opacity : 1
                },500,function(){
                    listcount2++;
                    if(listcount2 == 4) listcount2=0;
                })
                $(".col4 .goods_list_one").eq(listcount2).siblings().not(".btn").animate({
                    opacity : 0
                },500)
                
            }, 2000);
            
            $(".col4").on("mouseenter",function(){
                clearInterval(goodsList2);
            })

            $(".col4").on("mouseleave",function(){
                goodsList2 = setInterval(() => {
                    $(".header4 li").removeClass("active");
                    $(".header4 li").eq(listcount2).addClass("active");
                    $(".col4 .goods_list_one").eq(listcount2).animate({
                        opacity : 1
                    },500,function(){
                        listcount2++;
                        if(listcount2 == 4) listcount2=0;
                    })
                    $(".col4 .goods_list_one").eq(listcount2).siblings().not(".btn").animate({
                        opacity : 0
                    },500)
                    
                }, 2000);
            })  

            $(".col4 .btn_left").on("click",function(){
                
                listcount2 = listcount2 - 1 >=0? listcount2-1 : 3;
                $(".header4 li").removeClass("active");
                $(".header4 li").eq(listcount2).addClass("active");
                $(".col4 .goods_list_one").eq(listcount2).animate({
                    opacity : 1
                },500)
                $(".col4 .goods_list_one").eq(listcount2).siblings().not(".btn").animate({
                    opacity : 0
                },500)
            })

            $(".col4 .btn_right").on("click",function(){
                listcount2 = listcount2 + 1 <=3?listcount2+1 : 0;
                $(".header4 li").removeClass("active");
                $(".header4 li").eq(listcount2).addClass("active");
                $(".col4 .goods_list_one").eq(listcount2).animate({
                    opacity : 1
                },500)
                $(".col4 .goods_list_one").eq(listcount2).siblings().not(".btn").animate({
                    opacity : 0
                },500)
            })

            headers2.forEach(function(nav, index){
				nav.onclick = function(){
                    listcount2 = index;
                    $(".header4 li").removeClass("active");
                    $(".header4 li").eq(listcount2).addClass("active");
                    $(".col4 .goods_list_one").eq(listcount2).animate({
                        opacity : 1
                    },500)
                    $(".col4 .goods_list_one").eq(listcount2).siblings().not(".btn").animate({
                        opacity : 0
                    },500)
					
				}
            })



//this is end；
         })
     })
})