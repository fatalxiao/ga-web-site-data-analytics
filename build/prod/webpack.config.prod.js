const path = require('path'),
    webpack = require('webpack'),
    {merge} = require('webpack-merge'),
    CopyPlugin = require('copy-webpack-plugin'),
    HtmlPlugin = require('html-webpack-plugin'),
    HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin'),
    CompressionPlugin = require('compression-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,

    config = require('../config.js'),
    baseWebpackConfig = require('../webpack.config.base.js'),
    utils = require('../utils.js'),

    env = process.env.NODE_ENV,
    vendorsAssets = require(utils.assetsVendorsAbsolutePath('vendors-assets.json', env));

const prodConfig = {

    mode: 'production',

    devtool: false,

    output: {
        path: config[env].assetsRoot,
        filename: utils.assetsSubPath('js/[name].[chunkhash].js', env),
        chunkFilename: utils.assetsSubPath('js/[id].[chunkhash].js', env)
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
            manifest: require(utils.assetsVendorsAbsolutePath('polyfill-manifest.json', env))
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
        }),

        new CompressionPlugin({
            test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
            filename: '[path][base].gz[query]'
        })

    ]

};

if (env === 'analyzer') {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, prodConfig);
