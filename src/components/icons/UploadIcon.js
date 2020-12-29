/**
 * @file UploadIcon.js
 * @author liangxiaojun(fatalxiao@163.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Vendors
import classNames from 'classnames';

// Styles
import './UploadIcon.scss';

const UploadIcon = ({className, ...restProps}) => (
    <div {...restProps}
         className={classNames('upload-icon', {
             [className]: className
         })}>
        <i className="fal fa-cloud cloud-icon"></i>
        <i className="fal fa-long-arrow-up arrow-up-icon"></i>
    </div>
);

UploadIcon.propTypes = {
    className: PropTypes.string
};

export default UploadIcon;
