var gulp=require('gulp');
var webpack=require('webpack');
// var gulpWebpack=require('gulp-webpack');
var merge=require('webpack-merge');
var config=require('./webpack.config');
var uglifyPlugin=require('uglifyjs-webpack-plugin');
var cleanPlugin=require('clean-webpack-plugin');

var mergeConfig=merge(config,{
    mode:'production',
    plugins:[new uglifyPlugin({}),new cleanPlugin('dist')],
    devtool:''
});

var compiler=webpack(mergeConfig);

gulp.task('webpack',function(){
    compiler.run(()=>{
        console.log("success");
    });
})