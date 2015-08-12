'use strict';

var gulp            = require( 'gulp' );
var paths           = require( '../../gulp/strings' ).paths;
var sass            = require( 'gulp-sass' );
var autoprefixer    = require( 'gulp-autoprefixer' );
var connect         = require( 'gulp-connect' );

gulp.task( 'styles', function () {
    gulp.src( paths.sassMain )
        .pipe( sass( {
                includePaths: [ paths.nodeModules ]
            })
            .on( 'error', sass.logError ))
        .pipe( autoprefixer() )
        .pipe( gulp.dest( paths.css ))
        .pipe( connect.reload() );
});
