/**
 * @file Root.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useState, useCallback} from 'react';

// Components
import ChooseFileButton from 'containers/chooseFile/ChooseFileButton';
import AnalyticsTable from 'containers/table/AnalyticsTable';

// Styles
import 'scss/containers/Root.scss';

const Root = () => {

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
                    <ChooseFileButton onDataChange={handleDataChange}/>
            }
        </div>
    );

};

export default Root;
