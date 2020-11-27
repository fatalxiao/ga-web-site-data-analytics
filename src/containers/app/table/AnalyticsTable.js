/**
 * @file AnalyticsTable.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useMemo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import Table from 'alcedo-ui/Table';

// Statics
import ColumnsFields from 'src/config.ColumnsFields';

// Vendors
import {
    splitCSVRow, collapseData,
    getSortingCollapsedData, getPageViewsSortingCollapsedData, getSortingData
} from 'vendors/Util';

// Styles
import 'scss/containers/app/table/AnalyticsTable.scss';

const AnalyticsTable = ({
    data, scrollHeight, searchText, isDataCollapsed
}) => {

    const

        /**
         * 表格的排序
         * @type {string[]}
         */
        [sorting, setSorting] = useState({
            prop: ColumnsFields[0].name,
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
         * 排序后的数据
         * @type {any}
         */
        sortingData = useMemo(() => {

            // 数据折叠
            if (isDataCollapsed) {

                const collapsedData = collapseData(filteredData);

                if (!sorting) {
                    return collapsedData;
                }

                // 对第二列的排序做特殊处理
                return sorting?.prop === ColumnsFields[1].name ?
                    [getPageViewsSortingCollapsedData(collapsedData?.[0], sorting)]
                    :
                    [getSortingCollapsedData(collapsedData?.[0], sorting)];

            }

            // 数据平铺
            if (!sorting) {
                return filteredData;
            }

            return getSortingData(filteredData, sorting);

        }, [isDataCollapsed, filteredData, sorting]),

        /**
         * columns 配置
         */
        columns = useMemo(() => {

            const dataColumns = data?.[0]?.split(',');

            return ColumnsFields.map(({name, mappingIndex, bodyRenderer}, index) => ({
                key: name,
                noWrap: true,
                width: index === 0 ? '40%' : null,
                align: index === 0 ? Table.Align.LEFT : Table.Align.RIGHT,
                resizable: true,
                sortable: true,
                sortingProp: name,
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

    searchText: PropTypes.string,
    isDataCollapsed: PropTypes.bool

};

export default AnalyticsTable;
