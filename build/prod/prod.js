const fs = require('fs'),
    webpack = require('webpack'),
    archiver = require('archiver'),
    crypto = require('crypto'),
    startCase = require('lodash/startCase'),
    log = require('friendly-errors-webpack-plugin/src/output'),

    webpackConfig = require('./webpack.config.prod.js'),
    {fsExistsSync, rmRecursionSync} = require('../utils.js'),

    env = process.env.NODE_ENV,
    name = 'ga-web-site-data-analytics',
    path = `./${name}`,
    zipPath = `./${name}.zip`;

function finish(achivePath) {

    // remove temp dir
    if (fsExistsSync(path)) {
        rmRecursionSync(path);
    }

    // calculate SHA-256 Hash
    const rs = fs.createReadStream(achivePath),
        hash = crypto.createHash('sha256');

    rs.on('data', hash.update.bind(hash));
    rs.on('end', () => {
        log.title('success', 'DONE', [
            `Build ${startCase(env)} Package complete`,
            // `Archive: ${archive.pointer()} total bytes`,
            `SHA-256 Hash: ${hash.digest('hex')}`
        ].join('\n       '));
    });

}

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

        if (env === 'analyzer') {
            return;
        }

        // remove zip file
        if (fsExistsSync(zipPath)) {
            fs.unlinkSync(zipPath);
        }

        // remove temp dir
        if (fsExistsSync(path)) {
            rmRecursionSync(path);
        }

        // make temp dir
        fs.mkdirSync(path);

        // 打 zip 包
        const output = fs.createWriteStream(zipPath),
            archive = archiver('zip', {zlib: {level: 9}});

        output.on('close', () => finish(zipPath));
        archive.pipe(output);
        archive.directory(path, false);
        archive.finalize();

    } catch (e) {
        log.title('error', 'ERROR', e);
    }

});
