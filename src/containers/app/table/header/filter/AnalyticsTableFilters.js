/**
 * @file AnalyticsTableFilters.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import TextField from 'alcedo-ui/TextField';
import TipProvider from 'alcedo-ui/TipProvider';
import IconButton from 'alcedo-ui/IconButton';

// Styles
import 'scss/containers/app/table/header/filter/AnalyticsTableFilters.scss';

const AnalyticsTableFilters = ({
    searchText, isDataCollapsed,
    onSearchChang, onDataCollapsedChange
}) => {

    const renderTypeTipInstance = useRef(),

        handleDataCollapsedClick = useCallback(() => {
            setTimeout(() => renderTypeTipInstance?.current?.resetPosition?.(), 0);
            onDataCollapsedChange?.(!isDataCollapsed);
        }, [isDataCollapsed, onDataCollapsedChange]);

    return (
        <div className="analytics-table-filters">

            <TipProvider ref={renderTypeTipInstance}
                         tipContent={isDataCollapsed ? 'Flatten Data' : 'Fold Data'}>
                <IconButton className="analytics-table-render-type"
                            iconCls={`fas fa-align-${isDataCollapsed ? 'justify' : 'right'}`}
                            onClick={handleDataCollapsedClick}/>
            </TipProvider>

            <TextField className="analytics-table-search"
                       iconCls="fas fa-search"
                       placeholder="Search routes..."
                       value={searchText}
                       onChange={onSearchChang}/>

        </div>
    );

};

AnalyticsTableFilters.propTypes = {

    searchText: PropTypes.string,
    isDataCollapsed: PropTypes.bool,

    onSearchChang: PropTypes.func,
    onDataCollapsedChange: PropTypes.func

};

export default AnalyticsTableFilters;
