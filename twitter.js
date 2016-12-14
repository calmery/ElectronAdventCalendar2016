const twitter = require( 'twitter' );

const common = require( './common' );

const makeOption = function( condition ){
    let option = {};
    if( typeof( condition ) === 'number' )
        option.user_id = condition;
    else
        option.screen_name = condition;
    return option;
};

/***** Export client *****/

module.exports.getClient = function(){

    const config = common.yamlLoader( 'user.yaml' );

    const client = new twitter( {
        consumer_key       : common.consumerKey,
        consumer_secret    : common.consumerKeySecret,
        access_token_key   : config.access_token,
        access_token_secret: config.access_token_secret
    } );

    return {

        getUserTweet: function( condition ){
            return new Promise( function( resolve, reject ){
                client.get( 'statuses/user_timeline', makeOption( condition ), function( error, tweet, response ){
                    if( error === null ) 
                        resolve( tweet );
                    else 
                        reject( error );
                } );
            } );
        },

        getUserProfile: function( condition ){
            return new Promise( function( resolve, reject ){
                client.get( 'users/show', makeOption( condition ), function( error, profile, response ){
                    if( error === null ) 
                        resolve( profile );
                    else 
                        reject( error );
                } );
            } );
        },

        search: function( query, count ){
            return new Promise( function( resolve, reject ){
                client.get( 'search/tweets', {
                    q: query,
                    count: count
                }, function( error, tweet, response ){
                    if( error === null ) 
                        resolve( tweet );
                    else 
                        reject( error );
                } );
            } );
        }

    };

};