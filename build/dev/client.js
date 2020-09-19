require('eventsource-polyfill');

const config = require('../config.js');
if (config.development.isHotReload) {
    require('webpack-hot-middleware/client?noInfo=true');
}
