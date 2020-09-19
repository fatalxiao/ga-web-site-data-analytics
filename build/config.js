const path = require('path');

module.exports = {

    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    productionGzipExtensions: ['js', 'css'],

    'development': {
        port: 4010,
        srcRoot: path.resolve(__dirname, '../src'),
        index: path.resolve(__dirname, '../src/index.html'),
        assetsVirtualRoot: path.posix && path.posix.join('/', 'static')
    },

    'production': {
        port: 4400,
        index: path.resolve(__dirname, '../docs/index.html'),
        assetsRoot: path.resolve(__dirname, '../docs')
    }

};
