/**
 * @file ArrowUpIcon.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import React from 'react';

// Vendors
import classNames from 'classnames';

const ArrowUpIcon = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={classNames('arrow-up-icon', {
             [className]: className
         })}
         viewBox="0 0 256 512">
        <path
            d="M3.515 168.97l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L111 92.113V468c0 6.627 5.373 12 12 12h10c6.627 0 12-5.373 12-12V92.113l83.444 83.928c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-116-116.485c-4.686-4.686-12.284-4.686-16.971 0L3.515 152c-4.687 4.686-4.687 12.284 0 16.97z"></path>
    </svg>
);

export default ArrowUpIcon;
