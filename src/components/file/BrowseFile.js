/**
 * @file BrowseFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useState, useCallback, forwardRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

const BrowseFile = forwardRef(({
    className,
    updateFile,
    ...restProps
}, ref) => {

    const

        /**
         * input 的 key，每次 onChange 时更新 key，使得 file input 重绘
         */
        [inputKey, setInputKey] = useState(1),

        /**
         * 处理文件变更
         */
        handleFileChange = useCallback(e => {
            updateFile?.(e?.target?.files?.[0]);
            setInputKey(inputKey + 1);
        }, [inputKey, updateFile]);

    return (
        <input key={inputKey}
               ref={ref}
               className="hidden-input"
               type="file"
               accept="text/csv"
               onChange={handleFileChange}/>
    );

});

BrowseFile.propTypes = {

    className: PropTypes.string,

    updateFile: PropTypes.func

};

export default connect(null, dispatch => bindActionCreators({
    updateFile: actions.updateFile
}, dispatch), null, {forwardRef: true})(BrowseFile);
