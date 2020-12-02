/**
 * @file DropFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

// Components

// Styles
import 'scss/containers/selectFile/DropFile.scss';

const DropFile = ({
    onSuccess, onFailure
}) => {

    return (
        <div className="drop-file">

        </div>
    );

};

DropFile.propTypes = {
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func
};

export default DropFile;
