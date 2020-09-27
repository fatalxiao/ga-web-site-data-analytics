/**
 * @file AnalyticsTableFilters.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useCallback, forwardRef} from 'react';
import PropTypes from 'prop-types';

// Components
import IconButton from 'alcedo-ui/IconButton';

// Styles
import 'scss/containers/app/table/AnalyticsTableFilters.scss';

const AnalyticsTableFilters = forwardRef(({isDataCollapsed, onDataCollapsedChange}, ref) => {

    const handleDataCollapsedClick = useCallback(() => onDataCollapsedChange?.(!isDataCollapsed),
        [isDataCollapsed, onDataCollapsedChange]);

    return (
        <div ref={ref}
             className="analytics-table-filters">
            <IconButton iconCls={`fas fa-align-${isDataCollapsed ? 'justify' : 'right'}`}
                        onClick={handleDataCollapsedClick}/>
        </div>
    );

});

AnalyticsTableFilters.propTypes = {
    isDataCollapsed: PropTypes.bool,
    onDataCollapsedChange: PropTypes.func
};

export default AnalyticsTableFilters;
