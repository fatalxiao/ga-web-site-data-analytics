/**
 * @file DropFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Icons
import UploadIcon from 'components/UploadIcon';

// Vendors
import classNames from 'classnames';

// Styles
import 'scss/containers/selectFile/DropFile.scss';

const DropFile = ({
    children, className
}) => {
    return (
        <div className={classNames('drop-file', {
            [className]: className
        })}>

            <div className="drop-file-content">

                <UploadIcon/>
                <div className="drop-file-desc">GA CSV file</div>

                {children}

            </div>

        </div>
    );
};

DropFile.propTypes = {

    children: PropTypes.any,

    className: PropTypes.string

};

export default DropFile;
