/**
 * @file AnalyticsTableActionButton.js
 * @author liangxiaojun(fatalxiao@163.com)
 */

import React, {useRef, useState, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import TipProvider from 'alcedo-ui/TipProvider';
import IconButton from 'alcedo-ui/IconButton';

// Vendors
import classNames from 'classnames';

// Styles
import './AnalyticsTableActionButton.scss';

const AnalyticsTableActionButton = ({
    className, tipContent, iconCls, hoveringIconCls,
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
         * 是否 hover 在 button 上
         * @type {React.MutableRefObject<undefined>}
         */
        [hovering, setHovering] = useState(false),

        /**
         * 处理 button mouse enter 事件
         * @type {function(): void}
         */
        handleMouseEnter = useCallback(() => setHovering(true), []),

        /**
         * 处理 button mouse leave 事件
         * @type {function(): void}
         */
        handleMouseLeave = useCallback(() => setHovering(false), []),

        /**
         * 处理 button 点击事件
         * @type {Function}
         */
        handleClick = useCallback(() => {

            // tip content 可能改变，在点击后重新计算位置
            setTimeout(() => tipRef?.current?.resetPosition?.(), 0);

            onClick?.();

        }, [tipRef, onClick]);

    return (
        <TipProvider ref={tipRef}
                     tipContent={tipContent}
                     position={TipProvider.Position.BOTTOM}>
            <IconButton {...restProps}
                        className={classNames('analytics-table-action-button', {
                            [className]: className
                        })}
                        iconCls={(hovering ? hoveringIconCls : iconCls) || iconCls}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}/>
        </TipProvider>
    );

};

AnalyticsTableActionButton.propTypes = {

    className: PropTypes.string,
    tipContent: PropTypes.any,

    iconCls: PropTypes.string,
    hoveringIconCls: PropTypes.string,

    onClick: PropTypes.func

};

export default AnalyticsTableActionButton;
