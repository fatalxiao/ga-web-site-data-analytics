/**
 * @file SelectFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';

// Components
import DropZone from './DropZone';
import BrowseFileButton from './BrowseFileButton';

// Styles
import 'scss/containers/selectFile/SelectFile.scss';

const SelectFile = () => (
    <DropZone className="select-file">
        <div className="select-file-desc">Drag and drop your file here or</div>
        <BrowseFileButton value="browse file"/>
    </DropZone>
);

export default SelectFile;
