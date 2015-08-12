var gulp        = require( 'gulp' ),
    paths       = require( '../../gulp/strings' ).paths,
    metalsmith  = require( 'gulp-metalsmith' ),
    msMarkdown  = require( 'metalsmith-markdown' ),
    msTemplates = require( 'metalsmith-templates' ),
    nunjucks    = require( 'nunjucks' );

nunjucks.configure( '../../templates', { watch: false });

// Build static site
gulp.task( 'pages', function () {
    gulp.src( paths.sourceAll )
        .pipe( metalsmith({
            root: __dirname,
            frontmatter: true,
            use: [
                msMarkdown(),
                msTemplates( 'nunjucks' )
            ]
        }))
        .pipe( gulp.dest( '../../build' ) );
    process.stdout.write( '\n' + __dirname + '\n' + paths.sourceAll + '\n\n' );
});
