const express = require('express'),
    history = require('connect-history-api-fallback'),
    open = require('open'),

    config = require('../config.js'),

    env = process.env.NODE_ENV,
    app = express(),
    port = config[env].port,
    uri = 'http://localhost:' + port;

app.use(history())
   .use(express.static(config[env].assetsRoot, {
       setHeaders: (res, path) => {
           res.setHeader('Cache-Control', path.endsWith('index.html') ?
               'no-cache, no-store, no_store, max-age=0, must-revalidate' : 'max-age=315360000'
           );
       }
   }))
   .listen(port, err => {

       if (err) {
           console.log(err);
           return;
       }

       console.log('> Listening at ' + uri);

       open(uri);

   });
