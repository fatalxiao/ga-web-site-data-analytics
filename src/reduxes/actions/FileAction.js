/**
 * @file FileAction.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import * as actionTypes from 'reduxes/actionTypes';

// Actions
import {addErrorToaste} from './ToasterAction';

/**
 * 解析文件
 * @param file
 * @returns {Promise<any>}
 */
export const parseFile = file => new Promise((resolve, reject) => {

    if (!file) {
        return reject('No file found!');
    }

    try {

        const reader = new FileReader();

        reader.onloadend = e => {

            const raw = e?.target?.result;

            if (!raw) {
                return reject('Empty file!');
            }

            // 解析文件，分段
            const data = raw.split?.('\n\n');

            // 处理解析失败
            if (!data || data.length < 3) {
                return reject('Wrong file format!');
            }

            // 回调数据
            resolve({
                title: data[0].split('\n'),
                tableData: data[1].split('\n'),
                browseData: data[2].split('\n')
            });

        };

        reader.readAsText(file);

    } catch (e) {
        reject('Read file failure!');
    }

});

/**
 * 更新文件
 * @param file
 * @returns {function(*): *}
 */
export const updateFile = file => async dispatch => {
    try {

        const data = await parseFile(file);

        if (data) {
            dispatch({
                type: actionTypes.UPDATE_FILE,
                file,
                data
            });
        }

    } catch (errMsg) {
        addErrorToaste(errMsg)(dispatch);
    }
};
