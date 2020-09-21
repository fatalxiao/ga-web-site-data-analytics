/**
 * @file Util.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

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

export default {
    getMatchedChildNode,
    addPath
};
