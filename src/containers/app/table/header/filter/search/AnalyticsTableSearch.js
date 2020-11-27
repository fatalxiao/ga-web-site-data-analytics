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
import 'scss/containers/app/table/header/filter/search/AnalyticsTableSearch.scss';

const AnalyticsTableSearch = ({
    searchText,
    onSearchChang
}) => {

    const

        fieldRef = useRef(),

        [collapsed, setCollapsed] = useState(true),

        handleIconClick = useCallback(() => {

            if (!collapsed) {
                return;
            }

            setCollapsed(false);
            setTimeout(() => fieldRef?.current?.focus(), 250);

        }, [collapsed, setCollapsed]),

        handleBlur = useCallback(() => {

            if (collapsed || (searchText && searchText.length > 0)) {
                return;
            }

            setCollapsed(true);

        }, [searchText, collapsed, setCollapsed]);

    return (
        <TextField ref={fieldRef}
                   className={classNames('analytics-table-search', {
                       collapsed
                   })}
                   iconCls="fas fa-search"
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
