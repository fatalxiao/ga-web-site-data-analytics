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
import {addPath, getPageViewsTotalCount, getSortingData} from 'vendors/Util';

// Styles
import 'scss/containers/app/table/AnalyticsTable.scss';

const AnalyticsTable = ({data, scrollHeight}) => {

    const

        /**
         * 表格的排序
         * @type {string[]}
         */
        [sorting, setSorting] = useState(null),

        /**
         * columns 配置
         */
        columns = useMemo(() => data?.[0]?.split(',')?.map((item, index) => {

            const field = ColumnsFields[index];

            return ({
                key: field,
                noWrap: true,
                width: index === 0 ? '50%' : null,
                resizable: true,
                headRenderer: item,
                bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path) => {

                    // 第一列
                    if (index === 0) {
                        return `${path?.map(row => row?.node?.[ColumnsFields[0]]).join('/')}` || '/';
                    }

                    // 第二列
                    if (index === 1) {
                        return `${rowData?.[ColumnsFields[1]] || 0} / ${getPageViewsTotalCount(rowData, ColumnsFields[1])}`;
                    }

                    return rowData[field];

                },
                sortable: true,
                sortingProp: field
            });

        }), [data]),

        /**
         * 原始的表格数据
         */
        rawData = useMemo(() => data?.slice(1)?.map(item => {

            if (!item) {
                return null;
            }

            const row = item.split(','),
                result = {};

            row.forEach((col, colIndex) => {
                result[ColumnsFields[colIndex]] = col;
            });

            return result;

        }), [data]),

        /**
         * 按第一列 route 折叠后的数据
         * @type {*[]}
         */
        collapsedData = useMemo(() => {

            const result = {};

            sortingData?.forEach(row => {

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

        sortingData = useMemo(() => {

            if (!sorting) {
                return collapsedData;
            }

            return [getSortingData(collapsedData?.[0], sorting)];

        }, [collapsedData, sorting]),

        /**
         * 处理排序变更
         * @type {function(*=): void}
         */
        handleSortChange = useCallback(sorting => setSorting(sorting));

    return (
        <Table className="analytics-table"
               columns={columns}
               data={collapsedData}
               isHeadFixed={true}
               isPaginated={false}
               useDynamicRender={true}
               canBeExpanded={true}
               scrollHeight={scrollHeight}
               rowHeight={48}
               autoSorting={false}
               onSortChange={handleSortChange}/>
    );

};

AnalyticsTable.propTypes = {
    data: PropTypes.array,
    scrollHeight: PropTypes.number
};

export default AnalyticsTable;
