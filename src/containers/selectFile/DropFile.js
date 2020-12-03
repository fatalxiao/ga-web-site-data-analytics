/**
 * @file DropFile.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

// Icons
import UploadIcon from 'components/UploadIcon';

// Vendors
import classNames from 'classnames';
import Event from 'alcedo-ui/_vendors/Event';

// Styles
import 'scss/containers/selectFile/DropFile.scss';

const DropFile = ({
    children, className,
    onDragEnter, onDragLeave, onGetFile
}) => {

    const

        /**
         * 是否拖拽进入 document 区域
         */
        [dragging, setDragging] = useState(false),

        /**
         * 记录最后一个 document drag enter 的元素，是 document drag leave 正常触发
         */
        [lastEnterEl, setLastEnterEl] = useState(null),

        /**
         * 处理拖拽进入 document 区域
         * @type {Function}
         */
        handleDocumentDragEnter = useCallback(e => {
            setLastEnterEl(e?.target);
            setDragging(true);
            onDragEnter?.();
        }, [onDragEnter]),

        /**
         * 处理拖拽离开 document 区域
         * @type {Function}
         */
        handleDocumentDragLeave = useCallback(e => {
            if (e?.target === lastEnterEl) {
                setDragging(false);
                onDragLeave?.();
            }
        }, [lastEnterEl, onDragLeave]),

        /**
         * 处理拖拽离开 document 区域
         * @type {Function}
         */
        handleDocumentDragOver = useCallback(e => e?.preventDefault(), []),

        /**
         * 处理拖拽离开 document 区域
         * @type {Function}
         */
        handleDocumentDrop = useCallback(e => e?.preventDefault(), []),

        /**
         * 处理拖入文件 drop
         * @type {function(*): *}
         */
        handleDrop = useCallback(e => onGetFile?.(e?.dataTransfer?.files[0]), [onGetFile]);

    /**
     * 初始化时绑定拖拽进出 document 区域的事件
     */
    useEffect(() => {

        Event.addEvent(document, 'dragenter', handleDocumentDragEnter);
        Event.addEvent(document, 'dragleave', handleDocumentDragLeave);
        Event.addEvent(document, 'dragover', handleDocumentDragOver);
        Event.addEvent(document, 'drop', handleDocumentDrop);

        return () => {
            Event.removeEvent(document, 'dragenter', handleDocumentDragEnter);
            Event.removeEvent(document, 'dragleave', handleDocumentDragLeave);
            Event.removeEvent(document, 'dragover', handleDocumentDragOver);
            Event.removeEvent(document, 'drop', handleDocumentDrop);
        };

    }, [handleDocumentDragEnter, handleDocumentDragLeave, handleDocumentDragOver, handleDocumentDrop]);

    return (
        <div className={classNames('drop-file', {
            dragging,
            [className]: className
        })}
             onDrop={handleDrop}>

            <div className="drop-file-content">

                <UploadIcon/>
                <div className="drop-file-desc">Google Analytics CSV file</div>

                {children}

            </div>

        </div>
    );

};

DropFile.propTypes = {

    children: PropTypes.any,

    className: PropTypes.string,

    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,

    onGetFile: PropTypes.func

};

export default DropFile;
