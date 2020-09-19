/**
 * @file AnalyticsTable.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import Table from 'alcedo-ui/Table';

// Styles
import 'scss/containers/table/AnalyticsTable.scss';

const AnalyticsTable = ({data}) => {

    const columns = useMemo(() => data[0].split(',').map((item, index) => ({
            key: item,
            headRenderer: item,
            bodyRenderer: rowData => rowData[item]
        })), [data]),

        tableData = useMemo(() => {

        }, [data]);

    return (
        <div className="analytics-table">
            <Table columns={columns}
                   data={[]}/>
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
