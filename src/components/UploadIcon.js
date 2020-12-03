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
        <ArrowUpIcon/>
    </div>
);

export default UploadIcon;
