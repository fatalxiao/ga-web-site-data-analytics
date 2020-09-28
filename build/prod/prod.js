const webpack = require('webpack'),
    startCase = require('lodash/startCase'),
    log = require('friendly-errors-webpack-plugin/src/output'),

    webpackConfig = require('./webpack.config.prod.js'),

    env = process.env.NODE_ENV;

log.title('info', 'WAIT', `Building ${startCase(env)} Package...`);

webpack(webpackConfig, async (err, stats) => {

    if (err) {
        throw err;
    }

    try {

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        log.title('success', 'DONE', `Build ${startCase(env)} Package complete`);

    } catch (e) {
        log.title('error', 'ERROR', e);
    }

});
