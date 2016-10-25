const 	gulp = require('gulp'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		rename = require('gulp-rename'),
		cleanCss = require('gulp-clean-css'),
		sourcemaps = require('gulp-sourcemaps'),
		babel = require('gulp-babel'),
		babelify = require('babelify'),
		browserify = require('browserify'),
		buffer = require('vinyl-buffer'),
		source = require('vinyl-source-stream'),
		imagemin = require('gulp-imagemin'),
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat');


//sass
gulp.task('sass', function() {
	return gulp.src('build/sass/**/*.scss')  // Берем источник
		.pipe(sourcemaps.init())
		.pipe(sass()) // Проебразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
		.pipe(cleanCss({compatibility: 'ie8'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('assets/css')) // Выгружаем результата в папку assets/css
		.pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении

});


//img
gulp.task('img', function() {
	gulp.src('build/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('assets/img'))
		.pipe(browserSync.reload({stream: true}));
});

//scripts


//html
// gulp.task('html', function() {
// 	return gulp.src('build/html/**/*.html');
// });

//js
gulp.task('ES6', function () {
	var bundler = browserify({
		entries: 'build/js/my/app.js',
		debug: true
	});
	bundler.transform(babelify);
	bundler.bundle()
	.on('error', function (err) { console.error(err); })
	.pipe(source('app.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('assets/js'))
	.pipe(browserSync.reload({stream: true}));
	
});

//server
gulp.task('browserSync', function() {
	browserSync({ // Выполняем browser Sync
		server: { // Определяем параметры сервера
			baseDir: '.' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('watch', ['browserSync', 'sass', 'ES6', 'img'], function() {
	gulp.watch('build/sass/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('*.html', browserSync.reload);
    gulp.watch('build/js/my/*.js', ['ES6']); // Наблюдение за JS файлами в папке js
    gulp.watch(['build/img/*'], ['img']);
})