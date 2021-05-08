const webpack = require('webpack'),
    AssetsPlugin = require('assets-webpack-plugin'),

    config = require('../config.js'),
    {getAssetsSubPath, getAssetsVendorsAbsolutePath} = require('../utils.js'),

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
        filename: getAssetsSubPath('vendors/[name].[chunkhash].js', env),
        library
    },

    plugins: [

        // 排除moment的locale文件夹下的语言包
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new webpack.DllPlugin({
            context: __dirname,
            path: getAssetsVendorsAbsolutePath('[name]-manifest.json', env),
            name: library
        }),

        new AssetsPlugin({
            path: config[env].assetsRoot,
            filename: getAssetsSubPath('vendors/vendors-assets.json', env)
        })

    ]

};
