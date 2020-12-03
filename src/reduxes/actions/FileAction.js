/**
 * @file FileAction.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import * as actionTypes from 'reduxes/actionTypes';

export const updateData = data => dispatch => dispatch({
    type: actionTypes.UPDATE_FILE,
    data
});
