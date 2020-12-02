/**
 * @file SelectFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import DropFile from './DropFile';
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

        handleSuccess = useCallback(data => onDataChange?.({
            title: data[0].split('\n'),
            tableData: data[1].split('\n'),
            browseData: data[2].split('\n')
        }), [onDataChange]),

        handleFailure = useCallback(() => setErrMsg('Read file failure, please retry.'), [setErrMsg]);

    return (
        <div className="select-file">

            <DropFile onSuccess={handleSuccess}
                      onFailure={handleFailure}/>

            <BrowseFile onSuccess={handleSuccess}
                        onFailure={handleFailure}/>

            <div className="err-msg">{errMsg}</div>

        </div>
    );

};

SelectFile.propTypes = {
    onDataChange: PropTypes.func
};

export default SelectFile;
