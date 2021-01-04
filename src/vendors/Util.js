/**
 * @file Util.js
 */

/**
 * 计算小数位数
 * @param value
 * @returns {number}
 */
export function getDigitLength(value) {
    const eSplit = value.toString().split(/[eE]/);
    const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
}

/**
 * 添加数值的千分位
 * @param value 数值
 * @param removeDecimal 是否舍去小数部分，默认：false
 * @returns {any}
 */
export function formatMilli(value, removeDecimal = false) {

    if (removeDecimal) {
        value = Math.round(value);
    }

    if (!value) {
        return value;
    }

    const isNegative = +value < 0;
    value = /^-?(.*)$/.exec(value)[1];

    return (isNegative ? '-' : '') + value.toString().replace(/(^|\s)\d+/g,
        m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));

}

export default {
    getDigitLength,
    formatMilli
};
