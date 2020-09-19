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
import 'scss/index.scss';
import 'scss/global.scss';

/**
 * 渲染应用到dom
 */
render(
    <Root/>,
    document.getElementById('app-container')
);
