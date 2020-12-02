/**
 * @file config.ColumnsFields.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

// Vendors
import sum from 'lodash/sum';
import mean from 'lodash/mean';
import {parseTime, formatTime} from 'vendors/TimeColumnUtil';
import {parsePercent, formatPercent} from 'vendors/PercentColumnUtil';

/**
 *  {
 *      name {string} 列名
 *      mappingIndex {number} 映射 excel 中的列索引
 *      parse {function} 解析 excel 数据
 *      summary {function} 汇总回调
 *      bodyRenderer {function} table body 渲染回调
 *  }
 */
export default [{
    name: 'route',
    mappingIndex: 0,
    sortingProp: {
        default: 'route'
    },
    parse: value => value || '',
    bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path) =>
        `${path?.map(row => row?.node?.route).join('/')}` || '/'
}, {
    name: 'pageViews',
    mappingIndex: 1,
    sortingProp: {
        default: 'pageViews',
        collapsed: 'allPageViews'
    },
    parse: value => +value || 0,
    summary: node => {

        if (!node) {
            return;
        }

        if (!node.children || node.children.length < 1) {
            return node.allPageViews = +node.pageViews || 0;
        }

        node.allPageViews = (+node.pageViews || 0) + (sum(node.children.map(item => +item?.allPageViews || 0)) || 0);

    },
    bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path, isDataCollapsed) =>
        isDataCollapsed ?
            `${+rowData?.pageViews || 0} / ${+rowData?.allPageViews || 0}`
            :
            +rowData?.pageViews || 0
}, {
    name: 'uniquePageViews',
    mappingIndex: 2,
    sortingProp: {
        default: 'uniquePageViews',
        collapsed: 'allUniquePageViews'
    },
    parse: value => +value || 0,
    summary: node => {

        if (!node) {
            return;
        }

        if (!node.children || node.children.length < 1) {
            return node.allUniquePageViews = +node.uniquePageViews || 0;
        }

        node.allUniquePageViews = (+node.uniquePageViews || 0)
            + (sum(node.children.map(item => +item?.allUniquePageViews || 0)) || 0);

    },
    bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path, isDataCollapsed) =>
        isDataCollapsed ?
            `${+rowData?.uniquePageViews || 0} / ${+rowData?.allUniquePageViews || 0}`
            :
            +rowData?.uniquePageViews || 0
}, {
    name: 'averageTimeOnPage',
    mappingIndex: 3,
    sortingProp: {
        default: 'averageTimeOnPage'
    },
    parse: value => parseTime(value) || 0,
    summary: node => {

        if (!node || node.averageTimeOnPage || !node.children || node.children.length < 1) {
            return;
        }

        node.averageTimeOnPage = mean(node.children.map(child => child?.averageTimeOnPage)) || 0;

    },
    bodyRenderer: rowData => formatTime(rowData.averageTimeOnPage)
}, {
    name: 'numberOfEntries',
    mappingIndex: 4,
    sortingProp: {
        default: 'numberOfEntries',
        collapsed: 'allNumberOfEntries'
    },
    parse: value => +value || 0,
    summary: node => {

        if (!node) {
            return;
        }

        if (!node.children || node.children.length < 1) {
            return node.allNumberOfEntries = +node.numberOfEntries || 0;
        }

        node.allNumberOfEntries = (+node.numberOfEntries || 0)
            + (sum(node.children.map(item => +item?.allNumberOfEntries || 0)) || 0);

    },
    bodyRenderer: (rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path, isDataCollapsed) =>
        isDataCollapsed ?
            `${+rowData?.numberOfEntries || 0} / ${+rowData?.allNumberOfEntries || 0}`
            :
            +rowData?.numberOfEntries || 0
}, {
    name: 'bounceRate',
    mappingIndex: 5,
    sortingProp: {
        default: 'bounceRate'
    },
    parse: value => parsePercent(value) || 0,
    summary: node => {

        if (!node || node.bounceRate || !node.children || node.children.length < 1) {
            return;
        }

        node.bounceRate = mean(node.children.map(child => child?.bounceRate)) || 0;

    },
    bodyRenderer: rowData => formatPercent(rowData.bounceRate)
}, {
    name: 'exitPercentage',
    mappingIndex: 6,
    sortingProp: {
        default: 'exitPercentage'
    },
    parse: value => parsePercent(value) || 0,
    summary: node => {

        if (!node || node.exitPercentage || !node.children || node.children.length < 1) {
            return;
        }

        node.exitPercentage = mean(node.children.map(child => child?.exitPercentage)) || 0;

    },
    bodyRenderer: rowData => formatPercent(rowData.exitPercentage)
}];
