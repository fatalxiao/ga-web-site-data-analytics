/**
 * @file Root.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useState, useCallback} from 'react';

// Components
import BrowseFile from 'containers/browseFile/BrowseFile';
import App from 'containers/app/App';

// Styles
import 'scss/containers/Root.scss';

const Root = () => {

    const

        /**
         * GA 数据
         *  {
         *      title: {Array},
         *      tableData: {Array},
         *      browseData: {Array}
         *  }
         */
        [data, setData] = useState(null),

        /**
         * 处理数据变更
         */
        handleDataChange = useCallback(data => setData(data), [setData]);

    return (
        <div className="root">
            {
                data ?
                    <App data={data}/>
                    :
                    <BrowseFile onDataChange={handleDataChange}/>
            }
        </div>
    );

};

export default Root;
