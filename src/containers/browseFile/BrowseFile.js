/**
 * @file BrowseFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useState, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import RaisedButton from 'alcedo-ui/RaisedButton';

// Styles
import 'scss/containers/browseFile/BrowseFile.scss';

const BrowseFile = ({onDataChange}) => {

    const fileInput = useRef(),

        [errMsg, setErrMsg] = useState(''),

        /**
         * 选择文件
         */
        chooseFile = useCallback(() => fileInput?.current?.click(), [fileInput]),

        /**
         * 处理文件变更
         */
        handleFileChange = useCallback(e => {

            const file = e?.target?.files?.[0],
                reader = new FileReader();

            reader.onloadend = e => {

                // 解析文件，分段
                const data = e?.target?.result?.split?.('\n\n');

                // 处理解析失败
                if (!data || data.length < 1) {
                    return setErrMsg('Read file failure, please retry.');
                }

                // 回调数据
                onDataChange?.({
                    title: data[0].split('\n'),
                    tableData: data[1].split('\n'),
                    browseData: data[2].split('\n')
                });

            };
            reader.readAsText(file);

        });

    return (
        <div className="browse-file">

            <input ref={fileInput}
                   className="hidden-input"
                   type="file"
                   accept="text/csv"
                   onChange={handleFileChange}/>

            <RaisedButton theme={RaisedButton.Theme.HIGHLIGHT}
                          className="browse-file-button"
                          value="Browse File"
                          onClick={chooseFile}/>

            <div className="err-msg">{errMsg}</div>

        </div>
    );

};

BrowseFile.propTypes = {
    onDataChange: PropTypes.func
};

export default BrowseFile;
