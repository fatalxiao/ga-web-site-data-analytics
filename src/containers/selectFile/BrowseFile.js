/**
 * @file BrowseFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import RaisedButton from 'alcedo-ui/RaisedButton';

// Styles
import 'scss/containers/selectFile/BrowseFile.scss';

const BrowseFile = ({
    onSuccess, onFailure
}) => {

    const

        /**
         * file input ref
         * @type {React.MutableRefObject<undefined>}
         */
        fileInput = useRef(),

        /**
         * 选择文件
         */
        chooseFile = useCallback(() => fileInput?.current?.click?.(), [fileInput]),

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
                    return onFailure();
                }

                // 回调数据
                onSuccess?.(data);

            };
            reader.readAsText(file);

        }, [onSuccess, onFailure]);

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

        </div>
    );

};

BrowseFile.propTypes = {
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func
};

export default BrowseFile;
