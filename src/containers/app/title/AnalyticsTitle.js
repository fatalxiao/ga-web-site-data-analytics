/**
 * @file AnalyticsTitle.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Styles
import 'scss/containers/app/title/AnalyticsTitle.scss';

const AnalyticsTitle = ({data}) => {
    return (
        <div className="analytics-title">
            {data.join('\n')}
        </div>
    );
};

AnalyticsTitle.propTypes = {
    data: PropTypes.array
};

export default AnalyticsTitle;
