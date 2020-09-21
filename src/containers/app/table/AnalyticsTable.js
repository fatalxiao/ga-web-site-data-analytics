/**
 * @file AnalyticsTable.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

// Components
import Table from 'alcedo-ui/Table';

// Vendors
import URI from 'urijs';
import {addPath, getPageViewsTotalCount} from 'vendors/Util';

// Styles
import 'scss/containers/app/table/AnalyticsTable.scss';

const AnalyticsTable = ({data, scrollHeight}) => {

    /**
     * columns field 配置
     * @type {string[]}
     */
    const columnsField = useMemo(() => [
            'route',
            'pageViews',
            'uniquePageViews',
            'averageTimeOnPage',
            'numberOfEntries',
            'bounceRate',
            'exitPercentage',
            'pageValue'
        ], []),

        /**
         * columns 配置
         */
        columns = useMemo(() => data?.[0]?.split(',')?.map((item, index) => ({
            key: item,
            noWrap: true,
            width: index === 0 ? '50%' : null,
            resizable: true,
            headRenderer: item,
            bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path) => {

                // 第一列
                if (index === 0) {
                    return `${path?.map(row => row?.node?.[columnsField[0]]).join('/')}` || '/';
                }

                // 第二列
                if (index === 1) {
                    return `${rowData?.[columnsField[1]] || 0} / ${getPageViewsTotalCount(rowData, columnsField[1])}`;
                }

                return rowData[columnsField[index]];

            }
        })), [data]),

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
                result[columnsField[colIndex]] = col;
            });

            return result;

        }), [data]),

        /**
         * 按第一列 route 折叠后的数据
         * @type {*[]}
         */
        collapsedData = useMemo(() => {

            const result = {};

            rawData?.forEach(row => {

                if (!row?.[columnsField[0]]) {
                    return;
                }

                const url = URI(row[columnsField[0]]),
                    path = url.path(),
                    pathArray = path.split('/');

                addPath(result, pathArray[1] === '' ? pathArray.slice(1) : pathArray, row, columnsField[0]);

            });

            return [result];

        }, [data]);

    // console.log('collapsedData::', collapsedData);

    return (
        <Table className="analytics-table"
               columns={columns}
               data={collapsedData}
               isHeadFixed={true}
               isPaginated={false}
               useDynamicRender={true}
               canBeExpanded={true}
               scrollHeight={scrollHeight}
               rowHeight={48}/>
    );

};

AnalyticsTable.propTypes = {
    data: PropTypes.array,
    scrollHeight: PropTypes.number
};

export default AnalyticsTable;
