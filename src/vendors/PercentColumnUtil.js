/**
 * @file PercentColumnUtil.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

// Vendors
import round from 'lodash/round';
import repeat from 'lodash/repeat';
import {getDigitLength} from './Util';

/**
 * 是否是合法的百分比
 * @param value
 * @returns {boolean}
 */
export function isValidPercent(value) {
    return /^\-?\d+(\.\d+)?\%$/.test(value);
}

/**
 * 解析百分比
 * @param value
 * @returns {number}
 */
export function parsePercent(value) {

    if (!isValidPercent(value)) {
        return 0;
    }

    return +(value.split('%')[0]) / 100;

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

    const fixedValue = round(value * 100, precision),
        digitLen = getDigitLength(fixedValue);

    return `${fixedValue}${digitLen === 0 ? '.' : ''}${repeat('0', precision - digitLen)}%`;

}

export default {
    isValidPercent,
    parsePercent,
    formatPercent
};
