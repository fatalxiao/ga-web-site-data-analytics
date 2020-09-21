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
import 'scss/containers/table/AnalyticsTable.scss';

const AnalyticsTable = ({data}) => {

    const tableData = useMemo(() => data?.tableData, [data]),

        columns = useMemo(() => tableData?.[0]?.split(',')?.map((item, index) => ({
            key: item,
            noWrap: true,
            width: index === 0 ? '50%' : 'auto',
            resizable: true,
            headRenderer: item,
            bodyRenderer: rowData => rowData[index]
        })), [data]),

        rawData = useMemo(() => tableData?.slice(1)?.map(item => {

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

        collapsedData = useMemo(() => {

            const result = {};

            rawData?.forEach(row => {

                if (!row?.[0]) {
                    return;
                }

                const url = URI(row[0]),
                    path = url.path();

                addPath(result, path.split('/'), row);

            });

            console.log('collapsedData::', result);

        }, [data]);

    return (
        <div className="analytics-table">
            <Table columns={columns}
                   data={rawData}
                   isHeadFixed={true}
                   isPaginated={false}
                   useDynamicRender={true}
                   scrollHeight={500}
                   rowHeight={50}/>
        </div>
    );

};

AnalyticsTable.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.array,
        tableData: PropTypes.array,
        browseData: PropTypes.array
    })
};

export default AnalyticsTable;
