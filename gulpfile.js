var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('minifyjs', function(){
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('minjs'));    
});

gulp.task('default', function(){
    
});