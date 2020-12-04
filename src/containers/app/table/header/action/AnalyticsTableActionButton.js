/**
 * @file AnalyticsTableActionButton.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import TipProvider from 'alcedo-ui/TipProvider';
import IconButton from 'alcedo-ui/IconButton';

// Vendors
import classNames from 'classnames';

// Styles
import './AnalyticsTableActionButton.scss';

const AnalyticsTableActionButton = ({
    className, tipContent,
    onClick,
    ...restProps
}) => {

    const

        /**
         * tip ref
         * @type {React.MutableRefObject<undefined>}
         */
        tipRef = useRef(),

        /**
         * 处理 button 点击事件
         * @type {Function}
         */
        handleClick = useCallback(() => {
            setTimeout(() => tipRef?.current?.resetPosition?.(), 0);
            onClick?.();
        }, [tipRef, onClick]);

    return (
        <TipProvider ref={tipRef}
                     tipContent={tipContent}>
            <IconButton {...restProps}
                        className={classNames('analytics-table-action-button', {
                            [className]: className
                        })}
                        onClick={handleClick}/>
        </TipProvider>
    );

};

AnalyticsTableActionButton.propTypes = {

    className: PropTypes.string,
    tipContent: PropTypes.any,

    onClick: PropTypes.func

};

export default AnalyticsTableActionButton;
