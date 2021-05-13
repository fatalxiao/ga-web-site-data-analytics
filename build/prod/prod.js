const webpack = require('webpack'),
    startCase = require('lodash/startCase'),

    webpackConfig = require('./webpack.config.prod.js'),

    env = process.env.NODE_ENV;

console.log('WAIT', `Building ${startCase(env)} Package...`);

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

        console.log('DONE', `Build ${startCase(env)} Package complete`);

    } catch (e) {
        console.log('ERROR', e);
    }

});
