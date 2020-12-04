/**
 * @file UploadIcon.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Icons
import CloudIcon from './CloudIcon';
import ArrowUpIcon from './ArrowUpIcon';

// Vendors
import classNames from 'classnames';

// Styles
import 'scss/components/UploadIcon.scss';

const UploadIcon = ({className, ...restProps}) => (
    <div {...restProps}
         className={classNames('upload-icon', {
             [className]: className
         })}>
        <CloudIcon/>
        <div className="arrow-up-icon-wrapper">
            <ArrowUpIcon/>
        </div>
    </div>
);

UploadIcon.propTypes = {
    className: PropTypes.string
};

export default UploadIcon;
