/**
 * @file Frame.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import AnalyticsTable from './table/AnalyticsTable';

// Styles
import 'scss/containers/app/Frame.scss';

const Frame = ({data}) => {
    return (
        <div className="frame">
            <AnalyticsTable data={data}/>
        </div>
    );
};

Frame.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.array,
        tableData: PropTypes.array,
        browseData: PropTypes.array
    })
};

export default Frame;
