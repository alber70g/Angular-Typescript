var gulp = require('gulp'),
    wiredep = require('wiredep'),
    less = require('gulp-less'),
    ts = require('gulp-typescript'),
    karma = require('karma'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    del = require('del'),
    runSequence = require('run-sequence'),
    inject = require('gulp-inject'),
    bower = require('gulp-bower'),
    webserver = require('gulp-webserver'),
    gutil = require('gulp-util'),
    filenames = require('gulp-filenames'),
    exec = require('child_process').exec,
    http = require('http'),
    url = require('url'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    config = require('./gulp.config')(),
    angularFilesort = require('gulp-angular-filesort'),
    templateCache = require('gulp-angular-templatecache');

gulp.task('default', ['serve-dev:node']);

gulp.task('devHTML', function() {
    return gulp.src(config.html.files)
        .pipe(templateCache({
            root: "src/"
        }))
        .pipe(gulp.dest(config.temp));
});

gulp.task('dist', function(cb) {
    runSequence(
        ['bower', 'clean'],
        ['devTS', 'devLess', 'devHTML'],
        ['buildAppCSS', 'buildAppJS', 'buildLibJS', 'buildLibCSS', 'copyAssets'],
        'buildInject',
    cb);
});

gulp.task('dev', function(cb) {
    runSequence(
        ['bower', 'clean'],
        ['devTS', 'devLess', 'devHTML'],
        'devInject',
        'test-dev',
    cb);
});

gulp.task('serve-dev:node', ['dev'], function () {
    watch();

    gulp.src(config.client)
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
    
    //exec('start http://localhost');
});

gulp.task('serve-dist:node', ['dist'], function () {
    watch();

    gulp.src(config.dist.path)
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: false
        }));

    exec('start http://localhost');
});

gulp.task('devLess', function() {
    return gulp.src(config.less.file)
        .pipe(inject(gulp.src(config.less.modules, {read: false}), { starttag: '/* inject:imports */', endtag: '/* endinject */', 
            transform: function (filepath) {
                return '/* ' + filepath + ' */\r\n@import ".' + filepath + '";';
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(less({}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.client));
});

gulp.task('devTS', function() {
    
    var tsProject = ts.createProject('tsconfig.json');

    // Build all TS files to JS files
    var tsResult = gulp.src(config.typescript.ts)
        .pipe(filenames("AppTS"))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));


    return tsResult.js.pipe(angularFilesort())
        .pipe(sourcemaps.write())
        .pipe(filenames("AppJS"))
        .pipe(gulp.dest(config.client));
});

gulp.task('devInject', function() {
    // Bower deps + inject other JS files
    return gulp.src(config.index)
        .pipe(wiredep.stream(config.getWiredepDefaultOptions()))
        .pipe(inject(gulp.src(config.allappjs).pipe(angularFilesort()), { relative: true }))
        .pipe(inject(gulp.src(config.allappcss, { read: false }), { relative: true }))
        .pipe(inject(gulp.src(config.injectmanual.dev, {read: false}), {relative: true, starttag: '<!-- inject:manual -->', endtag: '<!-- endinject -->'}))
        .pipe(gulp.dest(config.client));
});

gulp.task('buildLibCSS', function() { 
    // wiredep all bower deps into libs.min.css
    if (wiredep(config.getWiredepDefaultOptions()).css) {
        return gulp.src(wiredep(config.getWiredepDefaultOptions()).css)
            .pipe(minifyCSS())
            .pipe(concat('libs.min.css'))
            .pipe(gulp.dest(config.dist.path));
    }
});

gulp.task('buildLibJS', function() { 
    // wiredep all bower deps into libs.min.js
    if (wiredep(config.getWiredepDefaultOptions()).js) {
        return gulp.src(wiredep(config.getWiredepDefaultOptions()).js)
            .pipe(uglify())
            .pipe(concat('libs.min.js'))
            .pipe(gulp.dest(config.dist.path));
    }
});

gulp.task('buildAppJS', function() { 

    // all compiled js to app.min.js
    return gulp.src(config.allappjs)
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(config.dist.path));
});

gulp.task('buildAppCSS', function() { 

    // all compiled css to app.min.css
    return gulp.src(config.css.file)
        .pipe(minifyCSS())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(config.dist.path));
}); 

