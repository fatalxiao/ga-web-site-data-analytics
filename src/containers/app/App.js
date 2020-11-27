/**
 * @file App.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import Header from './header/AnalyticsHeader';
import TableLayout from './table/AnalyticsTableLayout';

// Styles
import 'scss/containers/app/App.scss';

const App = ({data}) => (
    <div className="app">
        <TableLayout data={data}/>
    </div>
);

App.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.array,
        tableData: PropTypes.array,
        browseData: PropTypes.array
    })
};

export default App;
