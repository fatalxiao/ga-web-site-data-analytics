/**
 * @file DropZone.js
 */

import React, {useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

// Icons
import UploadIcon from 'components/icons/UploadIcon';

// Hooks
import useDraggingOver from 'hooks/useDraggingOver';

// Vendors
import classNames from 'classnames';

// Styles
import './DropZone.scss';

const DropZone = ({
    children, className,
    onDragEnter, onDragLeave, updateFile
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
        handleDrop = useCallback(e => updateFile?.(e?.dataTransfer?.files[0]), [updateFile]),

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

    updateFile: PropTypes.func

};

export default connect(null, dispatch => bindActionCreators({
    updateFile: actions.updateFile
}, dispatch))(DropZone);
