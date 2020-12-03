/**
 * @file BrowseFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import RaisedButton from 'alcedo-ui/RaisedButton';

// Styles
import 'scss/containers/selectFile/BrowseFile.scss';

const BrowseFile = ({
    updateFile
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
        handleFileChange = useCallback(e => updateFile?.(e?.target?.files?.[0]), [updateFile]);

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
    updateFile: PropTypes.func
};

export default connect(null, dispatch => bindActionCreators({
    updateFile: actions.updateFile
}, dispatch))(BrowseFile);
