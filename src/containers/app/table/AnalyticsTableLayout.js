/**
 * @file AnalyticsTableLayout.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {} from 'react';
import PropTypes from 'prop-types';

// Components
import Table from './AnalyticsTable';

// Styles
import 'scss/containers/app/table/AnalyticsTableLayout.scss';

const AnalyticsTableLayout = (props) => {
    return (
        <div className="analytics-table-layout">
            <Table {...props}/>
        </div>
    );
};

AnalyticsTableLayout.propTypes = {
    data: PropTypes.array
};

export default AnalyticsTableLayout;
