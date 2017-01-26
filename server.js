var express  = require( 'express' ),
    path     = require( 'path' ),
    // jwt 	 = require( 'jsonwebtoken '),
    // exprJWT  = require( 'express-jwt'),
    bp       = require('body-parser'), 
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

var bp = require("body-parser");
app.use(bp.urlencoded({ extended: true }));
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
// app.use(exprJWT({ secret: 'sheldonSecretKey' }).unless({ path: ['/']}))
app.use( bp.json() );


// require the mongoose config file which does the rest for us
require("./server/config/mongoose.js");
var routes_setter = require("./server/config/routes.js");
// invoke the function stored in routes_setter and pass it hte app vaariable
routes_setter(app);

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});