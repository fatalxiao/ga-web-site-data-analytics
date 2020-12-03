/**
 * @file App.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';

// Components
import TableLayout from './table/AnalyticsTableLayout';

// Styles
import 'scss/containers/app/App.scss';

const App = () => (
    <div className="app">
        <TableLayout/>
    </div>
);

export default App;
