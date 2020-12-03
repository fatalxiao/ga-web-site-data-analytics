/**
 * @file index.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import {createStore} from 'redux';
import createRootReducer from 'reduxes/reducers';

export default () => createStore(createRootReducer());
