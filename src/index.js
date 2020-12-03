/**
 * @file index.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

'use strict';

import '@babel/polyfill';
import React from 'react';

// Components
import Root from 'containers/Root';

// Vendors
import {render} from 'react-dom';

// Styles
import 'assets/font-awesome/css/fontawesome-all.min.css';
import 'scss/index.scss';
import 'scss/global.scss';

function renderAppContainer() {
    render(
        <Root/>,
        document.getElementById('app-container')
    );
}

/**
 * 渲染应用到dom
 */
renderAppContainer();

/**
 * 开发环境时，添加热替换监听
 */
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('src/containers/Root.js', renderAppContainer);
}
