var gulp = require('gulp'),
    less = require('gulp-less'),
    minhtml = require('gulp-htmlmin'),
    autofixer = require('gulp-autoprefixer'),
    webserver = require('gulp-webserver'),
    runSequence = require('run-sequence'),
    tmodjs = require('gulp-tmod');


gulp.task('test-less',function(){
    gulp.src('src/css/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'))
    .pipe(gulp.dest('dist/css/'));
})

gulp.task('testtmod', function(){
    var stream = gulp.src('src/template/*.html')
            .pipe(tmodjs({
                templateBase: 'template'
            }))
            .pipe(gulp.dest('src/'))
            .pipe(gulp.dest('dist/'));
    return stream;
});

gulp.task('minhtml',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/**/*.html')
    .pipe(minhtml(options))
    .pipe(gulp.dest('dist/'));

    // gulp.src('src/account/*.html')
    // .pipe(minhtml(options))
    // .pipe(gulp.dest('dist/account'));
})

gulp.task('copy',function(){
    gulp.src([
        "bower_components/jquery/dist/jquery.min.js",
        "bower_components/bootstrap/dist/js/bootstrap.min.js",
        "bower_components/requirejs/require.js",
        'bower_components/artTemplate//dist/template.js',
        'bower_components/powerSwitch/jquery-powerSwitch.js',
        'bower_components/bootstrapvalidator/dist/js/bootstrapValidator.min.js',
        'bower_components/bootstrap-select/dist/js/bootstrap-select.min.js'
    ])
    .pipe(gulp.dest('src/js/libs'))
    .pipe(gulp.dest('dist/js/libs'));

    gulp.src([
        "bower_components/bootstrap/dist/css/bootstrap.min.css",
        "bower_components/bootstrapvalidator/dist/css/bootstrapValidator.min.css",
        "bower_components/bootstrap-select/dist/css/bootstrap-select.min.css"
    ])
    .pipe(gulp.dest('src/css/'))
    .pipe(gulp.dest('dist/css/'));

    gulp.src([
        "bower_components/bootstrap/fonts/*",
    ])
    gulp.src(["src/*"])
    .pipe(gulp.dest('dist/'));

    gulp.src(['src/*.js'])
    .pipe(gulp.dest('dist/'));

    gulp.src(['src/images/*'])
    .pipe(gulp.dest('dist/images/'));

    gulp.src(['src/css/*'])
    .pipe(gulp.dest('dist/css/'));

    gulp.src(['src/**/*.js'])
    .pipe(gulp.dest('dist/'));

    gulp.src(['src/output/**/*.js'])
    .pipe(gulp.dest('dist/output'));


})

gulp.task('autofixer',function(){
     gulp.src('src/css/**/*.css')
    .pipe(autofixer({
        browsers: ['last 20 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove:true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(gulp.dest('dist/css/'));
})

gulp.task('watch',function(){
    gulp.watch(['src/css/**/*.less','src/*.html','src/account/*.html','src/template/*.html','src/css/**/*.css','src/*.js'],['test-less','minhtml'])
})
gulp.task('webserver', function(){
    gulp.src('src/')
        .pipe(webserver({
            port: 8881,//端口
            host: '',//域名
            liveload: true,//实时刷新代码。不用f5刷新
            directoryListing: {
                path: 'dist/',  
                enable: true,
                open: true
            }
    }))
});
gulp.task('default',['test-less','copy','autofixer','minhtml','webserver','watch']);
