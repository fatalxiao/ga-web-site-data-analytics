/**
 * @file AnalyticsTableFilters.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useCallback, forwardRef} from 'react';
import PropTypes from 'prop-types';

// Components
import TextField from 'alcedo-ui/TextField';
import TipProvider from 'alcedo-ui/TipProvider';
import IconButton from 'alcedo-ui/IconButton';

// Styles
import 'scss/containers/app/table/filter/AnalyticsTableFilters.scss';

const AnalyticsTableFilters = forwardRef(({isDataCollapsed, onDataCollapsedChange}, ref) => {

    const renderTypeTipInstance = useRef(),

        handleDataCollapsedClick = useCallback(() => {
            setTimeout(() => renderTypeTipInstance?.current?.resetPosition?.(), 0);
            onDataCollapsedChange?.(!isDataCollapsed);
        }, [isDataCollapsed, onDataCollapsedChange]);

    return (
        <div ref={ref}
             className="analytics-table-filters">

            <TextField className="analytics-table-search"
                       iconCls="fas fa-search"
                       placeholder="Search routes..."/>

            <TipProvider ref={renderTypeTipInstance}
                         tipContent={isDataCollapsed ? 'Flatten Data' : 'Fold Data'}>
                <IconButton className="analytics-table-render-type"
                            iconCls={`fas fa-align-${isDataCollapsed ? 'justify' : 'right'}`}
                            onClick={handleDataCollapsedClick}/>
            </TipProvider>

        </div>
    );

});

AnalyticsTableFilters.propTypes = {
    isDataCollapsed: PropTypes.bool,
    onDataCollapsedChange: PropTypes.func
};

export default AnalyticsTableFilters;
