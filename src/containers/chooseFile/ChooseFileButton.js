/**
 * @file ChooseFileButton.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {Fragment, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import RaisedButton from 'alcedo-ui/RaisedButton';

// Styles
import 'scss/containers/chooseFile/ChooseFileButton.scss';

const ChooseFileButton = ({onDataChange}) => {

    const fileInput = useRef(),

        /**
         * 选择文件
         */
        chooseFile = useCallback(() => fileInput?.current?.click(), [fileInput]),

        /**
         * 处理文件变更
         */
        handleFileChange = useCallback(e => {

            const file = e?.target?.files?.[0];
            console.log(file);



            onDataChange?.(file);

        });

    return (
        <Fragment>

            <input ref={fileInput}
                   className="hidden-input"
                   type="file"
                   accept="text/csv"
                   onChange={handleFileChange}/>

            <RaisedButton className="choose-file-button"
                          value="Choose File"
                          onClick={chooseFile}/>

        </Fragment>
    );

};

ChooseFileButton.propTypes = {
    onDataChange: PropTypes.func
};

export default ChooseFileButton;
