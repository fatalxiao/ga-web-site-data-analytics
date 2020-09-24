/**
 * @file AnalyticsTableLayout.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useMemo, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

// Components
import Table from './AnalyticsTable';

// Vendors
import ResizeObserver from 'resize-observer-polyfill';

// Styles
import 'scss/containers/app/table/AnalyticsTableLayout.scss';

let observer = null;

const AnalyticsTableLayout = (props) => {

    const layout = useRef(),

        /**
         * 表头高度
         * @type {number}
         */
        tableHeadHeight = useMemo(() => 48, []),

        /**
         * 测量出的高度
         * @type {React.MutableRefObject<undefined>}
         */
        [height, setHeight] = useState(0),

        /**
         * 处理高度的测量
         * @type {Function}
         */
        handleMeasure = useCallback(entries => {

            const target = entries[0].target,
                {height} = target.getBoundingClientRect(),
                fixedHeight = Math.floor(height) - tableHeadHeight;

            if (height !== fixedHeight) {
                setHeight(fixedHeight);
            }

        }),

        /**
         * 添加观测
         * @type {Function}
         */
        addObserver = useCallback(() => {
            if (layout?.current && !observer) {
                observer = new ResizeObserver(handleMeasure);
                observer.observe(layout?.current);
            }
        }),

        /**
         * 移除观测
         * @type {Function}
         */
        removeObserver = useCallback(() => {
            if (observer) {
                observer.disconnect();
                observer = null;
            }
        });

    /**
     * 初始化时添加观测，销毁时移除观测
     */
    useEffect(() => {
        addObserver();
        return () => removeObserver();
    }, []);

    return (
        <div ref={layout}
             className="analytics-table-layout">
            <Table {...props}
                   scrollHeight={height}/>
        </div>
    );

};

AnalyticsTableLayout.propTypes = {
    data: PropTypes.array,
    isDataCollapsed: PropTypes.bool
};

export default AnalyticsTableLayout;
