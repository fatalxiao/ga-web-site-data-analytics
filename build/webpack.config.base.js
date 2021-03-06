const path = require('path'),

    HappyPack = require('happypack'),

    config = require('./config.js'),
    utils = require('./utils.js'),

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

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

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

            'src': resolve('src'),
            'assets': resolve('src/assets'),
            'scss': resolve('src/assets/scss'),
            'components': resolve('src/components'),
            'containers': resolve('src/containers'),
            'statics': resolve('src/statics'),
            'hooks': resolve('src/hooks'),
            'vendors': resolve('src/vendors'),
            'reduxes': resolve('src/reduxes'),

            'test': resolve('test')

        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: 'happypack/loader?id=js',
            include: [resolve('src')]
        }, {
            test: /\.(png|jpe?g|gif|svg|cur|ico)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 1000,
                name: utils.assetsSubPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 1000,
                name: utils.assetsSubPath('fonts/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.scss$/,
            use: [...cssLoaderConfig, {
                loader: 'fast-sass-loader',
                options: {
                    includePaths: ['./src/assets']
                }
            }]
        }, {
            test: /\.css$/,
            use: cssLoaderConfig
        }, {
            test: /\.md/,
            loader: 'js-markdown-loader',
            query: {
                fullInfo: true,
                dialect: 'DERBY'
            }
        }]
    },

    plugins: [
        new HappyPack({
            id: 'js',
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            threads: 4,
            verbose: false
        })
    ]

};
