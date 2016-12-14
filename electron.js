const electron = require( 'electron' );

let app    = electron.app,
    window = electron.BrowserWindow;

module.exports = function( port ){

    app.on( 'ready', function(){

        let main = new window( {
            width: 800,
            height: 600,
            fullscreen: false,
            show: false,
            title: 'Lectern'
        } );

        main.loadURL( 'http://127.0.0.1:' + port );

        // Development tool
        main.webContents.openDevTools();

        app.on( 'window-all-closed', function(){
            app.quit();
        } );

        main.show();

    } );

};