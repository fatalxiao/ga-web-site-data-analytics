/**
 * @file AnalyticsHeader.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import Title from './AnalyticsTitle';
import Tools from './AnalyticsTools';

// Styles
import 'scss/containers/app/header/AnalyticsHeader.scss';

const AnalyticsHeader = ({data, isDataCollapsed, onDataCollapsedChange}) => (
    <div className="analytics-header">
        <Title data={data}/>
        <Tools isDataCollapsed={isDataCollapsed}
               onDataCollapsedChange={onDataCollapsedChange}/>
    </div>
);

AnalyticsHeader.propTypes = {

    data: PropTypes.array,
    isDataCollapsed: PropTypes.bool,

    onDataCollapsedChange: PropTypes.func

};

export default AnalyticsHeader;
