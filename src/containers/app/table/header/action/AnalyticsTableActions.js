/**
 * @file AnalyticsTableActions.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import ToggleCollapseData from './toggleCollapseData/AnalyticsTableToggleCollapseData';
import TableSearch from './search/AnalyticsTableSearch';

// Styles
import 'scss/containers/app/table/header/action/AnalyticsTableActions.scss';

const AnalyticsTableActions = ({
    searchText, isDataCollapsed,
    onSearchChang, onDataCollapsedChange
}) => (
    <div className="analytics-table-actions">

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
