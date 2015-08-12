'use strict';

var gulp        = require( 'gulp' );
var paths       = require( '../../gulp/strings' ).paths;
var nunjucks    = require( 'gulp-nunjucks-html' );
var connect     = require( 'gulp-connect' );

gulp.task( 'pages', function() {
    return gulp.src( paths.templatesContent )
    .pipe( nunjucks({
        searchPaths: [ paths.templatesDir ],
        setUp: function( env ) {
            // Example of how to add filter
            env.addFilter( 'greet', function( name ) {
                return 'Hello ' + name;
            });
            return env;
        }
    }))
    .pipe( gulp.dest( paths.root ))
    .pipe( connect.reload() );
});
