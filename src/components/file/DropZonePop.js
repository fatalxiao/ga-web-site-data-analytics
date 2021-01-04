/**
 * @file DropZonePop.js
 */

import React, {useMemo, useCallback} from 'react';

// Components
import PositionPop from 'alcedo-ui/_PositionPop';
import DropZone from './DropZone';

// Hooks
import useDraggingOver from 'hooks/useDraggingOver';

// Vendors
import addClass from 'dom-helpers/addClass';
import removeClass from 'dom-helpers/removeClass';
import hasClass from 'dom-helpers/hasClass';

// Styles
import './DropZonePop.scss';

const DropZonePop = () => {

    const

        /**
         * 是否在 document 上 dragging over
         */
        documentDraggingOver = useDraggingOver(),

        /**
         * body 上 blur 的 class name
         * @type {string}
         */
        blurClassName = useMemo(() => 'drop-zone-pop-blur', []),

        /**
         * 为 body 添加 class
         * @type {Function}
         */
        handleRender = useCallback(() => {
            const body = document.querySelector('body');
            if (!hasClass(body, blurClassName)) {
                addClass(body, blurClassName);
            }
        }, []),

        /**
         * 移除 body 上的 class
         * @type {Function}
         */
        handleDestroy = useCallback(() => {
            const body = document.querySelector('body');
            if (hasClass(body, blurClassName)) {
                removeClass(body, blurClassName);
            }
        }, []);

    return (
        <PositionPop className="drop-zone-pop"
                     modalClassName="drop-zone-pop-modal"
                     visible={documentDraggingOver}
                     position={PositionPop.Position.CENTER}
                     showModal={true}
                     onRender={handleRender}
                     onDestroy={handleDestroy}>
            <div className="drop-zone-pop-content">
                <DropZone>
                    <div className="drop-zone-pop-desc">Drag and drop your file here</div>
                </DropZone>
            </div>
        </PositionPop>
    );

};

export default DropZonePop;
