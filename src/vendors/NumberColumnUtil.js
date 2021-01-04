/**
 * @file NumberColumnUtil.js
 */

// Vendors
import {formatMilli} from './Util';

/**
 * 数值格式的正则
 * @type {RegExp}
 */
const REG = /^[\d,]+(.\d+)?$/;

/**
 * 是否是合法的数值
 * @param value
 * @returns {boolean}
 */
export function isValidNumber(value) {
    return REG.test(value);
}

/**
 * 解析数值
 * @param value
 * @returns {number}
 */
export function parseNumber(value) {

    if (!isValidNumber(value)) {
        return 0;
    }

    return +(value.replace(',', '')) || 0;

}

/**
 * 格式化数值
 * @param value
 * @returns {number}
 */
export function formatNumber(value) {

    if (isNaN(value)) {
        return '0';
    }

    return formatMilli(value);

}

export default {
    isValidNumber,
    parseNumber,
    formatNumber
};
