/**
 * @file AnalyticsTable.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useMemo, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

// Components
import Table from 'alcedo-ui/Table';

// Statics
import ColumnsFields from 'src/config.ColumnsFields';

// Vendors
import {
    splitCSVRow, collapseData,
    getSortingCollapsedData, getSortingData
} from 'vendors/TableDataUtil';

// Styles
import 'scss/containers/app/table/AnalyticsTable.scss';

const AnalyticsTable = ({
    data, scrollHeight, searchText, isDataCollapsed
}) => {

    const

        /**
         * 默认排序配置
         * @type {{prop: string, type: number}}
         */
        DEFAULT_SORTING = useMemo(() => ({
            prop: ColumnsFields[0].sortingProp,
            type: 1
        }), []),

        /**
         * 表格的排序
         * @type {string[]}
         */
        [sorting, setSorting] = useState(DEFAULT_SORTING),

        /**
         * 原始的表格数据
         */
        rawData = useMemo(() => data?.slice(1, data.length - 1)?.map(item => {

            if (!item) {
                return null;
            }

            return splitCSVRow(item, true);

        }), [data]),

        /**
         * 表尾 Total 数据
         * @type {{}}
         */
        footData = useMemo(() => splitCSVRow(data?.[data.length - 1]), [data]),

        /**
         * 获取过滤后的数据
         * @type {any}
         */
        filteredData = useMemo(() => {

            if (!searchText || searchText?.length < 1) {
                return rawData;
            }

            return rawData.filter(row => row?.[ColumnsFields[0].name].includes(searchText));

        }, [rawData, searchText]),

        /**
         * 折叠的数据
         * @type {Array|*[]}
         */
        collapsedData = useMemo(() => collapseData(filteredData), [filteredData]),

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

                return [getSortingCollapsedData(collapsedData?.[0], {
                    ...sorting,
                    prop: sorting.prop[isDataCollapsed ? 'collapsed' : 'default']
                })];

            }

            // 数据平铺
            if (!sorting) {
                return filteredData;
            }

            return getSortingData(filteredData, {
                ...sorting,
                prop: sorting.prop[isDataCollapsed ? 'collapsed' : 'default']
            });

        }, [isDataCollapsed, filteredData, sorting]),

        /**
         * columns 配置
         */
        columns = useMemo(() => {

            const dataColumns = data?.[0]?.split(',');

            return ColumnsFields.map(({name, mappingIndex, sortingProp, bodyRenderer}, index) => ({
                key: name,
                noWrap: true,
                width: index === 0 ? '40%' : null,
                align: index === 0 ? Table.Align.LEFT : Table.Align.RIGHT,
                resizable: true,
                sortable: true,
                sortingProp: sortingProp,
                headRenderer: dataColumns[mappingIndex],
                bodyRenderer: (...args) => bodyRenderer?.(...args, isDataCollapsed),
                footRenderer: (rowData, colIndex) => colIndex === 0 ?
                    'Total'
                    :
                    footData[ColumnsFields[colIndex].name]
            }));

        }, [data, footData, isDataCollapsed]),

        /**
         * 处理排序变更
         * @type {function(*=): void}
         */
        handleSortChange = useCallback(sorting => setSorting(sorting), [setSorting]);

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

    searchText: PropTypes.string,
    isDataCollapsed: PropTypes.bool

};

export default AnalyticsTable;
