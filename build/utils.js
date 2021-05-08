/**
 * @file utils.js
 */

const fs = require('fs'),
    path = require('path'),

    config = require('./config.js');

/**
 * 处理配置中的相对路径
 * @param p
 * @returns {string}
 */
function resolveRootPath(p) {
    return path.join(__dirname, '..', p);
}

/**
 * 处理 assets ( 默认 "dist" 目录 ) 下的路径
 * @param p
 * @param env
 * @returns {string}
 */
function getAssetsPath(p, env = 'production') {
    return path.posix.join(config[env].assetsDirectory, p);
}

/**
 * 处理 sub assets ( 默认 "dist/static" 目录 ) 下的路径
 * @param p
 * @returns {string}
 */
function getAssetsSubPath(p) {
    return path.posix.join(config.assetsSubDirectory, p);
}

/**
 * 处理存放 DllPlugin manifest.json 的据对路径
 * @param p
 * @param env
 * @returns {string}
 */
function getAssetsVendorsAbsolutePath(p, env = 'production') {
    return path.posix.join(config[env].assetsRoot, getAssetsSubPath(`vendors/${p}`));
}

/**
 * 同步检查文件是否存在
 * @param path
 * @returns {boolean}
 */
function fsExistsSync(path) {
    try {
        fs.accessSync(path, (fs.constants && fs.constants.F_OK) || fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * 递归拷贝文件
 * @param src
 * @param dist
 * @param excludes
 */
function copyRecursionSync(src, dist, excludes) {

    const paths = fs.readdirSync(src);

    for (let path of paths) {

        if (excludes && excludes.findIndex(item => path.includes(item)) > -1) {
            continue;
        }

        const srcPath = src + '/' + path,
            distPath = dist + '/' + path,

            stat = fs.statSync(srcPath);

        if (stat.isDirectory()) {

            if (!fsExistsSync(distPath)) {
                fs.mkdirSync(distPath);
            }

            copyRecursionSync(srcPath, distPath, excludes);

        } else {
            fs.copyFileSync(srcPath, distPath);
        }

    }

}

/**
 * 同步递归移除文件
 * @param p
 */
function rmRecursionSync(p) {

    const paths = fs.readdirSync(p);

    for (let path of paths) {

        const rmPath = p + '/' + path,
            stat = fs.statSync(rmPath);

        if (stat.isDirectory()) {
            rmRecursionSync(rmPath);
            if (fsExistsSync(rmPath)) {
                fs.rmdirSync(rmPath);
            }
        } else {
            if (fsExistsSync(rmPath)) {
                fs.unlinkSync(rmPath);
            }
        }

    }

    if (fsExistsSync(p)) {
        fs.rmdirSync(p);
    }

}

exports.resolveRootPath = resolveRootPath;
exports.getAssetsPath = getAssetsPath;
exports.getAssetsSubPath = getAssetsSubPath;
exports.getAssetsVendorsAbsolutePath = getAssetsVendorsAbsolutePath;
exports.fsExistsSync = fsExistsSync;
exports.copyRecursionSync = copyRecursionSync;
exports.rmRecursionSync = rmRecursionSync;
