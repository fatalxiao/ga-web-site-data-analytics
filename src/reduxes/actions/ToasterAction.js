/**
 * @file ToasterAction.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import * as actionTypes from 'reduxes/actionTypes';

// Statics
import MsgType from 'alcedo-ui/_statics/MsgType';

/**
 * 添加 Toaste
 * @param toaste
 * @returns {Function}
 */
export const addToaste = toaste => dispatch => {
    dispatch({
        type: actionTypes.ADD_TOASTE,
        toaste
    });
};

/**
 * 添加 Success Toaste
 * @param message
 * @returns {Function}
 */
export const addSuccessToaste = message => dispatch => {
    dispatch({
        type: actionTypes.ADD_TOASTE,
        toaste: {
            title: '',
            message,
            type: MsgType.SUCCESS
        }
    });
};

/**
 * 添加 Error Toaste
 * @param message
 * @returns {Function}
 */
export const addErrorToaste = message => dispatch => {
    dispatch({
        type: actionTypes.ADD_TOASTE,
        toaste: {
            title: '',
            message,
            type: MsgType.ERROR
        }
    });
};


/**
 * 更新 Toastes
 * @param toastes
 * @returns {Function}
 */
export const updateToastes = toastes => dispatch => {
    dispatch({
        type: actionTypes.UPDATE_TOASTES,
        toastes
    });
};

/**
 * 清空 Toastes
 * @returns {Function}
 */
export const clearToastes = () => dispatch => {
    dispatch({
        type: actionTypes.CLEAR_TOASTES
    });
};
