var gulp = require( 'gulp' );

gulp.task( 'icon-font', function() {
   gulp.src('./node_modules/bootstrap-sass/node_modules/oneui-icons/fonts/**/*.{ttf,woff,woff2,eot,svg}')
   .pipe(gulp.dest('./fonts'));
});