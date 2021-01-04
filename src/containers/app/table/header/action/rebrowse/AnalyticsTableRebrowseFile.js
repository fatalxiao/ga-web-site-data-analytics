/**
 * @file AnalyticsTableRebrowseFile.js
 */

import React, {useRef, useCallback} from 'react';

// Components
import ActionButton from '../AnalyticsTableActionButton';
import BrowseFile from 'components/file/BrowseFile';

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
                          iconCls="far fa-folder"
                          hoveringIconCls="far fa-folder-open"
                          onClick={handleClick}/>

        </div>
    );

};

export default AnalyticsTableRebrowseFile;
