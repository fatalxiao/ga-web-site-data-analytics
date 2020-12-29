/**
 * @file App.js
 * @author liangxiaojun(fatalxiao@163.com)
 */

import React from 'react';

// Components
import TableLayout from './table/AnalyticsTableLayout';
import DropZonePop from 'components/file/DropZonePop';

// Styles
import './App.scss';

const App = () => (
    <div className="app">
        <TableLayout/>
        <DropZonePop/>
    </div>
);

export default App;
