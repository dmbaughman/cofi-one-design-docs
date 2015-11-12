'use strict';

var gulp = require( 'gulp' );

gulp.task( 'images', function() {
   gulp.src('./src/img/**/*')
   .pipe(gulp.dest('./img'));
});
