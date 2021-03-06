/**
 * @file AnalyticsTableActions.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import RebrowseFile from './rebrowse/AnalyticsTableRebrowseFile';
import ToggleCollapseData from './toggleCollapseData/AnalyticsTableToggleCollapseData';
import TableSearch from './search/AnalyticsTableSearch';

// Styles
import './AnalyticsTableActions.scss';

const AnalyticsTableActions = ({
    searchText, isDataCollapsed,
    onSearchChang, onDataCollapsedChange
}) => (
    <div className="analytics-table-actions">

        <RebrowseFile/>

        <ToggleCollapseData isDataCollapsed={isDataCollapsed}
                            onDataCollapsedChange={onDataCollapsedChange}/>

        <TableSearch searchText={searchText}
                     onSearchChang={onSearchChang}/>

    </div>
);

AnalyticsTableActions.propTypes = {

    searchText: PropTypes.string,
    isDataCollapsed: PropTypes.bool,

    onSearchChang: PropTypes.func,
    onDataCollapsedChange: PropTypes.func

};

export default AnalyticsTableActions;
