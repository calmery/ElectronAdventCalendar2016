const express         = require( 'express' ),
      http            = require( 'http' ),
      passport        = require( 'passport' ),
      twitterStrategy = require( 'passport-twitter' ),
      session         = require( 'express-session' );

const common = require( './common' );

const app    = express(),
      server = http.Server( app );

app.use( passport.initialize() );
app.use( passport.session() );
app.use( session( { secret: 'lectern' } ) );
app.use( express.static( common.getAbsolutePath( __dirname, 'public/static' ) ) );

passport.serializeUser( ( user, done ) => done( null, user ) );
passport.deserializeUser( ( user, done ) => done( null, user ) );

/***** Routing *****/

let routes = {
    
    '/': function( request, response ){
        if( common.exists( 'user.yaml' ) ) 
            response.sendFile( common.getAbsolutePath( 'public/index.html' ) );
        else 
            response.redirect( '/oauth' );
    },
    
    '/fail': function( request, response ){
        response.sendFile( common.getAbsolutePath( 'public/fail.html' ) );
    },
    
    '/oauth': passport.authenticate( 'twitter' ),
    '/callback': passport.authenticate( 'twitter', { 
        successRedirect: '/',
        failureRedirect: '/fail' 
    } )
    
}

for( var route in routes )
    app.get( route, routes[route] );

/***** Run *****/

const port = server.listen().address().port;
console.log( 'Running app on 127.0.0.1:' + port );

/***** Twitter Oauth *****/

passport.use( new twitterStrategy.Strategy( {
    consumerKey   : common.consumerKey,
    consumerSecret: common.consumerKeySecret,
    callbackURL   : 'http://127.0.0.1:' + port + '/callback'
}, function( token, tokenSecret, profile, done ){
    common.writeFileSync( 'user.yaml', common.jsYaml.safeDump( {
        access_token: token,
        access_token_secret: tokenSecret
    } ) );
    process.nextTick( function(){
        return done( null, profile );
    } );
} ) );

/***** Export *****/

module.exports = {
    port: port,
    server: server
};