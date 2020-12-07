/**
 * @file App.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';

// Components
import TableLayout from './table/AnalyticsTableLayout';
import DropZonePop from 'components/DropZonePop';

// Styles
import './App.scss';

const App = () => (
    <div className="app">
        <TableLayout/>
        <DropZonePop/>
    </div>
);

export default App;
