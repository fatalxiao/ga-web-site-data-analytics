/**
 * @file BrowseFileButton.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React, {Fragment, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';

// Components
import BrowseFile from 'components/BrowseFile';
import RaisedButton from 'alcedo-ui/RaisedButton';

// Vendors
import classNames from 'classnames';

// Styles
import './BrowseFileButton.scss';

const BrowseFileButton = ({
    className,
    ...restProps
}) => {

    const

        /**
         * browse file ref
         * @type {React.MutableRefObject<undefined>}
         */
        browseFileRef = useRef(),

        /**
         * 选择文件
         */
        chooseFile = useCallback(() => browseFileRef?.current?.click?.(), [browseFileRef]);

    return (
        <Fragment>

            <BrowseFile ref={browseFileRef}/>

            <RaisedButton {...restProps}
                          className={classNames('browse-file-button', {
                              [className]: className
                          })}
                          onClick={chooseFile}/>

        </Fragment>
    );

};

BrowseFileButton.propTypes = {
    className: PropTypes.string
};

export default BrowseFileButton;
