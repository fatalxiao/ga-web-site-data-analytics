/**
 * @file index.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
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
