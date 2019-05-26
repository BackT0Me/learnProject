require(["../../static/conf/config.js"],function(){
    require(["jquery"],function($){

        let fn = $(".fn");
        let n = $(".n");
        let id = $(".id");
        let em = $(".em");
        let pwd = $(".pwd");
        let pwdc = $(".pwdc");
        let fn2 = $(".fn2");
        //按钮校验 若全匹配按钮变为可点击
        let firstnameFlag = false;
        let nameFlag = false;
        let idFlag = false;
        let emailoRphone = false;
        let pwdFlag = false;
        let pwdcFlag = false;
        //记录下账号密码
        let IDText = null;
        let pwdText = null;
        let firstnametext = null;

        $(".btn1").on("click",function(){
            if(firstnameFlag&&nameFlag&&idFlag){
                $("#verify").hide("100");
                $("#register").show("200");
                $("#fristname2").val(firstnametext);
                $("#fristname2").addClass("focus");
                fn2.animate({
                    top : "-20px",
                    fontSize : "14px"
                },500,function(){
                    fn2.css({
                        color : "blue"})
                })          
            }
        })
        
        //姓氏验证

        $("#fristname").focus(function(){
            fn.animate({
                top : "-20px",
                fontSize : "14px",
            },500,function(){
                fn.css({
                    color : "blue"
                });
                $("#fristname").addClass("focus");
                $("#fristname").addClass("fcolor");
            })
        })
        $("#fristname").blur(function(){
            $("#fristname").removeClass("fcolor");
            if($("#fristname").val() == ""){
                fn.animate({
                top: "10px",
                "font-size": "20px",
                
            },500,function(){
                fn.css({
                    color: "#767676"
                });
                $("#fristname").removeClass("focus");
                $("#fristname").addClass("error");
                $("#fristname").next(".warn").show();
                firstnameFlag = false;
                firstnametext = null;
            })
            }else{
                $("#fristname").removeClass("error");
                $("#fristname").next(".warn").hide();
                firstnameFlag = true;
                firstnametext = $("#fristname").val();
                if(firstnameFlag&&nameFlag&&idFlag){
                    $(".btn1").animate({
                        opacity : 1
                    },500);
                }
            }
            
        })
        


        //姓名验证
        $("#name").focus(function(){
            n.animate({
                top : "-20px",
                fontSize : "14px",
            },500,function(){
                n.css({
                    color : "blue"
                });
                $("#name").addClass("focus");
                $("#name").addClass("fcolor");
            })
        })
        $("#name").blur(function(){
            $("#name").removeClass("fcolor");
            if($("#name").val() == ""){
                    n.animate({

                    top: "10px",
                    "font-size": "20px",
                    
                },500,function(){
                    n.css({
                        color: "#767676"
                    });
                    $("#name").removeClass("focus");
                    $("#name").addClass("error");
                    $("#name").next(".warn").show();
                    nameFlag = false;
                })
            }else{
                $("#name").removeClass("error");
                $("#name").next(".warn").hide();
                nameFlag = true;
                if(firstnameFlag&&nameFlag&&idFlag){
                    $(".btn1").animate({
                        opacity : 1
                    },500);
                }
            }
            
        })

        //身份证
        $("#id").focus(function(){
            id.animate({
                top : "-20px",
                fontSize : "14px",
            },500,function(){
                id.css({
                    color : "blue"
                });
                $("#id").addClass("focus");
                $("#id").addClass("fcolor");
                
            })
        })
        $("#id").blur(function(){
            $("#id").removeClass("fcolor")
            if($("#id").val() == ""){
                id.animate({

                top: "10px",
                "font-size": "20px",
                
            },500,function(){
                id.css({
                    color: "#767676"
                });
                $("#id").removeClass("focus");
                $("#id").addClass("error");
                $("#id").next(".warn").show();
                idFlag = false;
            })
            }else if($("#id").val().length<18 || $("#id").val().match(/^[0-9]*$/)==null){
                $("#id").removeClass("focus");
                $("#id").addClass("error");
                $("#id").next(".warn").show();
                idFlag = false;
            }else{
                $("#id").removeClass("error");
                $("#id").next(".warn").hide();
                idFlag = true;
                if(firstnameFlag&&nameFlag&&idFlag){
                    $(".btn1").animate({
                        opacity : 1
                    },500);
                }
            }
            
        })
        //  邮箱验证
        $("#emailp").focus(function(){
            console.log("as");
            em.animate({
                top : "-20px",
                fontSize : "14px"
            },500,function(){
                em.css({
                    color : "blue"
                });
                $("#emailp").addClass("focus");
                $("#emailp").addClass("fcolor");
                
            })
        })
        $("#emailp").blur(function(){
            $("#emailp").removeClass("fcolor")
            if($("#emailp").val() == ""){
                emailoRphone = false;
                em.animate({
                top: "10px",
                "font-size": "20px",
                
            },500,function(){
                em.css({
                    color: "#767676"
                });
                $("#emailp").removeClass("focus");
                $("#emailp").addClass("error");
                $("#emailp").siblings(".warn").show();
                
            })
            }else if($("#emailp").val().match(/^\w+@\w+\.com$/)==null){
                $("#emailp").removeClass("focus");
                $("#emailp").addClass("error");
                $("#emailp").next(".warn").show();
                emailoRphone = false;
            }else{
                $("#emailp").removeClass("error");
                $("#emailp").siblings(".warn").hide();
                emailoRphone = true;
                IDText = $("#emailp").val();
                if(emailoRphone&&pwdFlag&&pwdcFlag){
                    $(".btn2").animate({
                        opacity : 1
                    },500);
                }
            }
            
        })

        //电话号验证
        
         $("#phonenum").focus(function(){
            
            em.animate({
                top : "-20px",
                fontSize : "14px"
            },500,function(){
                em.css({
                    color : "blue"
                });
                $("#phonenum").addClass("focus");
                $("#phonenum").addClass("fcolor");
                
            })
        })
        $("#phonenum").blur(function(){
            $("#phonenum").removeClass("fcolor")
            if($("#phonenum").val() == ""){
                emailoRphone = false;
                em.animate({
                top: "10px",
                "font-size": "20px",
                
            },500,function(){
                em.css({
                    color: "#767676"
                });
                $("#phonenum").removeClass("focus");
                $("#phonenum").addClass("error");
                $("#phonenum").next(".warn").show();
                
            })
            }else if($("#phonenum").val().match(/^[1][3,4,5,7,8][0-9]{9}$/)==null){
                $("#phonenum").removeClass("focus");
                $("#phonenum").addClass("error");
                $("#phonenum").next(".warn").show();
                emailoRphone = false;
            }else{
                $("#phonenum").removeClass("error");
                $("#phonenum").next(".warn").hide();
                emailoRphone = true;
                IDText = $("#phonenum").val();
                if(emailoRphone&&pwdFlag&&pwdcFlag){
                    $(".btn2").animate({
                        opacity : 1
                    },500);
                }
            }
            
        })

        //  密码验证
        $("#pwd").focus(function(){
            
            pwd.animate({
                top : "-20px",
                fontSize : "14px"
            },500,function(){
                pwd.css({
                    color : "blue"
                });
                $("#pwd").addClass("focus");
                $("#pwd").addClass("fcolor");
                
            })
        })
        $("#pwd").blur(function(){
            $("#pwd").removeClass("fcolor")
            if($("#pwd").val() == ""){
                pwdFlag = false;
                pwd.animate({
                top: "10px",
                "font-size": "20px",
                
            },500,function(){
                pwd.css({
                    color: "#767676"
                });
                $("#pwd").removeClass("focus");
                $("#pwd").addClass("error");
                $("#pwd").next(".warn").show();
                
            })
            }else if($("#pwd").val().match(/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/)==null){
                $("#pwd").removeClass("focus");
                $("#pwd").addClass("error");
                $("#pwd").next(".warn").show();
                pwdFlag = false;
            }else{
                $("#pwd").removeClass("error");
                $("#pwd").next(".warn").hide();
                pwdFlag = true;
                if(emailoRphone&&pwdFlag&&pwdcFlag){
                    $(".btn2").animate({
                        opacity : 1
                    },500);
                }
            }
            
        })
    
        //  二次密码验证
        $("#pwdcheck").focus(function(){
            
            pwdc.animate({
                top : "-20px",
                fontSize : "14px"
            },500,function(){
                pwdc.css({
                    color : "blue"
                });
                $("#pwdcheck").addClass("focus");
                $("#pwdcheck").addClass("fcolor");
                
            })
        })
        $("#pwdcheck").blur(function(){
            $("#pwdcheck").removeClass("fcolor")
            if($("#pwdcheck").val() == ""){
                pwdcFlag = false;
                pwdc.animate({
                top: "10px",
                "font-size": "20px",
                
            },500,function(){
                pwdc.css({
                    color: "#767676"
                });
                $("#pwdcheck").removeClass("focus");
                $("#pwdcheck").addClass("error");
                $("#pwdcheck").next(".warn").show();
                
            })
            }else if($("#pwdcheck").val().match($("pwd").val())==null){
                $("#pwdcheck").removeClass("focus");
                $("#pwdcheck").addClass("error");
                $("#pwdcheck").next(".warn").show();
                pwdcFlag = false;
            }else{
                $("#pwdcheck").removeClass("error");
                $("#pwdcheck").next(".warn").hide();
                pwdcFlag = true;
                pwdText = $("#pwdcheck").val();
                if(emailoRphone&&pwdFlag&&pwdcFlag){
                    $(".btn2").animate({
                        opacity : 1
                    },500);
                }
            }
            
        })

        //切换
        $("#email").on("click",function(){
            $("#email").addClass("chosen");
            $("#email").siblings().removeClass("chosen");
            $("#emailp").show();
            $("#phonenum").hide();
            $(".em").text("邮箱");
            $(".em").siblings(".warn").text("请填写正确的邮箱格式");
        })
        $("#phonenumber").on("click",function(){
            $("#phonenumber").addClass("chosen");
            $("#phonenumber").siblings().removeClass("chosen");
            $("#emailp").hide();
            $("#phonenum").show();
            $(".em").text("电话号码");
            $(".em").siblings(".warn").text("请填写正确的电话号码");
        })


        //本地存储
        $(".btn2").on("click",function(){
            if(emailoRphone&&pwdFlag&&pwdcFlag){
                let t = localStorage.getItem(IDText);
                if (!t){
                    localStorage.setItem(IDText,pwdText);
                    alert("注册成功请返回首页登录");
                    window.open("http://localhost:9999/pages/index/login.html");
                    window.close();
                }else{
                    alert("请不要重复注册");
                }
                
            }
        })

        


        //end
    })
})