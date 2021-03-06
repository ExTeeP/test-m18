const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const del = require('del');

gulp.task('css', () => {
	return gulp.src('source/sass/main.scss')
		.pipe(plumber())
		.pipe(sourcemap.init())
		.pipe(sass({
			includePaths: require("scss-resets").includePaths
		}))
		.pipe(postcss([ autoprefixer() ]))
		.pipe(csso())
		.pipe(rename('style.min.css'))
		.pipe(sourcemap.write('.'))
		.pipe(gulp.dest('build/css'))
		.pipe(server.stream());
});

gulp.task('server', () => {
	server.init({
		server: 'build/',
		notify: false,
		open: true,
		cors: true,
		ui: false
	});

	gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
	gulp.watch('source/img/icon-*.svg', gulp.series('html', 'refresh'));
  gulp.watch("source/js/**/*.js", gulp.series("js", "refresh"));
	gulp.watch('source/*.html', gulp.series('html', 'refresh'));
});

gulp.task('refresh', (done) => {
	server.reload();
	done();
});

gulp.task('html', () => {
	return gulp.src('source/*.html')
		.pipe(posthtml([
			include()
		]))
		.pipe(gulp.dest('build'));
});

gulp.task("js", function() {
  return gulp.src("source/js/**.js")
  .pipe(gulp.dest("build/js"))
});

gulp.task('copy', () => {
	return gulp.src([
		'source/fonts/**/*.{woff,woff2}',
		'source/img/**',
		'source/js/**',
		'source//*.ico'
		], {
			base: 'source'
		})
	.pipe(gulp.dest('build'));
});

gulp.task('clean', () => {
	return del('build');
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'html'));
gulp.task('start', gulp.series('build', 'server'));
gulp.task("js", gulp.series("js"));
