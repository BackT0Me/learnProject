require(["../../static/conf/config.js"],function(){
    require(["jquery"],function($){
        $(function(){
            let id = $("#id");
            let pwd = $("#password");
            let md = $("#md");
            $(".input_id").focus(function(){
                id.animate({
                    top : "-20px",
                    fontSize : "14px",
                },500,function(){
                    id.css({
                        color : "blue"
                    });
                    $(".input_id").addClass("focus");
                })
            })
            $(".input_id").blur(function(){
                if($(".input_id").val() == ""){
                     id.animate({

                    top: "10px",
                    "font-size": "20px",
                    
                },500,function(){
                    id.css({
                        color: "#767676"
                    });
                    $(".input_id").removeClass("focus");
                })

                }
               
            })
            $(".input_pwd").focus(function(){
                pwd.animate({
                    top : "-20px",
                    fontSize : "14px",
                    color : "blue"
                },500,function(){
                    pwd.css({
                        color : "blue"
                    });
                    $(".input_pwd").addClass("focus");
                })
            })
            $(".input_pwd").blur(function(){
                if($(".input_pwd").val() == ""){
                    pwd.animate({

                    top: "10px",
                    "font-size": "20px",
                    color: "#767676"
                },500,function(){
                    pwd.css({
                        color: "#767676"
                    });
                    $(".input_pwd").removeClass("focus");
                })

                }
                
            })
            $(".input_md").focus(function(){
                md.animate({
                    top : "-20px",
                    fontSize : "14px",
                    color : "blue"
                },500,function(){
                    md.css({
                        color : "blue"
                    });
                    $(".input_md").addClass("focus");
                })
            })
            $(".input_md").blur(function(){
                if($(".input_md").val() == ""){
                    md.animate({

                    top: "10px",
                    "font-size": "20px",
                    color: "#767676"
                },500,function(){
                    md.css({
                        color: "#767676"
                    });
                    $(".input_md").removeClass("focus");
                })
                }
                
            })
            
            //登录验证
            $(".loginbtn").on("click",function(){
                let idText = $("#he").val();
                let pwdText = $("#pwd").val();
                let key = localStorage.getItem(idText);
                if($("#hee").val()!="ACxPd3Ab"){
                    alert("验证失败")
                }else{
                    if (key == pwdText){
                        alert("登录成功");
                        addCookie("name",idText,1);
                        
                        window.open("http://localhost:9999/pages/index/index.html");
                        window.close();
                    }else{
                        alert("账号密码错误");
                    }
                }
                
                
            })

            //登录状态，设置cookie验证
            function addCookie(key, value, days) {
                var now = new Date();
                now.setDate(now.getDate() + days);
                document.cookie = key + "=" + value + "; expires=" + now + "; path=" + "/";
            }
        })
    })

})
    