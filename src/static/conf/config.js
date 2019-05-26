requirejs.config({
	baseUrl : "http://localhost:9999/",
	paths : {
		"vali" : "scripts/libs/jquery.validate",
		"jquery" : "scripts/libs/jquery-2.0.3",
		"sw" : "scripts/libs/swiper",
		"jq.cookie" : "scripts/libs/jquery.cookie",
		"bootstrap" : "scripts/libs/bootstrap",
		"jquery.ui" : "scripts/libs/jquery-ui",
		"common" : "scripts/libs/common",
		"header" : "scripts/libs/header",//失败？有空测试 先方法直接ctrl+c 添加到相应js
		"css" :  "scripts/libs/css"  //加载CSS文件的插件
	},
	shim : {
		"jq.cookie" : {
			deps : ["jquery"]
		},
		"sw" : {
			deps : ["css!styles/swiper.css"]
		},
		"bootstrap" : {
			deps : [
				"jquery",
				"css!styles/bootstrap.css"
			]
		},
		"common" : {
			deps : [
				"jquery",
				"css!styles/pages/home/footer.css",
				"css!styles/pages/home/header.css",
			]
		},
		"header" :{
			deps : [
				"jquery",
				"common"
			]
		}
	}
})