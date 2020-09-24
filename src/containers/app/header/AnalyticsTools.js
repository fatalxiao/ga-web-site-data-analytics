/**
 * @file AnalyticsTools.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import Switcher from 'alcedo-ui/Switcher';

// Styles
import 'scss/containers/app/header/AnalyticsTools.scss';

const AnalyticsTools = ({isDataCollapsed, onDataCollapsedChange}) => (
    <div className="analytics-tools">
        <label className="switcher-wrap-label">
            Collapse Table Data
            <Switcher value={isDataCollapsed}
                      labelVisible={true}
                      onChange={onDataCollapsedChange}/>
        </label>
    </div>
);

AnalyticsTools.propTypes = {
    isDataCollapsed: PropTypes.bool,
    onDataCollapsedChange: PropTypes.func
};

export default AnalyticsTools;
