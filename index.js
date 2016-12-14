const express  = require( './express' ),
      electron = require( './electron' ),
      common   = require( './common' ),
      twitter  = require( './twitter' );

const socketIo = require( 'socket.io' ),
      io       = socketIo( express.server );

let client;

/***** Socket.io *****/

io.sockets.on( 'connection', function( socket ){
    
    client = twitter.getClient()
    
    const emit = function( key, content ){
        io.sockets.to( socket.id ).emit( key, content );
    };
    
    const emitError = function( content ){
        emit( 'error', content );
    };
    
    socket.on( 'getUserTweet', function( user_id ){
        client.getUserTweet( user_id ).then( function( tweet ){
            emit( 'userTweet', tweet );
        }, emitError );
    } );
    
    socket.on( 'getUserProfile', function( user_id ){
        client.getUserProfile( user_id ).then( function( profile ){
            emit( 'userProfile', profile );
        }, emitError );
    } );
    
} );

electron( express.port );