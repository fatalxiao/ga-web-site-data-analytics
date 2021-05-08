const path = require('path'),
    webpack = require('webpack'),
    {merge} = require('webpack-merge'),
    CopyPlugin = require('copy-webpack-plugin'),
    HtmlPlugin = require('html-webpack-plugin'),
    HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,

    config = require('../config.js'),
    baseWebpackConfig = require('../webpack.config.base.js'),
    {getAssetsSubPath, getAssetsVendorsAbsolutePath} = require('../utils.js'),

    env = process.env.NODE_ENV,
    vendorsAssets = require(getAssetsVendorsAbsolutePath('vendors-assets.json', env));

const prodConfig = {

    mode: 'production',

    devtool: false,

    output: {
        publicPath: './',
        path: config[env].assetsRoot,
        filename: getAssetsSubPath('js/[name].[chunkhash].js', env),
        chunkFilename: getAssetsSubPath('js/[id].[chunkhash].js', env)
    },

    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                nodeModules: {
                    name: 'nodeModules',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all'
                }
            }
        }
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),

        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../../static'),
                to: config.assetsSubDirectory
            }]
        }),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(getAssetsVendorsAbsolutePath('polyfill-manifest.json', env))
        }),

        new HtmlPlugin({
            filename: config[env].index,
            template: './src/index.html',
            inject: true,
            NODE_ENV: env,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),

        new HtmlWebpackTagsPlugin({
            tags: [
                vendorsAssets['polyfill'].js
            ],
            append: false
        })

    ]

};

if (env === 'analyzer') {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, prodConfig);
