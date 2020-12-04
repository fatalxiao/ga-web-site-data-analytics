/**
 * @file AnalyticsTableToggleCollapseData.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import ActionButton from '../AnalyticsTableActionButton';

// Styles
import 'scss/containers/app/table/header/action/toggleCollapseData/AnalyticsTableToggleCollapseData.scss';

const AnalyticsTableToggleCollapseData = ({
    isDataCollapsed,
    onDataCollapsedChange
}) => {

    const

        /**
         * 处理 button 点击事件
         * @type {Function}
         */
        handleDataCollapsedClick = useCallback(() => onDataCollapsedChange?.(!isDataCollapsed),
            [isDataCollapsed, onDataCollapsedChange]);

    return (
        <ActionButton className="analytics-table-toggle-collapse-data"
                      tipContent={isDataCollapsed ? 'Flatten Data' : 'Fold Data'}
                      iconCls={`fas fa-align-${isDataCollapsed ? 'justify' : 'right'}`}
                      onClick={handleDataCollapsedClick}/>
    );

};

AnalyticsTableToggleCollapseData.propTypes = {

    isDataCollapsed: PropTypes.bool,

    onDataCollapsedChange: PropTypes.func

};

export default AnalyticsTableToggleCollapseData;
