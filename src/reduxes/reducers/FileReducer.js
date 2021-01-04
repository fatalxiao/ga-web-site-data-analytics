/**
 * @file FileReducer.js
 */

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {

    /**
     * 原始文件
     */
    raw: null,

    /**
     * 解析后的文件
     *  {
     *      title {Array}
     *      tableData {Array}
     *      browseData {Array}
     *  }
     */
    data: null

};

function file(state = initialState, action) {
    switch (action.type) {

        /**
         * 更新文件
         */
        case actionTypes.UPDATE_FILE: {
            return {
                ...state,
                raw: action.file,
                data: action.data
            };
        }

        default:
            return state;

    }
}

export default file;
