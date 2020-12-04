/**
 * @file AnalyticsTableRebrowseFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useCallback} from 'react';

// Components
import ActionButton from '../AnalyticsTableActionButton';
import BrowseFile from 'components/BrowseFile';
import UploadIcon from 'components/icons/UploadIcon';

// Styles
import './AnalyticsTableRebrowseFile.scss';

const AnalyticsTableRebrowseFile = () => {

    const

        /**
         * browse file ref
         * @type {React.MutableRefObject<undefined>}
         */
        browseFileRef = useRef(),

        /**
         * 处理点击事件
         * @type {function(): *}
         */
        handleClick = useCallback(() => browseFileRef?.current?.click?.(), [browseFileRef]);

    return (
        <div className="analytics-table-rebrowse-file">

            <BrowseFile ref={browseFileRef}/>

            <ActionButton tipContent="Rebrowse File"
                          renderer={() => <UploadIcon/>}
                          onClick={handleClick}/>

        </div>
    );

};

export default AnalyticsTableRebrowseFile;
