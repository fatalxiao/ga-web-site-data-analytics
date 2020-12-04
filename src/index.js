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
import {Provider} from 'react-redux';
import configureStore from 'reduxes/store';

// Styles
import 'assets/font-awesome/css/all.min.css';
import 'scss/index.scss';
import 'scss/global.scss';

const store = configureStore();

function renderAppContainer() {
    render(
        <Provider store={store}>
            <Root/>
        </Provider>,
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
    module.hot.accept('reduxes/store', renderAppContainer);
    module.hot.accept('reduxes/reducers', () => store.replaceReducer(require('reduxes/reducers')?.default));
    module.hot.accept('src/containers/Root.js', renderAppContainer);
}
