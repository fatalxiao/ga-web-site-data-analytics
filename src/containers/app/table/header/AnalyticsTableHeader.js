/**
 * @file AnalyticsTableHeader.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

// Components
import AnalyticsTableTitle from './title/AnalyticsTableTitle';
import AnalyticsTableFilters from './filter/AnalyticsTableFilters';

// Styles
import 'scss/containers/app/table/header/AnalyticsTableHeader.scss';

const AnalyticsTableHeader = forwardRef(({
    title, searchText, isDataCollapsed,
    onSearchChang, onDataCollapsedChange
}, ref) => (
    <div ref={ref}
         className="analytics-table-header">

        <AnalyticsTableTitle data={title}/>

        <AnalyticsTableFilters searchText={searchText}
                               isDataCollapsed={isDataCollapsed}
                               onSearchChang={onSearchChang}
                               onDataCollapsedChange={onDataCollapsedChange}/>

    </div>
));

AnalyticsTableHeader.propTypes = {

    title: PropTypes.array,

    searchText: PropTypes.string,
    isDataCollapsed: PropTypes.bool,

    onSearchChang: PropTypes.func,
    onDataCollapsedChange: PropTypes.func

};

export default AnalyticsTableHeader;
