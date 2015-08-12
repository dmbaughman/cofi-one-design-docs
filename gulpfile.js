'use strict';

// Modules
var gulp        = require( 'gulp' ),
    paths       = require( './gulp/strings' ).paths,
    requireDir  = require( 'require-dir' ),
    tasks       = requireDir( './gulp/tasks' ),
    nunjucks    = require( 'gulp-nunjucks-html' ),
    connect     = require( 'gulp-connect' );

gulp.task( 'html', function() {
    return gulp.src( paths.templatesAll )
    .pipe( nunjucks({
        searchPaths: [ paths.templatesDir ],
        setUp: function( env ) {
            env.addFilter( 'greet', function( name ) {
                return 'Hello ' + name;
            })
            return env;
        }
    }))
    .pipe( gulp.dest( __dirname ));
});

// Compile stylesheets and scripts
gulp.task( 'compile', [ 'html', 'styles', 'scripts', 'icon-font' ] );

// Run server with livereload
gulp.task( 'serve', function() {
    connect.server({
        root: [__dirname],
        livereload: true
    });
});

// Watch for changes
gulp.task( 'watch', function () {
    gulp.watch( paths.scripts, [ 'scripts' ]);
    gulp.watch( paths.sassAll, [ 'styles' ]);
    gulp.watch( paths.templatesAll, [ 'html' ]);    
});

gulp.task( 'default', [ 'compile', 'serve', 'watch' ] );
