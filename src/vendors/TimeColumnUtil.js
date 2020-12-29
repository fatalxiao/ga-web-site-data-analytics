/**
 * @file TimeColumnUtil.js
 * @author liangxiaojun(fatalxiao@163.com)
 */

/**
 * 时间格式的正则
 * @type {RegExp}
 */
const REG = /^(\d+):(\d{2}):(\d{2})$/;

/**
 * 是否是合法的时间
 * @param value
 * @returns {boolean}
 */
export function isValidTime(value) {

    const matched = REG.exec(value);

    return !(!matched || !matched[1] || !matched[2] || !matched[3] || +matched[2] > 60 || +matched[3] > 60);

}

/**
 * 解析时间（ 如 00:02:30 ）含有多少秒
 * @param value
 * @returns {number}
 */
export function parseTime(value) {

    if (!isValidTime(value)) {
        return 0;
    }

    const matched = REG.exec(value);

    if (!matched) {
        return 0;
    }

    return (+matched[1] || 0) * 3600 + (+matched[2] || 0) * 60 + (+matched[3] || 0);

}

/**
 * 时间补零
 * @param value
 * @returns {string}
 */
export function fillZero(value) {
    return (+value < 10) && (+value >= 0) ? `0${value}` : `${value}`;
}

/**
 * 格式化时间
 * @param value
 * @returns {string}
 */
export function formatTime(value) {

    if (!value || value < 0) {
        return '00:00:00';
    }

    const hours = parseInt(value / 3600, 10),
        minutes = parseInt(value % 3600 / 60, 10),
        seconds = parseInt(value % 60, 10);

    return `${fillZero(hours)}:${fillZero(minutes)}:${fillZero(seconds)}`;

}

export default {
    isValidTime,
    parseTime,
    fillZero,
    formatTime
};
