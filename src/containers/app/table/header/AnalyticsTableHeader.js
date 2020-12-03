/**
 * @file AnalyticsTableHeader.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

// Components
import Title from './title/AnalyticsTableTitle';
import Actions from './action/AnalyticsTableActions';

// Styles
import 'scss/containers/app/table/header/AnalyticsTableHeader.scss';

const AnalyticsTableHeader = forwardRef(({
    title, searchText, isDataCollapsed,
    onSearchChang, onDataCollapsedChange
}, ref) => (
    <div ref={ref}
         className="analytics-table-header">

        <Title data={title}/>

        <Actions searchText={searchText}
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
