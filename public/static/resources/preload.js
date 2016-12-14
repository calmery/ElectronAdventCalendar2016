var socket = io()

socket.on( 'error', function( error ){
    console.log( error )
} )