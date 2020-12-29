/**
 * @file index.js
 * @author liangxiaojun(fatalxiao@163.com)
 */

import {combineReducers} from 'redux';

// Reducers
import file from './FileReducer';
import toaster from './ToasterReducer';

export default () => combineReducers({
    file,
    toaster
});
