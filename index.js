var metalsmith = require( 'metalsmith' );
var markdown   = require( 'metalsmith-markdown' );
var templates  = require( 'metalsmith-templates' ); 
var basename   = require( 'path' ).basename;
var dirname    = require( 'path' ).dirname;
var extname    = require( 'path' ).extname;
var jade       = require( 'jade' );
var exec       = require( 'child_process' ).exec

metalsmith( './examples/basics/' )
  .use( markdown() )
  // .use( function(files, metalsmith, done) {
  //   for(var filename in files) {
  //     var file = files[filename];
  //     var data = file;
  //     var ext = extname(filename);
  //     var html = basename(filename, ext) + '.html';

  //     if(ext == '.jade') {
  //       var contents = jade.renderFile('./examples/basics/src/' + filename, {
  //         basedir: './examples/basics/src/'
  //       });
  //       data.contents = new Buffer(contents);

  //       delete files[filename];
  //       files[html] = data;
  //     }
  //   }

  //   done();
  //  })
  .use( templates( {
    engine: 'jade',
    basedir: './examples/basics/src',
    compileDebug: true
  } ) )
  .build(function() {
    var pdf = exec( 'wkhtmltopdf ./examples/basics/build/document.html ./examples/basics/document.pdf' );
  });

