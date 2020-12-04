/**
 * @file AnalyticsTableToggleCollapseData.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import ActionButtonRadioGroup from '../AnalyticsTableActionButtonRadioGroup';

// Styles
import './AnalyticsTableToggleCollapseData.scss';

const AnalyticsTableToggleCollapseData = ({
    isDataCollapsed,
    onDataCollapsedChange
}) => {

    const

        /**
         * ButtonRadioGroup 的数据
         * @type {*[]}
         */
        data = useMemo(() => [{
            value: 1,
            iconCls: 'far fa-align-right rotate-180'
        }, {
            value: 0,
            iconCls: 'far fa-align-justify'
        }], []),

        /**
         * ButtonRadioGroup 选中的值
         */
        value = useMemo(() => data.find(item => !!item?.value === isDataCollapsed), [isDataCollapsed]),

        /**
         * 处理 button 点击事件
         * @type {Function}
         */
        handleChange = useCallback(v => onDataCollapsedChange?.(!!v?.value), [onDataCollapsedChange]);

    return (
        <ActionButtonRadioGroup className="analytics-table-toggle-collapse-data"
                                tipContent={isDataCollapsed ? 'Flatten Data' : 'Fold Data'}
                                data={data}
                                value={value}
                                renderer={() => null}
                                onChange={handleChange}/>
    );

};

AnalyticsTableToggleCollapseData.propTypes = {
    isDataCollapsed: PropTypes.bool,
    onDataCollapsedChange: PropTypes.func
};

export default AnalyticsTableToggleCollapseData;
