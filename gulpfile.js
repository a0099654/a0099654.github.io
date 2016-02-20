var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var scsslint = require('gulp-scss-lint');

gulp.task('minifyjs', function(){
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('minjs'));    
});

gulp.task('style', function(){
    return sass('scss/**/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('css'));
});

gulp.task('scss-lint', function(){
    return gulp.src('scss/**/*.scss')
        .pipe(scsslint());
});

gulp.task('watch', function(){
    gulp.watch('js/*.js', ['minifyjs']);
    gulp.watch('scss/**/*.scss', ['style']);
});
  
gulp.task('default', ['minifyjs', 'style' , 'watch']);