var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('minifyjs', function(){
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('minjs'));    
});

gulp.task('watch', function(){
    gulp.watch('js/*.js', ['minifyjs']);
});

gulp.task('default', ['minifyjs', 'watch']);