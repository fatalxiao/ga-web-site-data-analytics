/**
 * @file AnalyticsHeader.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import Title from './AnalyticsTitle';

// Styles
import 'scss/containers/app/header/AnalyticsHeader.scss';

const AnalyticsHeader = ({data}) => (
    <div className="analytics-header">
        <Title data={data}/>
    </div>
);

AnalyticsHeader.propTypes = {
    data: PropTypes.array
};

export default AnalyticsHeader;
