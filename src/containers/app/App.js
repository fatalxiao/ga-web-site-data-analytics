/**
 * @file App.js
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
