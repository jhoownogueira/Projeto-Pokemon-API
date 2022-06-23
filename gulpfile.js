const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Compilando o sass, adicionando prefixer e dando refresh na página
function compilaSass() {
    return gulp.src('scss/*.scss')
    .pipe(sass({outputStyle : 'compressed'}))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

// Tarefa Sass
gulp.task('sass', compilaSass);

function pluginsCSS() {
    return gulp
    .src('css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

gulp.task('pluginscss', pluginsCSS);

function gulpJs() {
    return gulp.src('js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

gulp.task('Alljs', gulpJs);

function pluginsJs() {
    return gulp
    .src(['js/lib/aos.min.js', 'js/lib/swiper.min.js', 'js/lib/axios.min.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

gulp.task('pluginsJs', pluginsJs);


// Função do browserSync
function browser() {
    browserSync.init({
        server: {
            basesir: './'
        }
    })
}
// Tarefa do browserSync
gulp.task('browser-sync', browser);


// Função do watch para alterações em Sass e Html
function watch() {
    gulp.watch('scss/*.scss', compilaSass);
    gulp.watch('css/lib/*.css', pluginsCSS);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('js/scripts/*.js', gulpJs);
    gulp.watch('js/lib/*.js', pluginsJs);
}

// Tarefa do Watch
gulp.task('watch', watch);


// Tarefas default que executa watch e ou browser sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'pluginscss', 'Alljs', 'pluginsJs'));