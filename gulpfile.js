const gulp = require("gulp");
const webserver = require("gulp-webserver");
const express = require("express");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const https = require("https");
const http = require("http");

gulp.task("compileJS", ()=>{
	gulp.src("src/scripts/**/*.js")
		.pipe( babel({
			presets : ["@babel/env"]
		}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dist/scripts") )
	gulp.src("src/pages/**/*.js")
		.pipe( babel({
			presets : ["@babel/env"]
		}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dist/pages") )
	gulp.src("src/static/**/*").pipe( gulp.dest("dist/static") );
})
gulp.task("compileCSS", ()=>{
	gulp.src("src/styles/**/*.scss")
		.pipe( sass() )
		.pipe( autoprefixer() )
		.pipe( csso() )
		.pipe( gulp.dest("dist/styles") )
})
gulp.task("compileHTML", ()=>{
	gulp.src("src/pages/**/*.html")
		.pipe( gulp.dest("dist/pages") )
})
gulp.task("loadImg",()=>{
	gulp.src("src/imges/*")
		.pipe(gulp.dest("dist/imges"))
})


gulp.task("server", function(){
	//静态资源服务器 : 9999
	gulp.src("dist")
		.pipe( webserver({
			livereload : true,
			port : 9999
		}) )
	gulp.watch("src/pages/**/*.js", ["compileJS"]);
	gulp.watch("src/scripts/**/*.js", ["compileJS"]);
	gulp.watch("src/styles/**/*.scss", ["compileCSS"]);
	gulp.watch("src/pages/**/*.html", ["compileHTML"]);
	gulp.watch("src/imges/*",["loadImg"]);
	
	//接口代理服务器
	let app = express();
	
	// 请求手机信息
	app.get("/smartphone", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "www.sonystyle.com.cn",
			path: "/pim/out?method=findMasterDataList&sku8Ds=P43029272,P43029273,P43029274,P43028677,P02663175,P02665175,P02665075,P02657271,P92480406,P92480407,P92480404,P92480405,P32829325,P32828070,P32826170",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})

	// 请求配件信息
	app.get("/eqment", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "www.sonystyle.com.cn",
			path: "/pim/out?method=findMasterDataList&sku8Ds=P02663175,P02665175,P02665075,P02657271",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//请求耳机信息
	app.get("/erji", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "www.sonystyle.com.cn",
			path: "/pim/out?method=findMasterDataList&sku8Ds=P92480406,P92480407,P92480404,P92480405",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	// ask for information
	app.get("/camare", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "www.sonystyle.com.cn",
			path: "/pim/out?method=findMasterDataList&sku8Ds=P32828970,P32829325,P32828070,P32826170",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	app.listen(8000);
})


gulp.task("build", ["compileJS","compileCSS","compileHTML","loadImg"]);