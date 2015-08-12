'use strict';

// Imports
var gulp        = require( 'gulp' ),
    paths       = require( '../../gulp/strings' ).paths,
    browserify  = require( 'browserify' ),
    source      = require( 'vinyl-source-stream' ),
    buffer      = require( 'vinyl-buffer' ),
    globby      = require( 'globby' ),
    through     = require( 'through2' ),
    gutil       = require( 'gulp-util' ),
    uglify      = require( 'gulp-uglify' ),
    sourcemaps  = require( 'gulp-sourcemaps' ),
    connect     = require( 'gulp-connect' );

// Compile scripts
gulp.task( 'scripts', function () {
  // gulp expects tasks to return a stream, so we create one here.
  var bundledStream = through();

  bundledStream
    // turns the output bundle stream into a stream containing
    // the normal attributes gulp plugins expect.
    .pipe(source('app.js'))
    // the rest of the gulp task, as you would normally write it.
    // here we're copying from the Browserify + Uglify2 recipe.
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      // Add gulp plugins to the pipeline here.
      .pipe( uglify() )
      .on( 'error', gutil.log )
    .pipe( sourcemaps.write( './' ))
    .pipe( gulp.dest( paths.js ))
    .pipe( connect.reload() );

  // "globby" replaces the normal "gulp.src" as Browserify
  // creates it's own readable stream.
  globby([ paths.scriptsMain ], function( err, entries ) {
    // ensure any errors from globby are handled
    if ( err ) {
      bundledStream.emit( 'error', err );
      return;
    }

    // create the Browserify instance.
    var b = browserify({
      entries: entries,
      debug: true
    });

    // pipe the Browserify stream into the stream we created earlier
    // this starts our gulp pipeline.
    b.bundle().pipe(bundledStream);
  });

  // finally, we return the stream, so gulp knows when this task is done.
  return bundledStream;
});