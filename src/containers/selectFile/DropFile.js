/**
 * @file DropFile.js
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
import 'scss/containers/selectFile/DropFile.scss';

const DropFile = ({
    children, className,
    onDragEnter, onDragLeave, onGetFile
}) => {

    const

        dropZone = useRef(),

        documentDraggingOver = useDraggingOver({
            onDragEnter,
            onDragLeave
        }),

        /**
         * 处理拖入文件 drop
         * @type {function(*): *}
         */
        handleDrop = useCallback(e => onGetFile?.(e?.dataTransfer?.files[0]), [onGetFile]),

        draggingOver = useDraggingOver({
            el: dropZone?.current,
            onDrop: handleDrop
        });

    return (
        <div ref={dropZone}
             className={classNames('drop-file', {
                 dragging: documentDraggingOver,
                 'dragging-over': draggingOver,
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
