/**
 * @file index.js
 * @author liangxiaojun(fatalxiao@163.com)
 */

import {createStore, applyMiddleware} from 'redux';
import createRootReducer from 'reduxes/reducers';
import thunk from 'redux-thunk';

export default () => createStore(
    createRootReducer(),
    applyMiddleware(
        thunk
    )
);
