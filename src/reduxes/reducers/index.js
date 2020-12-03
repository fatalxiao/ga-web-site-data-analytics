/**
 * @file index.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 *
 * redux reducers index 文件
 */

import {combineReducers} from 'redux';

// Reducers
import file from './FileReducer';

export default () => combineReducers({
    file
});
