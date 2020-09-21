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
import {addPath} from 'vendors/Util';

// Styles
import 'scss/containers/app/table/AnalyticsTable.scss';

const AnalyticsTable = ({data, scrollHeight}) => {

    /**
     * columns 配置
     */
    const columns = useMemo(() => data?.[0]?.split(',')?.map((item, index) => ({
            key: item,
            noWrap: true,
            width: index === 0 ? '50%' : 'auto',
            resizable: true,
            headRenderer: item,
            bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path) => index === 0 ?
                `${path?.map(row => row?.node?.[0]).join('/')}` || '/'
                :
                rowData[index]
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
                result[colIndex] = col;
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

                if (!row?.[0]) {
                    return;
                }

                const url = URI(row[0]),
                    path = url.path(),
                    pathArray = path.split('/');

                addPath(result, pathArray[1] === '' ? pathArray.slice(1) : pathArray, row);

            });

            return [result];

        }, [data]);

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
