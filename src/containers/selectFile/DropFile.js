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
    children, className
}) => {

    const [dragging, setDragging] = useState(false),

        [draggingOver, setDraggingOver] = useState(false),

        handleWindowDragEnter = useCallback(() => setDragging(true), []),
        handleWindowDragLeave = useCallback(() => setDragging(false), []);

    useEffect(() => {

        Event.addEvent(document, 'dragenter', handleWindowDragEnter);
        Event.addEvent(document, 'dragleave', handleWindowDragLeave);

        return () => {
            Event.removeEvent(document, 'dragenter', handleWindowDragEnter);
            Event.removeEvent(document, 'dragleave', handleWindowDragLeave);
        };

    }, []);

    return (
        <div className={classNames('drop-file', {
            dragging,
            [className]: className
        })}>

            <div className="drop-file-content">

                <UploadIcon/>
                <div className="drop-file-desc">GA CSV file</div>

                {children}

            </div>

        </div>
    );

};

DropFile.propTypes = {

    children: PropTypes.any,

    className: PropTypes.string

};

export default DropFile;
