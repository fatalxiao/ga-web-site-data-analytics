/**
 * @file PercentColumnUtil.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

// Vendors
import mean from 'lodash/mean';
import round from 'lodash/round';
import repeat from 'lodash/repeat';
import {getDigitLength} from './Util';

/**
 * 是否是合法的百分比
 * @param value
 * @returns {boolean}
 */
export function isValidPercent(value) {
    return /^\-?\d+(\.\d+)?$/.test(value);
}

/**
 * 格式化百分比
 * @param value
 * @returns {string}
 */
export function formatPercent(value, precision = 2) {

    if (!value) {
        value = 0;
    }

    const fixedValue = value * 100,
        digitLen = getDigitLength(fixedValue);

    if (digitLen === precision) {
        return `${fixedValue}%`;
    } else if (digitLen > precision) {
        return `${round(fixedValue, precision)}%`;
    }

    return `${fixedValue}${digitLen === 0 ? '.' : ''}${repeat('0', precision - digitLen)}%`;

}

/**
 * 获取一组时间的平均百分比
 * @param data
 * @returns {number}
 */
export function getAveragePercent(data, precision = 2) {

    if (!data || data.length < 1) {
        return formatPercent(undefined, precision);
    }

    return formatPercent(mean(data.map(value => {

        if (!value || !isValidPercent(value)) {
            return 0;
        }

        return +value.split('%')[0] / 100;

    })), precision);

}

export default {
    isValidPercent,
    formatPercent,
    getAveragePercent
};
