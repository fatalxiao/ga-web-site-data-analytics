/**
 * @file UploadIcon.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';

// Icons
import CloudIcon from './CloudIcon';
import ArrowUpIcon from './ArrowUpIcon';

// Styles
import 'scss/components/UploadIcon.scss';

const UploadIcon = () => (
    <div className="upload-icon">
        <CloudIcon/>
        <div className="arrow-up-icon-wrapper">
            <ArrowUpIcon/>
        </div>
    </div>
);

export default UploadIcon;
