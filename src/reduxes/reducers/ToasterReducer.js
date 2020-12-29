/**
 * @file ToasterReducer.js
 * @author liangxiaojun(fatalxiao@163.com)
 */

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    toastes: []
};

function toaster(state = initialState, action) {
    switch (action.type) {

        /**
         * 添加 toast
         */
        case actionTypes.ADD_TOASTE: {

            if (!action.toaste) {
                return state;
            }

            const toastes = state.toastes.slice();
            toastes.push(action.toaste);

            return {
                toastes
            };

        }

        /**
         * 更新 toasts
         */
        case actionTypes.UPDATE_TOASTES: {
            return {
                toastes: action.toastes
            };
        }

        /**
         * 清除 toasts
         */
        case actionTypes.CLEAR_TOASTES: {
            return {
                toastes: []
            };
        }

        default:
            return state;

    }
}

export default toaster;
