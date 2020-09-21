/**
 * @file Frame.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import Title from './title/AnalyticsTitle';
import AnalyticsTableLayout from './table/AnalyticsTableLayout';

// Styles
import 'scss/containers/app/Frame.scss';

const Frame = ({data}) => {
    return (
        <div className="frame">
            <Title data={data?.title}/>
            <AnalyticsTableLayout data={data?.tableData}/>
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
