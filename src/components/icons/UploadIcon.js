/**
 * @file UploadIcon.js
 */

import React from 'react';
import PropTypes from 'prop-types';

// Vendors
import classNames from 'classnames';

// Styles
import './UploadIcon.scss';

const UploadIcon = ({className, ...restProps}) => (
    <div {...restProps}
         className={classNames('upload-icon', {
             [className]: className
         })}>

        <i className="fal fa-long-arrow-up arrow-up-icon"></i>

        <svg className="cloud-svg"
             width="250"
             height="200">

            <mask id="background-mask">
                <rect x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="#fff"/>
                <path transform="translate(0 13)"
                      d="M223.3,80.8c1.1-3.9,1.7-7.9,1.7-12c0-24.2-19.6-43.8-43.7-43.8c-6.5,0-12.9,1.4-18.8,4.2C140.7-1.8,97.8-9.3,66.8,12.5C49.3,24.8,38.6,44.4,37.6,65.7C8.3,76-7.1,108.1,3.2,137.4c7.9,22.5,29.2,37.6,53.1,37.6H200c27.6,0,50-22.4,50-50C250,106.4,239.7,89.4,223.3,80.8z"/>
                <rect x="109"
                      y="184"
                      width="32"
                      height="20"/>
            </mask>

            <rect width="100%"
                  height="100%"
                  fill="#fafafa"
                  mask="url(#background-mask)"/>

            <mask id="cloud-mask">
                <rect x="0"
                      y="0"
                      width="250"
                      height="175"
                      fill="#fff"/>
                <rect x="109"
                      y="160"
                      width="32"
                      height="20"/>
            </mask>

            <path transform="translate(0 13)"
                  d="M223.3,80.8c1.1-3.9,1.7-7.9,1.7-12c0-24.2-19.6-43.7-43.7-43.7c-6.5,0-12.9,1.4-18.8,4.2C140.7-1.8,97.8-9.3,66.7,12.5C49.3,24.8,38.5,44.4,37.6,65.7C8.3,76-7.1,108.1,3.2,137.4c7.9,22.5,29.2,37.6,53.1,37.6H200c27.6,0,50-22.4,50-50C250,106.4,239.7,89.4,223.3,80.8z M200,162.5H56.3c-24.2,0-43.8-19.6-43.8-43.7c0-21.9,16.2-40.5,37.9-43.4C50.1,73.2,50,71,50,68.7c0-31.1,25.2-56.3,56.3-56.2c22.8,0,43.4,13.8,52.1,35c11.8-12.6,31.6-13.3,44.2-1.5c11.8,11,13.3,29.2,3.4,42c20.4,3.3,34.4,22.5,31.1,42.9C234.1,149.1,218.4,162.5,200,162.5z"
                  fill="#eaeaea"
                  mask="url(#cloud-mask)"/>

        </svg>

    </div>
);

UploadIcon.propTypes = {

    className: PropTypes.string,

    activated: PropTypes.bool

};

export default UploadIcon;
