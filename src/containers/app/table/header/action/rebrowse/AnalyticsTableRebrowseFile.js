/**
 * @file AnalyticsTableRebrowseFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';

// Components
import ActionButton from '../AnalyticsTableActionButton';
import BrowseFileButton from 'containers/selectFile/BrowseFileButton';
import UploadIcon from 'components/UploadIcon';

// Styles
import 'scss/containers/app/table/header/action/rebrowse/AnalyticsTableRebrowseFile.scss';

const AnalyticsTableRebrowseFile = () => {
    return (
        <ActionButton tipContent="Rebrowse File"/>
    );
};

export default AnalyticsTableRebrowseFile;
