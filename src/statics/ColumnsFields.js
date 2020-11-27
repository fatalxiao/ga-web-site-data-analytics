/**
 * @file ColumnsFields.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

import sum from 'lodash/sum';

/**
 *  {
 *      name {string} 列名
 *      mappingIndex {number} 映射 excel 中的列索引
 *      summary {function} 汇总回调
 *  }
 */
export default [{
    name: 'route',
    mappingIndex: 0,
    bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path) =>
        `${path?.map(row => row?.node?.route).join('/')}` || '/'
}, {
    name: 'pageViews',
    mappingIndex: 1,
    summary: node => {

        if (!node) {
            return;
        }

        if (!node.children || node.children.length < 1) {
            return node.allPageViews = +node.pageViews || 0;
        }

        return node.allPageViews = (+node.pageViews || 0) + sum(node.children.map(item => +item?.allPageViews || 0));

    },
    bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path, isDataCollapsed) =>
        isDataCollapsed ?
            `${+rowData?.pageViews || 0} / ${+rowData?.allPageViews || 0}`
            :
            +rowData?.pageViews || 0
}, {
    name: 'uniquePageViews',
    mappingIndex: 2,
    summary: node => {

        if (!node) {
            return;
        }

        if (!node.children || node.children.length < 1) {
            return node.allUniquePageViews = +node.uniquePageViews || 0;
        }

        return node.allUniquePageViews = (+node.uniquePageViews || 0)
            + sum(node.children.map(item => +item?.allUniquePageViews || 0));

    },
    bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path, isDataCollapsed) =>
        isDataCollapsed ?
            `${+rowData?.uniquePageViews || 0} / ${+rowData?.allUniquePageViews || 0}`
            :
            +rowData?.uniquePageViews || 0
}, {
    name: 'averageTimeOnPage',
    mappingIndex: 3,
    bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path, isDataCollapsed) =>
        rowData.averageTimeOnPage
}, {
    name: 'numberOfEntries',
    mappingIndex: 4,
    bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path, isDataCollapsed) =>
        rowData.numberOfEntries
}, {
    name: 'bounceRate',
    mappingIndex: 5,
    bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path, isDataCollapsed) =>
        rowData.bounceRate
}, {
    name: 'exitPercentage',
    mappingIndex: 6,
    bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path, isDataCollapsed) =>
        rowData.exitPercentage
}];
