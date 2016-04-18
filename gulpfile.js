/**
 * Created by mojtaba on 3/6/16.
 */

var gulp = require('gulp');
var karma = require('karma');

var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
// var replace = require('gulp-replace');



// var gzip = require('gulp-gzip');
gulp.task('compressJsFiles',function(){
    gulp.src([
            "app/**/*.js"
        ])
        .pipe(concat("mine.js"))
        .pipe(uglify())
        // .pipe(rename("public/myfiles.js"))
        //.pipe(gzip())
        .pipe(gulp.dest('public/js'));
    gulp.src("assets/libs/PACE/pace.js").pipe(uglify()).pipe(gulp.dest('assets/js'));
    gulp.src([
            "assets/libs/jquery/dist/jquery.js",
            "assets/libs/tether/dist/js/tether.js",
            "assets/libs/bootstrap/dist/js/bootstrap.js",


            "assets/libs/ng-file-upload-shim/ng-file-upload-shim.js",//it comes here because of conflict between upload and pace
            "assets/libs/angular/angular.js",
            "assets/libs/ngstorage/ngStorage.js",
            "assets/libs/angular-translate/angular-translate.js",
            "assets/libs/angular-bootstrap/ui-bootstrap-tpls.min.js",
            "assets/libs/angular-animate/angular-animate.js",
            "assets/libs/angular-smart-table/dist/smart-table.js",
            "assets/libs/angular-resource/angular-resource.js",
            "assets/libs/angular-sanitize/angular-sanitize.js",
            "assets/libs/angular-touch/angular-touch.js",
            "assets/libs/ui-select/dist/select.js",
            "assets/libs/ng-tags-input/ng-tags-input.js",

            "assets/libs/ng-file-upload/ng-file-upload.js",
            "assets/libs/ngImgCrop/compile/unminified/ng-img-crop.js",
            "assets/libs/angular-ui-router/release/angular-ui-router.js",
            "assets/libs/angular-mocks/angular-mocks.js",
            "assets/libs/angular-ui-utils/ui-utils.js",

            "assets/libs/ace-builds/src-min-noconflict/ace.js",
            "assets/libs/angular-ui-ace/ui-ace.js",

            "assets/libs/ng-password-strength/dist/scripts/ng-password-strength.js",
            "assets/libs/material-design-lite/material.js",
            "assets/libs/angular-material-design-lite/src/angular-material-design-lite.js",

            "assets/libs/raven-js/dist/raven.js",
            "assets/libs/raven-js/dist/plugins/angular.js"
        ])
        .pipe(concat("req.js"))
        // .pipe(uglify())
        // .pipe(rename("public/myfiles.js"))
        // .pipe(gzip())
        .pipe(gulp.dest('assets/js'));

});



var cleanCSS = require('gulp-clean-css');
var addsrc = require('gulp-add-src');
gulp.task('makeCSS', function() {
    gulp.src('assets/scss/app.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths:['assets/libs/foundation/scss','bower_components']
        }).on('error', sass.logError)).pipe(addsrc([
            "assets/libs/ui-select/dist/select.css",
            "assets/libs/ng-tags-input/ng-tags-input.css"
            // "assets/libs/animate.css/animate.min.css",
            // "assets/libs/font-awesome/css/font-awesome.min.css",
            // "assets/libs/bootstrap/dist/css/bootstrap.min.css",
        ]))
        .pipe(concat('app.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/css'));
});
gulp.task('watchSCSS', function () {
    gulp.watch('assets/scss/**/*.scss', ['makeCSS']);
});

gulp.task('copyFontAwsome', function () {
    gulp.src('assets/libs/font-awesome/fonts/*').pipe(gulp.dest('assets/fonts'));
});




var gulpNgConfig = require('gulp-ng-config');
gulp.task('makeProductionEnvironment', function () {
    gulp.src('environment.json')
        .pipe(gulpNgConfig('app.config', {
            environment: 'production'
        })).pipe(gulp.dest('app/'));
});
gulp.task('makeDevelopmentEnvironment', function () {
    gulp.src('environment.json')
        .pipe(gulpNgConfig('app.config', {
            environment: 'development'
        })).pipe(gulp.dest('app/'));
});

gulp.task('makePublic', function () {
    gulp.src('index.html').pipe(gulp.dest('public/'));
    gulp.src('app/**/*.*').pipe(gulp.dest('public/app'));
    gulp.src('assets/**/*.*').pipe(gulp.dest('public/assets'));
});



/**
 * Run test once and exit
 */

gulp.task('karmaTest', function (done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


gulp.task('autotest', function() {
    return gulp.watch(["app/**/*test.js"], ['karmaTest']);
});



gulp.task('ngdocs', [], function () {
    var gulpDocs = require('gulp-ngdocs');
    var options = {
        /* pass both .min.js and .min.js.map files for angular and angular-animate */
        scripts: [
            'assets/libs/angular/angular.min.js',
            'assets/libs/angular/angular.min.js.map',
            'assets/libs/angular-animate/angular-animate.min.js',
            'assets/libs/angular-animate/angular-animate.min.js.map',
            'assets/libs/marked/marked.min.js',
        ],
        title: "pushe ui documentation",
        image: "assets/images/logo.png"
    };
    return gulp.src('app/**/*.js')
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest('./docs'));
});




gulp.task('codacy', function codacyTask() {
    var codacy = require('gulp-codacy');
    return gulp
        .src(['coverage/**/lcov.info'], { read: false })
        .pipe(codacy({
            token: 'ff4d1de1afa1435eaf32a014f4d19dfc'
        }));
});





gulp.task('build', ['copyFontAwsome','makeCSS','compressJsFiles']);
gulp.task('production', ['makeProductionEnvironment','build']);
gulp.task('development', ['makeDevelopmentEnvironment','build']);
gulp.task('default', ['makeCSS','watchSCSS']);
gulp.task('test',['development','karmaTest','codacy']);//dont use it because it do them together but we need to do that after each other