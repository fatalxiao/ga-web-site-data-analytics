/**
 * @file SelectFile.js
 * @author liangxiaojun(fatalxiao@163.com)
 */

import React from 'react';

// Components
import DropZone from 'components/file/DropZone';
import BrowseFileButton from '../../components/file/BrowseFileButton';

// Styles
import './SelectFile.scss';

const SelectFile = () => (
    <DropZone className="select-file">
        <div className="select-file-desc">Drag and drop your file here or</div>
        <BrowseFileButton value="browse file"/>
    </DropZone>
);

export default SelectFile;
