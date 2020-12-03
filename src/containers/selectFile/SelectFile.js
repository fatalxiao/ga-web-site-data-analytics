/**
 * @file SelectFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import DropZone from './DropZone';
import BrowseFile from './BrowseFile';

// Styles
import 'scss/containers/selectFile/SelectFile.scss';

const SelectFile = ({onDataChange}) => {

    const

        /**
         * 错误消息 state
         * @type {React.MutableRefObject<undefined>}
         */
        [errMsg, setErrMsg] = useState(''),

        /**
         * 成功解析文件后上报
         * @type {function(*): *}
         */
        handleSuccess = useCallback(data => onDataChange?.({
            title: data[0].split('\n'),
            tableData: data[1].split('\n'),
            browseData: data[2].split('\n')
        }), [onDataChange]),

        /**
         * 获取或解析文件失败后报错
         * @type {function(): void}
         */
        handleFailure = useCallback(() => setErrMsg('Read file failure, please retry.'), [setErrMsg]),

        /**
         * 解析文件
         * @type {Function}
         */
        parseFile = useCallback(file => {

            const reader = new FileReader();

            reader.onloadend = e => {

                // 解析文件，分段
                const data = e?.target?.result?.split?.('\n\n');

                // 处理解析失败
                if (!data || data.length < 1) {
                    return handleFailure();
                }

                // 回调数据
                handleSuccess?.(data);

            };
            reader.readAsText(file);

        }, [handleSuccess, handleFailure]);

    return (
        <DropZone className="select-file"
                  onGetFile={parseFile}>

            <div className="select-file-desc">Drag and drop your file here or</div>

            <BrowseFile onGetFile={parseFile}/>

            <div className="err-msg">{errMsg}</div>

        </DropZone>
    );

};

SelectFile.propTypes = {
    onDataChange: PropTypes.func
};

export default SelectFile;
