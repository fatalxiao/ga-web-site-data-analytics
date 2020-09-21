/**
 * @file AnalyticsTableLayout.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

// Components
import Table from './AnalyticsTable';

// Vendors
import ResizeObserver from 'resize-observer-polyfill';

// Styles
import 'scss/containers/app/table/AnalyticsTableLayout.scss';

let observer = null,
    lastHeight = 0;

const AnalyticsTableLayout = (props) => {

    const layout = useRef(),

        [height, setHeight] = useState(0),

        handleMeasure = useCallback(entries => {

            const target = entries[0].target,
                {height} = target.getBoundingClientRect(),
                fixedHeight = Math.floor(height);

            if (lastHeight !== fixedHeight) {
                lastHeight = fixedHeight;
                setHeight(fixedHeight);
            }

        }),

        addObserver = useCallback(() => {
            if (layout?.current && !observer) {
                observer = new ResizeObserver(handleMeasure);
                observer.observe(layout?.current);
            }
        }),

        removeObserver = useCallback(() => {
            if (observer) {
                observer.disconnect();
                observer = null;
            }
        });

    useEffect(() => {

        addObserver();

        return () => removeObserver();

    }, []);

    return (
        <div ref={layout}
             className="analytics-table-layout">
            <Table {...props}
                   scrollHeight={height - 35}/>
        </div>
    );

};

AnalyticsTableLayout.propTypes = {
    data: PropTypes.array
};

export default AnalyticsTableLayout;
