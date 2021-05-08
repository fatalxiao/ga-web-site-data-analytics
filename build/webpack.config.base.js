/**
 * @file webpack.config.base.js
 */

const os = require('os'),

    HappyPack = require('happypack'),

    config = require('./config.js'),
    {resolveRootPath, getAssetsSubPath} = require('./utils.js'),

    cssLoaderConfig = ['style-loader', {
        loader: 'css-loader',
        options: {
            importLoaders: 1
        }
    }, {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    'postcss-preset-env'
                ]
            }
        }
    }];

module.exports = {

    entry: {
        app: './src/index.js'
    },

    output: {
        path: config.production.assetsRoot,
        filename: '[name].js',
        publicPath: config.assetsPublicPath
    },

    resolve: {
        extensions: ['.js', '.scss'],
        alias: {

            'src': resolveRootPath('src'),
            'assets': resolveRootPath('src/assets'),
            'scss': resolveRootPath('src/assets/scss'),
            'components': resolveRootPath('src/components'),
            'containers': resolveRootPath('src/containers'),
            'statics': resolveRootPath('src/statics'),
            'hooks': resolveRootPath('src/hooks'),
            'vendors': resolveRootPath('src/vendors'),
            'reduxes': resolveRootPath('src/reduxes'),

            'test': resolveRootPath('test')

        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: 'happypack/loader?id=js',
            include: [resolveRootPath('src')]
        }, {
            test: /\.(png|jpe?g|gif|svg|cur|ico)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1000,
                name: getAssetsSubPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 1000,
                name: getAssetsSubPath('fonts/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.scss$/,
            use: [...cssLoaderConfig, {
                loader: 'sass-loader',
                options: {
                    sassOptions: {
                        includePaths: [resolveRootPath('src/assets')]
                    }
                }
            }]
        }, {
            test: /\.css$/,
            use: cssLoaderConfig
        }, {
            test: /\.md/,
            loader: 'js-markdown-loader',
            options: {
                fullInfo: true,
                dialect: 'DERBY'
            }
        }]
    },

    plugins: [
        new HappyPack({
            id: 'js',
            threadPool: HappyPack.ThreadPool({size: os.cpus().length}),
            loaders: ['babel-loader?cacheDirectory=true'],
            verbose: false
        })
    ]

};
