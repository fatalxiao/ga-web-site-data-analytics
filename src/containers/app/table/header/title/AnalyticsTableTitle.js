/**
 * @file AnalyticsTableTitle.js
 * @author liangxiaojun(fatalxiao@163.com)
 */

import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

// Styles
import './AnalyticsTableTitle.scss';

const AnalyticsTableTitle = ({data}) => {

    const title = useMemo(() => {

        const reg = /\# (.*)/,
            len = data?.length;

        if (!data || len < 3) {
            return null;
        }

        return data.slice(1, len - 1).map(line => reg.exec(line)?.[1]).join(' ');

    }, [data]);

    return (
        <div className="analytics-table-title">
            {title}
        </div>
    );

};

AnalyticsTableTitle.propTypes = {
    data: PropTypes.array
};

export default AnalyticsTableTitle;
