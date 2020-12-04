/**
 * @file AnalyticsTableRebrowseFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';

// Components
import TipProvider from 'alcedo-ui/TipProvider';
import BrowseFileButton from 'containers/selectFile/BrowseFileButton';

// Styles
import 'scss/containers/app/table/header/action/rebrowse/AnalyticsTableRebrowseFile.scss';

const AnalyticsTableRebrowseFile = () => {
    return (
        <TipProvider tipContent="Rebrowse File">
            <BrowseFileButton className="analytics-table-rebrowse-file"
                              iconCls=""/>
        </TipProvider>
    );
};

export default AnalyticsTableRebrowseFile;
