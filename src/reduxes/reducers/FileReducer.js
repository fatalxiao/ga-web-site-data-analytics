/**
 * @file FileReducer.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    data: null
};

function file(state = initialState, action) {
    switch (action.type) {

        case actionTypes.UPDATE_FILE: {
            return {
                ...state,
                data: action.data
            };
        }

        default:
            return state;

    }
}

export default file;
