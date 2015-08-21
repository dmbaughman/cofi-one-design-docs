'use strict';

var gulp = require( 'gulp' );

gulp.task( 'fonts', function() {
   gulp.src('./node_modules/ui-framework/fonts/**/*.{ttf,woff,woff2,eot,svg}')
   .pipe(gulp.dest('./fonts'));
});