gulp.task('buildInject', function() {
    gulp.src(config.index)
        .pipe(inject(gulp.src(config.dist.path + 'libs.min.css', {read: false}), {relative: true, ignorePath: 'dist', starttag: '<!-- bower:css -->', endtag: '<!-- endbower -->'}))
        .pipe(inject(gulp.src(config.dist.path + 'libs.min.js', {read: false}), {relative: true, ignorePath: 'dist', starttag: '<!-- bower:js -->', endtag: '<!-- endbower -->'}))
        .pipe(inject(gulp.src(config.injectmanual.dist, {read: false}), {relative: true, ignorepath: 'dist', starttag: '<!-- inject:manual -->', endtag: '<!-- endinject -->'}))
        .pipe(inject(gulp.src(config.dist.path + 'app.min.js', {read: false}), {relative: true, ignorePath: 'dist', starttag: '<!-- inject:js -->', endtag: '<!-- endinject -->'}))
        .pipe(inject(gulp.src(config.dist.path + 'app.min.css', {read: false}), {relative: true, ignorePath: 'dist', starttag: '<!-- inject:css -->', endtag: '<!-- endinject -->'}))
        .pipe(gulp.dest(config.dist.path));
});

gulp.task('copyAssets', function() {
    gulp.src(config.assets.files)
        .pipe(gulp.dest(config.dist.assets));

    gulp.src(config.html.files)
        .pipe(gulp.dest(config.dist.html));        
});

gulp.task('compile-tests', function() {
    // Build all TS test files to JS files
    var testFiles = [];

    testFiles = testFiles.concat(config.typescript.definitions);
    testFiles = testFiles.concat(filenames.get("AppTS"));
    testFiles = testFiles.concat(config.typescript.tests);

    var tsResult = gulp.src(testFiles)
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
          }));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(filenames("TestJS"))
        .pipe(gulp.dest(config.client));
});

gulp.task('test-dev', ['compile-tests'], function(done) {

    var allFiles = [];

    var bowerFiles = wiredep(config.getWiredepDefaultOptions()).js;
    var appFiles = filenames.get("AppJS");
    var testFiles = filenames.get("TestJS");

    // Prefix paths properly. gulp-filenames will strip the folder we're searching (equal to config.client)
    for (var i in appFiles) {
        appFiles[i] = config.client + appFiles[i];
    }

    for (var i in testFiles) {
        testFiles[i] = config.client + testFiles[i];
    }
    
    // Workaround for https://github.com/ariya/phantomjs/issues/10522
    // Source; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    allFiles = allFiles.concat("test/polyfill.bind.js");

    allFiles = allFiles.concat(bowerFiles);
    allFiles = allFiles.concat(config.injectmanual.dev);
    allFiles = allFiles.concat(appFiles);
    allFiles = allFiles.concat(config.temp + "templates.js");
    allFiles = allFiles.concat(testFiles);

    karma.server.start({
        configFile: __dirname + '/karma.config.js',
        singleRun: true,
        files: allFiles,
        browsers: ['PhantomJS']
    }, done);
});

gulp.task('test-dist', ['dist', 'compile-tests'], function(done) {

    karma.server.start({
        configFile: __dirname + '/karma.config.js',
        singleRun: true,
        browsers: ['PhantomJS']
    }, done);
});


gulp.task('bower', function () {
    return bower({ cmd: 'install'});
});

gulp.task('clean', function (cb) {
    del([config.dist.path, config.typescript.js, config.css.file].concat(config.allappjs), cb);
});

function watch() {
    gulp.watch(config.typescript.ts, ['dev']);
    gulp.watch(config.allappless, ['dev']);
}