/**
 * @file useDraggingOver.js
 * @author liangxiaojun(fatalxiao@163.com)
 */

import {useState, useMemo, useEffect, useCallback} from 'react';

// Vendors
import Event from 'alcedo-ui/_vendors/Event';

export default function useDraggingOver(params) {

    const

        /**
         * 默认的 params
         * @type {{el: Document}}
         */
        DEFAULT_PARAMS = useMemo(() => ({
            el: document
        }), []),

        /**
         * 合并 params
         * @type {{el: Document}}
         */
        mergedParams = useMemo(() => ({
            ...DEFAULT_PARAMS,
            ...params
        }), [params]),

        /**
         * 解构 params
         * @type {{el: Document}}
         */
        {el, onDragEnter, onDragLeave, onDragOver, onDrop} = mergedParams,

        /**
         * 是否拖拽进入 document 区域
         */
        [draggingOver, setDraggingover] = useState(false),

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
            setDraggingover(true);
            onDragEnter?.(e);
        }, [onDragEnter]),

        /**
         * 处理拖拽离开 document 区域
         * @type {Function}
         */
        handleDocumentDragLeave = useCallback(e => {
            if (e?.target === lastEnterEl) {
                setDraggingover(false);
                onDragLeave?.(e);
            }
        }, [lastEnterEl, onDragLeave]),

        /**
         * 处理拖拽离开 document 区域
         * @type {Function}
         */
        handleDocumentDragOver = useCallback(e => {
            e?.preventDefault();
            onDragOver?.(e);
        }, [onDragOver]),

        /**
         * 处理拖拽离开 document 区域
         * @type {Function}
         */
        handleDocumentDrop = useCallback(e => {
            e?.preventDefault();
            setDraggingover(false);
            onDrop?.(e);
        }, [onDrop]);

    /**
     * 初始化时绑定拖拽进出 document 区域的事件
     */
    useEffect(() => {

        Event.addEvent(el, 'dragenter', handleDocumentDragEnter);
        Event.addEvent(el, 'dragleave', handleDocumentDragLeave);
        Event.addEvent(el, 'dragover', handleDocumentDragOver);
        Event.addEvent(el, 'drop', handleDocumentDrop);

        return () => {
            Event.removeEvent(el, 'dragenter', handleDocumentDragEnter);
            Event.removeEvent(el, 'dragleave', handleDocumentDragLeave);
            Event.removeEvent(el, 'dragover', handleDocumentDragOver);
            Event.removeEvent(el, 'drop', handleDocumentDrop);
        };

    }, [el, handleDocumentDragEnter, handleDocumentDragLeave, handleDocumentDragOver, handleDocumentDrop]);

    return draggingOver;

}
