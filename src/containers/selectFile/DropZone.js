/**
 * @file DropZone.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

// Icons
import UploadIcon from 'components/UploadIcon';

// Hooks
import useDraggingOver from 'hooks/useDraggingOver';

// Vendors
import classNames from 'classnames';

// Styles
import 'scss/containers/selectFile/DropZone.scss';

const DropZone = ({
    children, className,
    onDragEnter, onDragLeave, onGetFile
}) => {

    const

        /**
         *
         * @type {React.MutableRefObject<undefined>}
         */
        dropZone = useRef(),

        /**
         * 是否在 document 上 dragging over
         */
        documentDraggingOver = useDraggingOver({
            onDragEnter,
            onDragLeave
        }),

        /**
         * 处理拖入文件 drop
         * @type {function(*): *}
         */
        handleDrop = useCallback(e => onGetFile?.(e?.dataTransfer?.files[0]), [onGetFile]),

        /**
         * 是否在当前组件上 dragging over
         */
        draggingOver = useDraggingOver({
            el: dropZone?.current,
            onDrop: handleDrop
        });

    return (
        <div ref={dropZone}
             className={classNames('drop-zone', {
                 dragging: documentDraggingOver,
                 'dragging-over': draggingOver,
                 [className]: className
             })}
             onDrop={handleDrop}>

            <div className="drop-zone-content">

                <UploadIcon/>
                <div className="drop-zone-desc">Google Analytics CSV file</div>

                {children}

            </div>

        </div>
    );

};

DropZone.propTypes = {

    children: PropTypes.any,

    className: PropTypes.string,

    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,

    onGetFile: PropTypes.func

};

export default DropZone;
