/**
 * @file Util.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
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

export default {
    getDigitLength
};
