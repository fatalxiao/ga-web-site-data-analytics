/**
 * @file Root.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useState, useCallback} from 'react';

// Components
import BrowseFile from 'containers/browseFile/BrowseFile';
import AnalyticsTable from 'containers/table/AnalyticsTable';

// Styles
import 'scss/containers/Root.scss';

const Root = () => {

    /**
     * GA 数据
     *  {
     *      title: {Array},
     *      tableData: {Array},
     *      browseData: {Array}
     *  }
     */
    const [data, setData] = useState(null),

        /**
         * 处理数据变更
         */
        handleDataChange = useCallback(data => setData(data));

    return (
        <div className="root">
            {
                data ?
                    <AnalyticsTable data={data}/>
                    :
                    <BrowseFile onDataChange={handleDataChange}/>
            }
        </div>
    );

};

export default Root;
