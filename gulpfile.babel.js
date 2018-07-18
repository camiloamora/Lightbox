import gulp from 'gulp';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import babel from 'gulp-babel';

const server = browserSync.create();

const postcssPlugins = [
  cssnano({
    autoprefixer: {
      add: true
    }
  })
];

gulp.task('es6', () =>
    gulp.src('./dev/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./public/js'))
);

gulp.task('sass', () =>
    gulp.src('./dev/scss/styles.scss')
      .pipe(sass())
      .pipe(postcss(postcssPlugins))
      .pipe(gulp.dest('./public/css'))
      .pipe(server.stream({match: '**/*.css'}))
);

gulp.task('pug', () =>
    gulp.src('./dev/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./public'))
);

gulp.task('default', () => {
    server.init({
        server:{
            baseDir: './public'
        }
    });

    watch('./dev/scss/**/*.scss', () => gulp.start('sass'));
    watch('./dev/js/**/*.js', () => gulp.start('es6',server.reload) );
    watch('./dev/pug/**/*.pug', () => gulp.start('pug', server.reload) );
});
