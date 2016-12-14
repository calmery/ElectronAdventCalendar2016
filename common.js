const path = require( 'path' ),
      fs   = require( 'fs' );

const jsYaml = require( 'js-yaml' );

module.exports = {
    
    // Twitter API Token
    consumerKey: 'CONSUMER_KEY',
    consumerKeySecret: 'CONSUMER_KEY_SECRET',
    
    getAbsolutePath: function(){
        return path.resolve( path.join.apply( this, [].slice.call( arguments ) ) );
    },
    
    yamlLoader: function( path ){
        return jsYaml.safeLoad( fs.readFileSync( this.getAbsolutePath( __dirname, path ), 'utf8' ) );
    },
    
    writeFileSync: function( filePath, content ){
        try {
            fs.writeFileSync( this.getAbsolutePath( filePath ), content );
            return true;
        } catch( error ){
            return false;
        }
    },
    
    exists: function( filePath ){
        try {
            fs.statSync( this.getAbsolutePath( filePath ) );
            return true;
        } catch( error ){
            return false;
        }
    },
    
    jsYaml: jsYaml
    
};