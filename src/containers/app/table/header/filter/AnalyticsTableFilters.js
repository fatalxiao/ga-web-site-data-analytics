/**
 * @file AnalyticsTableFilters.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import ToggleCollapseData from './toggleCollapseData/AnalyticsTableToggleCollapseData';
import TableSearch from './search/AnalyticsTableSearch';

// Styles
import 'scss/containers/app/table/header/filter/AnalyticsTableFilters.scss';

const AnalyticsTableFilters = ({
    searchText, isDataCollapsed,
    onSearchChang, onDataCollapsedChange
}) => (
    <div className="analytics-table-filters">

        <ToggleCollapseData isDataCollapsed={isDataCollapsed}
                            onDataCollapsedChange={onDataCollapsedChange}/>

        <TableSearch searchText={searchText}
                     onSearchChang={onSearchChang}/>

    </div>
);

AnalyticsTableFilters.propTypes = {

    searchText: PropTypes.string,
    isDataCollapsed: PropTypes.bool,

    onSearchChang: PropTypes.func,
    onDataCollapsedChange: PropTypes.func

};

export default AnalyticsTableFilters;
