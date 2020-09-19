const webpack = require('webpack'),
    AssetsPlugin = require('assets-webpack-plugin'),
    CompressionPlugin = require('compression-webpack-plugin'),

    config = require('../config.js'),
    utils = require('../utils.js'),

    env = process.env.NODE_ENV,
    library = '[name]_lib';

module.exports = {

    mode: 'production',

    entry: {
        'polyfill': ['@babel/polyfill']
    },

    output: {
        publicPath: './',
        path: config[env].assetsRoot,
        filename: utils.assetsSubPath('vendors/[name].[chunkhash].js', env),
        library
    },

    plugins: [

        // 排除moment的locale文件夹下的语言包
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new webpack.DllPlugin({
            context: __dirname,
            path: utils.assetsVendorsAbsolutePath('[name]-manifest.json', env),
            name: library
        }),

        new AssetsPlugin({
            path: config[env].assetsRoot,
            filename: utils.assetsSubPath('vendors/vendors-assets.json', env)
        }),

        new CompressionPlugin({
            test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
            filename: '[path][base].gz[query]'
        })

    ]

};
