/**
 * @file AnalyticsTableToggleCollapseData.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import TipProvider from 'alcedo-ui/TipProvider';
import IconButton from 'alcedo-ui/IconButton';

// Styles
import 'scss/containers/app/table/header/action/toggleCollapseData/AnalyticsTableToggleCollapseData.scss';

const AnalyticsTableToggleCollapseData = ({
    isDataCollapsed,
    onDataCollapsedChange
}) => {

    const

        /**
         * tip ref
         * @type {React.MutableRefObject<undefined>}
         */
        tipRef = useRef(),

        /**
         * 处理 button 点击事件
         * @type {Function}
         */
        handleDataCollapsedClick = useCallback(() => {
            setTimeout(() => tipRef?.current?.resetPosition?.(), 0);
            onDataCollapsedChange?.(!isDataCollapsed);
        }, [tipRef, isDataCollapsed, onDataCollapsedChange]);

    return (
        <TipProvider ref={tipRef}
                     tipContent={isDataCollapsed ? 'Flatten Data' : 'Fold Data'}>
            <IconButton className="analytics-table-toggle-collapse-data"
                        iconCls={`fas fa-align-${isDataCollapsed ? 'justify' : 'right'}`}
                        onClick={handleDataCollapsedClick}/>
        </TipProvider>
    );

};

AnalyticsTableToggleCollapseData.propTypes = {

    isDataCollapsed: PropTypes.bool,

    onDataCollapsedChange: PropTypes.func

};

export default AnalyticsTableToggleCollapseData;
