/**
 * @file AnalyticsTable.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useMemo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import Table from 'alcedo-ui/Table';

// Statics
import ColumnsFields from 'statics/ColumnsFields';

// Vendors
import URI from 'urijs';
import {
    splitCSVRow, addPath, getPageViewsTotalCount,
    getSortingCollapsedData, getPageViewsSortingCollapsedData, getSortingData
} from 'vendors/Util';

// Styles
import 'scss/containers/app/table/AnalyticsTable.scss';

const AnalyticsTable = ({data, scrollHeight, isDataCollapsed}) => {

    const

        /**
         * 表格的排序
         * @type {string[]}
         */
        [sorting, setSorting] = useState({
            prop: ColumnsFields[0],
            type: 1
        }),

        /**
         * 原始的表格数据
         */
        rawData = useMemo(() => data?.slice(1, data.length - 1)?.map(item => {

            if (!item) {
                return null;
            }

            return splitCSVRow(item);

        }), [data]),

        footData = useMemo(() => splitCSVRow(data?.[data.length - 1]), [data]),

        /**
         * 按第一列 route 折叠后的数据
         * @type {*[]}
         */
        collapsedData = useMemo(() => {

            const result = {};

            rawData?.forEach(row => {

                if (!row?.[ColumnsFields[0]]) {
                    return;
                }

                const url = URI(row[ColumnsFields[0]]),
                    path = url.path(),
                    pathArray = path.split('/');

                addPath(result, pathArray[1] === '' ? pathArray.slice(1) : pathArray, row, ColumnsFields[0]);

            });

            return [result];

        }, [rawData]),

        /**
         * 排序后的数据
         * @type {any}
         */
        sortingData = useMemo(() => {

            // 数据折叠
            if (isDataCollapsed) {

                if (!sorting) {
                    return collapsedData;
                }

                // 对第二列的排序做特殊处理
                return sorting?.prop === ColumnsFields[1] ?
                    [getPageViewsSortingCollapsedData(collapsedData?.[0], sorting)]
                    :
                    [getSortingCollapsedData(collapsedData?.[0], sorting)];

            }

            // 数据平铺
            if (!sorting) {
                return rawData;
            }

            return getSortingData(rawData, sorting);

        }, [isDataCollapsed, rawData, collapsedData, sorting]),

        /**
         * columns 配置
         */
        columns = useMemo(() => data?.[0]?.split(',')?.map((item, index) => {

            const field = ColumnsFields[index];

            return ({
                key: field,
                noWrap: true,
                width: index === 0 ? '40%' : null,
                align: index === 0 ? Table.Align.LEFT : Table.Align.RIGHT,
                resizable: true,
                sortable: true,
                sortingProp: field,
                headRenderer: item,
                bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path) => {

                    // 第一列
                    if (index === 0) {
                        return `${path?.map(row => row?.node?.[ColumnsFields[0]]).join('/')}` || '/';
                    }

                    // 第二列
                    if (index === 1) {
                        const value = rowData?.[ColumnsFields[1]] || 0;
                        return isDataCollapsed ?
                            `${value} / ${getPageViewsTotalCount(rowData)}`
                            :
                            value;
                    }

                    return rowData[field];

                },
                footRenderer: (rowData, colIndex) => colIndex === 0 ?
                    'Total'
                    :
                    footData[ColumnsFields[colIndex]]
            });

        }), [data, footData, isDataCollapsed]),

        /**
         * 处理排序变更
         * @type {function(*=): void}
         */
        handleSortChange = useCallback(sorting => setSorting(sorting));

    return (
        <Table className="analytics-table"
               columns={columns}
               data={sortingData}
               isHeadFixed={true}
               isFootFixed={true}
               isPaginated={false}
               useDynamicRender={true}
               canBeExpanded={true}
               scrollHeight={scrollHeight}
               rowHeight={48}
               autoSorting={false}
               sorting={sorting}
               defaultSortingType={Table.SortingType.DESC}
               onSortChange={handleSortChange}/>
    );

};

AnalyticsTable.propTypes = {
    data: PropTypes.array,
    scrollHeight: PropTypes.number,
    isDataCollapsed: PropTypes.bool
};

export default AnalyticsTable;
