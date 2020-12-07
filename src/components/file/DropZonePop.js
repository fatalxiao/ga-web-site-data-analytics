/**
 * @file DropZonePop.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';

// Components
import PositionPop from 'alcedo-ui/_PositionPop';
import DropZone from './DropZone';

// Hooks
import useDraggingOver from 'hooks/useDraggingOver';

// Styles
import './DropZonePop.scss';

const DropZonePop = () => {

    const

        /**
         * 是否在 document 上 dragging over
         */
        documentDraggingOver = useDraggingOver();

    return (
        <PositionPop className="drop-zone-pop"
                     modalClassName="drop-zone-pop-modal"
                     visible={documentDraggingOver}
                     position={PositionPop.Position.CENTER}
                     showModal={true}>
            <div className="drop-zone-pop-content">
                <DropZone>
                    <div className="drop-zone-pop-desc">Drag and drop your file here</div>
                </DropZone>
            </div>
        </PositionPop>
    );

};

export default DropZonePop;
