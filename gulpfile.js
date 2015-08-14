'use strict';

var gulp        = require( 'gulp' );
var paths       = require( './gulp/strings' ).paths;
var requireDir  = require( 'require-dir' );
var tasks       = requireDir( './gulp/tasks' );
var connect     = require( 'gulp-connect' );

// Run server with livereload
gulp.task( 'serve', function() {
    connect.server({
        root: [__dirname],
        livereload: true
    });
});

// Watch for changes
gulp.task( 'watch', [ 'default', 'serve' ], function () {
    gulp.watch( paths.scripts, [ 'scripts' ]);
    gulp.watch( paths.sassAll, [ 'styles' ]);
    gulp.watch( paths.templatesAll, [ 'pages' ]);    
});

gulp.task( 'default', [ 'pages', 'styles', 'scripts' ] );
