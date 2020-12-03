/**
 * @file FileAction.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import * as actionTypes from 'reduxes/actionTypes';

/**
 * 解析文件
 * @param file
 * @returns {Promise<any>}
 */
export function parseFile(file) {
    return new Promise((resolve, reject) => {

        if (!file) {
            return reject();
        }

        const reader = new FileReader();

        reader.onloadend = e => {

            // 解析文件，分段
            const data = e?.target?.result?.split?.('\n\n');

            // 处理解析失败
            if (!data || data.length < 1) {
                return reject();
            }

            // 回调数据
            resolve({
                title: data[0].split('\n'),
                tableData: data[1].split('\n'),
                browseData: data[2].split('\n')
            });

        };

        reader.readAsText(file);

    });
}

/**
 * 更新文件
 * @param file
 * @returns {function(*): *}
 */
export const updateFile = file => async dispatch => dispatch({
    type: actionTypes.UPDATE_FILE,
    file,
    data: await parseFile(file)
});
