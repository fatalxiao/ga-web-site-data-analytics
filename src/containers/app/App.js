/**
 * @file App.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useState} from 'react';
import PropTypes from 'prop-types';

// Components
import Title from './title/AnalyticsTitle';
import AnalyticsTableLayout from './table/AnalyticsTableLayout';

// Styles
import 'scss/containers/app/App.scss';

const App = ({data}) => {

    /**
     * 是否折叠数据
     */
    const [isDataCollapsed, setIsDataCollapsed] = useState(true);

    return (
        <div className="app">
            <Title data={data?.title}
                   isDataCollapsed={isDataCollapsed}
                   onDataCollapsedChange={setIsDataCollapsed}/>
            <AnalyticsTableLayout data={data?.tableData}
                                  isDataCollapsed={isDataCollapsed}/>
        </div>
    );

};

App.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.array,
        tableData: PropTypes.array,
        browseData: PropTypes.array
    })
};

export default App;
