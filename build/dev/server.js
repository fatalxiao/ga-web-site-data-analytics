const os = require('os'),
    chokidar = require('chokidar'),
    open = require('open'),
    webpack = require('webpack'),
    express = require('express'),
    history = require('connect-history-api-fallback'),
    webpackConfig = require('./webpack.config.dev.js'),

    config = require('../config.js'),

    port = process.env.PORT || config.development.port,
    uri = 'http://localhost:' + port,

    app = express(),
    compiler = webpack(webpackConfig),
    devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath
    });

os.platform() !== 'win32' && chokidar.watch('.');

app.use(history())
   .use(devMiddleware)
   .use(config.development.assetsVirtualRoot, express.static('./static'));

if (config.development.isHotReload) {

    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: false
    });

    compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {
        hotMiddleware.publish({action: 'reload'});
    });

    app.use(hotMiddleware);

}

devMiddleware.waitUntilValid(() => {
    console.log('DONE', `Listening At ${uri} `);
});

module.exports = app.listen(port, err => {

    if (err) {
        return console.error(err);
    }

    open(uri);

});
