/**
 * @file Util.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

// Statics
import ColumnsFields from 'src/config.ColumnsFields';

// Vendors
import mean from 'lodash/mean';
import URI from 'urijs';
import Util from 'alcedo-ui/_vendors/Util';

/**
 * 根据逗号，split 行
 * @param rowString
 */
export function splitCSVRow(rowString) {

    const reg = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g,
        result = {};

    ColumnsFields.forEach((field, index) => {

        const matched = reg.exec(rowString);

        if (!matched) {
            return null;
        }

        const data = matched?.[1] || matched?.[2] || matched?.[3];

        // 第一列
        if (index === 0) {
            return result[field.name] = data || null;
        }

        result[field.name] = data?.replace(',', '') || null;

    });

    return result;

}

/**
 * 获取匹配 route 的子节点
 * @param node
 * @param path
 * @param collapsedField
 * @returns {{}|*}
 */
export function getMatchedChildNode(node, path, collapsedField) {

    if (!node.children) {
        node.children = [{}];
        return node.children[0];
    }

    const childIndex = node.children.findIndex(child => child?.[collapsedField] === path);

    // 找到了
    if (childIndex >= 0) {
        return node.children[childIndex];
    }

    // 没找到
    node.children.push({});
    return node.children[node.children.length - 1];

}

/**
 * 递归往节点里添加子节点
 * @param node
 * @param pathArray
 * @param rowData
 * @param collapsedField
 */
export function addPath(node, pathArray, rowData, collapsedField) {

    if (!node || !pathArray || pathArray.length < 1) {
        return;
    }

    if (!node[collapsedField]) {
        node[collapsedField] = pathArray[0];
    }

    // 找到了最后的节点
    if (pathArray.length === 1 && rowData) {
        return Object.keys(rowData).forEach(key => {

            if (key === collapsedField) {
                return;
            }

            node[key] = rowData[key];

        });
    }

    // 还要继续往下走
    if (pathArray.length > 1) {
        addPath(getMatchedChildNode(node, pathArray?.[1], collapsedField), pathArray.slice(1), rowData, collapsedField);
    }

}

export function summaryCollapsedData(root) {

    Util.postOrderTraverse(root, node =>
        ColumnsFields.forEach(field => field?.summary?.(node))
    );

    return root;

}

/**
 *
 * @param data
 * @returns {Array|*[]}
 */
export function collapseData(data) {

    if (!data || data.length < 1) {
        return [];
    }

    const root = {};

    data?.forEach(row => {

        if (!row?.[ColumnsFields[0].name]) {
            return;
        }

        const url = URI(row[ColumnsFields[0].name]),
            path = url.path(),
            query = url.query(),
            pathArray = path?.split('/');

        if (!path || !pathArray || pathArray.length < 1) {
            return;
        }

        // 将 query 部分作为下一层的 path
        if (query && query.length > 0) {
            pathArray.push(`?${query}`);
        }

        // 添加子节点
        addPath(
            root, pathArray[1] === '' ? pathArray.slice(1) : pathArray, row, ColumnsFields[0].name
        );

    });

    return [summaryCollapsedData(root)];

}

/**
 * 计算 pageViews 列的求和
 * @param root
 * @param field
 * @returns {number}
 */
export function getPageViewsTotalCount(root, field) {

    let result = 0;

    if (!root || !field) {
        return result;
    }

    Util.preOrderTraverse(root, node => {
        result += +(node[field] || 0);
    });

    return result;

}

/**
 * 获取排序后的数据
 * @param root
 * @param sorting
 * @returns {*}
 */
export function getSortingCollapsedData(root, sorting) {

    if (!root || !sorting) {
        return root;
    }

    Util.preOrderTraverse(root, node => {
        if (node?.children?.length > 0) {
            node.children.sort((a, b) => {
                if (!isNaN(a[sorting.prop]) && !isNaN(b[sorting.prop])) {
                    return (+a[sorting.prop] - +b[sorting.prop]) * sorting.type;
                } else {
                    return (a[sorting.prop] + '').localeCompare(b[sorting.prop] + '') * sorting.type;
                }
            });
        }
    });

    return root;

}

/**
 * 获取排序后的数据（ 针对 PageViews 这一列的排序 ）
 * @param root
 * @param sorting
 * @returns {*}
 */
export function getPageViewsSortingCollapsedData(root, sorting) {

    if (!root || !sorting) {
        return root;
    }

    Util.preOrderTraverse(root, node => {
        if (node?.children?.length > 0) {
            node.children.sort((a, b) => {
                const aCount = getPageViewsTotalCount(a),
                    bCount = getPageViewsTotalCount(b);
                return (+aCount - +bCount) * sorting.type;
            });
        }
    });

    return root;

}

/**
 * 获取排序后的数据
 * @param data
 * @param sorting
 * @returns {*}
 */
export function getSortingData(data, sorting) {

    if (!data || !sorting) {
        return data;
    }

    return data.sort((a, b) => {
        if (!isNaN(a[sorting.prop]) && !isNaN(b[sorting.prop])) {
            return (+a[sorting.prop] - +b[sorting.prop]) * sorting.type;
        } else {
            return (a[sorting.prop] + '').localeCompare(b[sorting.prop] + '') * sorting.type;
        }
    });

}

/**
 * 是否是合法的时间
 * @param value
 * @returns {boolean}
 */
export function isValidTime(value) {
    return /^\d+\:\d{2}\:\d{2}$/.test(value);
}

/**
 * 计算时间（ 如 0:02:30 ）含有多少秒
 * @param value
 * @returns {number}
 */
export function countTime(value) {

    if (!isValidTime(value)) {
        return 0;
    }

    const matched = /^(\d+)\:(\d{2})\:(\d{2})$/.exec(value);

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
    return +value < 10 ? `0${value}` : value;
}

/**
 * 格式化时间
 * @param value
 * @returns {string}
 */
export function formatTime(value) {

    if (!value) {
        return '00:00:00';
    }

    const hours = parseInt(value / 3600),
        minutes = parseInt(value % 3600 / 60),
        seconds = parseInt(value % 60);

    return `${fillZero(hours)}:${fillZero(minutes)}:${fillZero(seconds)}`;

}

/**
 * 获取一组时间的平均时间
 * @param data
 * @returns {number}
 */
export function getAverageTime(data) {

    if (!data || data.length < 1) {
        return 0;
    }

    return formatTime(mean(data.map(item => {

        if (!item || !isValidTime(item)) {
            return 0;
        }

        return countTime(item);

    })));

}

export default {
    getMatchedChildNode,
    addPath,
    summaryCollapsedData,
    collapseData,
    getPageViewsTotalCount,
    getSortingCollapsedData,
    getPageViewsSortingCollapsedData,
    getSortingData,
    isValidTime,
    countTime,
    formatTime,
    getAverageTime
};
