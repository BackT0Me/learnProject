require(["../../static/conf/config.js"], function(){
	require(["jquery","sw"], function($, Swiper){
		$(function(){
			let mySwiper = new Swiper(".swiper-container",{
				autoplay : true,
				loop : true,
				effect : 'fade',
				fadeEffect: {
					crossFade: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				watchSlidesProgress : true,
				pagination : {
					el : ".swiper-pagination",
					clickable : true
				}
			})
			$(".swiper-container").on("mouseleave",function(){
				mySwiper.autoplay.start();
			})
			$(".swiper-container").on("mouseenter",function(){
				mySwiper.autoplay.stop();
			})
			
			$("#thenew").on("click",function(){
				$(".slidershow2").animate({
					left : "0px"
				},500)
				$("#thenew a").removeClass("word_list_color");
				$("#thenew").siblings().children().addClass("word_list_color");
				$(".label").remove();
				let div = $("<div>");
				$("#thenew").append(div);
				$("#thenew div").addClass("label");
				$(".label").animate({
					width : "128px"
				})
			})
			
			$("#suggest").on("click",function(){
				$(".slidershow2").animate({
					left : "-1470px"
				},500)
				$("#suggest a").removeClass("word_list_color");
				
				$("#suggest").siblings().children().addClass("word_list_color");
				$(".label").remove();
				let div = $("<div>");
				$("#suggest").append(div);
				$("#suggest div").addClass("label");
				$(".label").animate({
					width : "64px"
				})
			})

			$("#hot").on("click",function(){
				$(".slidershow2").animate({
					left : "-2940px"
				},500)
				$("#hot a").removeClass("word_list_color");
				$("#hot").siblings().children().addClass("word_list_color");
				$(".label").remove();
				let div = $("<div>");
				$("#hot").append(div);
				$("#hot div").addClass("label");
				$(".label").animate({
					width : "128px"
				})	
			})

			$(".silde_one div").on("mouseenter",function(){
				this.addClass("shadow");
			})

			

		})
	})
})