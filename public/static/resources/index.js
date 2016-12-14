socket.emit( 'getUserTweet', 'calmeryme' )

socket.on( 'userTweet', function( tweet ){
    
    for( var i=0; i<tweet.length; i++ )
        document.body.innerHTML += tweet[i].text + '<br><br>'
    
} )