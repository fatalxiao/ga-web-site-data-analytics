/**
 * @file AnalyticsTableSearch.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useState, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import TextField from 'alcedo-ui/TextField';

// Vendors
import classNames from 'classnames';

// Styles
import './AnalyticsTableSearch.scss';

const AnalyticsTableSearch = ({
    searchText,
    onSearchChang
}) => {

    const

        /**
         * field ref
         * @type {React.MutableRefObject<undefined>}
         */
        fieldRef = useRef(),

        /**
         * field 是否折叠的 state
         * @type {React.MutableRefObject<undefined>}
         */
        [collapsed, setCollapsed] = useState(true),

        /**
         * 处理 search icon 点击事件
         * @type {Function}
         */
        handleIconClick = useCallback(() => {

            if (!collapsed) {
                return;
            }

            // 展开 text field
            setCollapsed(false);

            // 动画结束后 focus
            setTimeout(() => fieldRef?.current?.focus(), 250);

        }, [collapsed, setCollapsed]),

        /**
         * 处理 text field blur 事件
         * @type {Function}
         */
        handleBlur = useCallback(() => {

            if (collapsed || (searchText && searchText.length > 0)) {
                return;
            }

            // 折叠 text field
            setCollapsed(true);

        }, [searchText, collapsed, setCollapsed]);

    return (
        <TextField ref={fieldRef}
                   className={classNames('analytics-table-search', {
                       collapsed
                   })}
                   iconCls="far fa-search"
                   placeholder="Search routes..."
                   value={searchText}
                   onIconClick={handleIconClick}
                   onBlur={handleBlur}
                   onChange={onSearchChang}/>
    );

};

AnalyticsTableSearch.propTypes = {
    searchText: PropTypes.string,
    onSearchChang: PropTypes.func
};

export default AnalyticsTableSearch;
