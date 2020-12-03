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
    onGetFile
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
        handleFileChange = useCallback(e => onGetFile?.(e?.target?.files?.[0]), [onGetFile]);

    return (
        <div className="browse-file">

            <input ref={fileInput}
                   className="hidden-input"
                   type="file"
                   accept="text/csv"
                   onChange={handleFileChange}/>

            <RaisedButton className="browse-file-button"
                          value="browse file"
                          onClick={chooseFile}/>

        </div>
    );

};

BrowseFile.propTypes = {
    onGetFile: PropTypes.func
};

export default BrowseFile;
