/**
 * @file UploadIcon.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';

// Icons
import CloudIcon from 'assets/icon/cloud.svg';
import ArrowUpIcon from 'assets/icon/arrow-up.svg';

// Styles
import 'scss/components/UploadIcon.scss';

const UploadIcon = () => (
    <div className="upload-icon">

        <img className="cloud"
             src={CloudIcon}/>

        <img src={ArrowUpIcon}/>

    </div>
);

export default UploadIcon;
