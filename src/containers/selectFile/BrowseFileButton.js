/**
 * @file BrowseFileButton.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {Fragment, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Components
import RaisedButton from 'alcedo-ui/RaisedButton';

// Vendors
import classNames from 'classnames';

// Styles
import 'scss/containers/selectFile/BrowseFileButton.scss';

const BrowseFileButton = ({
    className,
    updateFile,
    ...restProps
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
        <Fragment>

            <input ref={fileInput}
                   className="hidden-input"
                   type="file"
                   accept="text/csv"
                   onChange={handleFileChange}/>

            <RaisedButton {...restProps}
                          className={classNames('browse-file-button', {
                              [className]: className
                          })}
                          onClick={chooseFile}/>

        </Fragment>
    );

};

BrowseFileButton.propTypes = {

    className: PropTypes.string,

    updateFile: PropTypes.func

};

export default connect(null, dispatch => bindActionCreators({
    updateFile: actions.updateFile
}, dispatch))(BrowseFileButton);
