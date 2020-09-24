/**
 * @file Util.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

// Statics
import ColumnsFields from 'statics/ColumnsFields';

// Vendors
import Util from 'alcedo-ui/_vendors/Util';

/**
 * 根据逗号，split 行
 * @param rowString
 */
export function splitCSVRow(rowString) {

    const reg = /(?:(?:\,\"([^\"]+)\")|(?:\,([^\"\,]*)))/g,
        str = `,${rowString}`,
        result = {};

    ColumnsFields.forEach((field, index) => {

        const matched = reg.exec(str);

        if (!matched) {
            return;
        }

        const data = matched?.[1] || matched?.[2];

        // 第一列
        if (index === 0) {
            return result[field] = data || null;
        }

        result[field] = data?.replace(',', '') || null;

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

/**
 * 计算 pageViews 列的求和
 * @param root
 * @param field
 * @returns {number}
 */
export function getPageViewsTotalCount(root, field = ColumnsFields[1]) {

    let result = 0;

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

export default {
    getMatchedChildNode,
    addPath,
    getPageViewsTotalCount,
    getSortingCollapsedData,
    getPageViewsSortingCollapsedData,
    getSortingData
};
