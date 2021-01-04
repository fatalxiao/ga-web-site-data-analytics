/**
 * @file index.js
 */

import {combineReducers} from 'redux';

// Reducers
import file from './FileReducer';
import toaster from './ToasterReducer';

export default () => combineReducers({
    file,
    toaster
});
