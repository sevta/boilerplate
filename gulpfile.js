const gulp = require('gulp')
const sass = require('gulp-sass')
const autoPrefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')

let config = {
  src: './resources/assets/scss/**/*.scss',
  dest: './public/css',
  bsConfig_static: {
    server: {
        baseDir: './public/'
    }
  } ,
  bsConfig: {
    proxy: 'localhost:8001',
    port: 8001,
    open: true,
    notify: true
  } ,
  phpConfig: {
    base: './public',
    port: 8001,
    keepalive: true
  }
}

gulp.task('webpack' , () => {
    return gulp.src('./resources/assets/js/**/*.js')
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('./public/js/'))
})

gulp.task('minify' , () => {
  gulp.src(config.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoPrefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(config.dest))
})

gulp.task('sass' , () =>
  gulp.src(config.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoPrefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(config.dest))
)

gulp.task('serve' , () => {
  browserSync.init(config.bsConfig_static)
})

// gulp.task('php' , () => {
//   connectPhp.server(config.phpConfig)
// })

// gulp.task('obfuscate' , function() {
//   return gulp.src('./storage/app/word-up.js')
//     .pipe(obfuscate({
//       compact: true,
//       controlFlowFlattening: true,
//       controlFlowFlatteningThreshold: 0.75,
//       debugProtection: false,
//       debugProtectionInterval: false,
//       disableConsoleOutput: true,
//       rotateStringArray: true,
//       selfDefending: true,
//       stringArray: true,
//       stringArrayEncoding: 'base64',
//       stringArrayThreshold: 0.75,
//       unicodeEscapeSequence: false
//     }))
//     .pipe(gulp.dest('./public/js/games'))
// })

gulp.task('build' , () => {
  return gulp.src(config.src)
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoPrefixer())
            .pipe(gulp.dest(config.dest))
})

gulp.task('watch' , () => {
  gulp.watch(config.src , ['sass'])
  gulp.watch('./public/**/*.html').on('change' , browserSync.reload)
  gulp.watch('./resources/assets/js/**/*.js' , ['webpack'])
//   gulp.watch('./resources/views/**/*.php').on('change' , browserSync.reload)
  gulp.watch('./public/css/**/*.css').on('change' , browserSync.reload)
  gulp.watch('./public/js/**/*.js').on('change' , browserSync.reload)
})

gulp.task('default' , ['serve' , 'sass'  , 'watch' , 'webpack'])
