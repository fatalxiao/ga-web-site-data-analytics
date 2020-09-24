/**
 * @file AnalyticsTitle.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Styles
import 'scss/containers/app/header/AnalyticsTools.scss';

const AnalyticsTitle = ({isDataCollapsed, onDataCollapsedChange}) => {
    return (
        <div className="analytics-tools">

        </div>
    );
};

AnalyticsTitle.propTypes = {
    isDataCollapsed: PropTypes.bool,
    onDataCollapsedChange: PropTypes.func
};

export default AnalyticsTitle;
