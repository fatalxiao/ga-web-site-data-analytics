/**
 * @file DropFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';

// Icons
import UploadIcon from 'components/UploadIcon';

// Styles
import 'scss/containers/selectFile/DropFile.scss';

const DropFile = () => (
    <div className="drop-file">
        <UploadIcon/>
        <div>Drag and Drop file</div>
    </div>
);

export default DropFile;
