export function getMatchedChildNode(node, path) {

    if (!node.children) {
        node.children = [{}];
        return node.children[0];
    }

    const childIndex = node.children.findIndex(child => child?.[0] === path);

    // 找到了
    if (childIndex >= 0) {
        return node.children[childIndex];
    }

    // 没找到
    node.children.push({});
    return node.children[node.children.length - 1];

}

export function addPath(node, pathArray, rowData) {

    if (!node || !pathArray || pathArray.length < 1 || node[0] !== pathArray[0]) {
        return;
    }

    // 找到了最后的节点
    if (pathArray.length === 1 && rowData) {
        return Object.keys(rowData).forEach(key => {

            if (key === '0') {
                return;
            }

            node[key] = rowData[key];

        });
    }

    // 还要继续往下走
    if (pathArray.length > 1) {
        addPath(getMatchedChildNode(node, pathArray?.[1]), pathArray.slice(1), rowData);
    }

}

export default {
    addPath
};
