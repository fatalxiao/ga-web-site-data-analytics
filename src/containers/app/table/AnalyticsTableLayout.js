/**
 * @file AnalyticsTableLayout.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useMemo, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

// Components
import Paper from 'alcedo-ui/Paper';
import TableHeader from './header/AnalyticsTableHeader';
import Table from './AnalyticsTable';

// Vendors
import {findDOMNode} from 'react-dom';
import ResizeObserver from 'resize-observer-polyfill';

// Styles
import 'scss/containers/app/table/AnalyticsTableLayout.scss';

let observer = null;

const AnalyticsTableLayout = ({
                                  data, ...restProps
                              }) => {

    const

        /**
         * card ref
         * @type {React.MutableRefObject<undefined>}
         */
        cardInstance = useRef(),

        /**
         * filter ref
         * @type {React.MutableRefObject<undefined>}
         */
        headerRef = useRef(),

        /**
         * 查询的文本
         * @type {React.MutableRefObject<undefined>}
         */
        [searchText, setSearchText] = useState(''),

        /**
         * 是否折叠数据
         */
        [isDataCollapsed, setIsDataCollapsed] = useState(true),

        /**
         * 表头高度
         * @type {number}
         */
        tableHeadHeight = useMemo(() => 48, []),

        /**
         * 表尾高度
         * @type {number}
         */
        tableFootHeight = useMemo(() => 48, []),

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
                headerEl = findDOMNode(headerRef?.current),
                {paddingTop, paddingBottom} = window.getComputedStyle(target),
                fixedHeight = Math.floor(height)
                    - (parseInt(paddingTop, 10) || 0)
                    - (parseInt(paddingBottom, 10) || 0)
                    - (headerEl?.offsetHeight || 0) - tableHeadHeight - tableFootHeight;

            if (height !== fixedHeight) {
                setHeight(fixedHeight);
            }

        }),

        /**
         * 添加观测
         * @type {Function}
         */
        addObserver = useCallback(() => {
            if (cardInstance?.current && !observer) {
                observer = new ResizeObserver(handleMeasure);
                observer.observe(findDOMNode(cardInstance?.current));
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
        <Paper ref={cardInstance}
               className="analytics-table-card">

            <TableHeader ref={headerRef}
                         title={data?.title}
                         searchText={searchText}
                         isDataCollapsed={isDataCollapsed}
                         onSearchChang={setSearchText}
                         onDataCollapsedChange={setIsDataCollapsed}/>

            <Table {...restProps}
                   data={data?.tableData}
                   scrollHeight={height}
                   searchText={searchText}
                   isDataCollapsed={isDataCollapsed}/>

        </Paper>
    );

};

AnalyticsTableLayout.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.array,
        tableData: PropTypes.array,
        browseData: PropTypes.array
    })
};

export default AnalyticsTableLayout;
