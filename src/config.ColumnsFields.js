/**
 * @file config.ColumnsFields.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

// Vendors
import sum from 'lodash/sum';
import mean from 'lodash/mean';
import {parseNumber, formatNumber} from 'vendors/NumberColumnUtil';
import {parseTime, formatTime} from 'vendors/TimeColumnUtil';
import {parsePercent, formatPercent} from 'vendors/PercentColumnUtil';

/**
 *  {
 *      name {string} 列名
 *      mappingIndex {number} 映射 excel 中的列索引
 *      sortingProp {function} 获取真正的排序字段（ 数据折叠时使用不同的排序字段 ）
 *      parse {function} 解析 excel 数据
 *      summary {function} 汇总回调
 *      bodyRenderer {function} table body 渲染回调
 *  }
 */
export default [{
    name: 'route',
    mappingIndex: 0,
    sortingProp: () => 'route',
    parse: value => value || '',
    bodyRenderer: (isDataCollapsed, rowData, rowIndex, colIndex, parentData, data, collapsed, depth, path) =>
        `${path?.map(row => row?.node?.route).join('/')}` || '/'
}, {
    name: 'pageViews',
    mappingIndex: 1,
    sortingProp: isDataCollapsed => isDataCollapsed ? 'allPageViews' : 'pageViews',
    parse: value => parseNumber(value) || 0,
    summary: node => {

        if (!node) {
            return;
        }

        if (!node.children || node.children.length < 1) {
            return node.allPageViews = +node.pageViews || 0;
        }

        node.allPageViews = (+node.pageViews || 0) + (sum(node.children.map(item => +item?.allPageViews || 0)) || 0);

    },
    bodyRenderer: (isDataCollapsed, rowData) => isDataCollapsed ?
        `${formatNumber(rowData?.pageViews) || 0} / ${formatNumber(rowData?.allPageViews) || 0}`
        :
        formatNumber(rowData?.pageViews) || 0
}, {
    name: 'uniquePageViews',
    mappingIndex: 2,
    sortingProp: isDataCollapsed => isDataCollapsed ? 'allUniquePageViews' : 'uniquePageViews',
    parse: value => parseNumber(value) || 0,
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
    bodyRenderer: (isDataCollapsed, rowData) =>
        isDataCollapsed ?
            `${formatNumber(rowData?.uniquePageViews) || 0} / ${formatNumber(rowData?.allUniquePageViews) || 0}`
            :
            formatNumber(rowData?.uniquePageViews) || 0
}, {
    name: 'averageTimeOnPage',
    mappingIndex: 3,
    sortingProp: () => 'averageTimeOnPage',
    parse: value => parseTime(value) || 0,
    summary: node => {

        if (!node || node.averageTimeOnPage || !node.children || node.children.length < 1) {
            return;
        }

        node.averageTimeOnPage = mean(node.children.map(child => child?.averageTimeOnPage)) || 0;

    },
    bodyRenderer: (isDataCollapsed, rowData) => formatTime(rowData.averageTimeOnPage)
}, {
    name: 'numberOfEntries',
    mappingIndex: 4,
    sortingProp: isDataCollapsed => isDataCollapsed ? 'allNumberOfEntries' : 'numberOfEntries',
    parse: value => parseNumber(value) || 0,
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
    bodyRenderer: (isDataCollapsed, rowData) => isDataCollapsed ?
        `${formatNumber(rowData?.numberOfEntries) || 0} / ${formatNumber(rowData?.allNumberOfEntries) || 0}`
        :
        formatNumber(rowData?.numberOfEntries) || 0
}, {
    name: 'bounceRate',
    mappingIndex: 5,
    sortingProp: () => 'bounceRate',
    parse: value => parsePercent(value) || 0,
    summary: node => {

        if (!node || node.bounceRate || !node.children || node.children.length < 1) {
            return;
        }

        node.bounceRate = mean(node.children.map(child => child?.bounceRate)) || 0;

    },
    bodyRenderer: (isDataCollapsed, rowData) => formatPercent(rowData.bounceRate)
}, {
    name: 'exitPercentage',
    mappingIndex: 6,
    sortingProp: () => 'exitPercentage',
    parse: value => parsePercent(value) || 0,
    summary: node => {

        if (!node || node.exitPercentage || !node.children || node.children.length < 1) {
            return;
        }

        node.exitPercentage = mean(node.children.map(child => child?.exitPercentage)) || 0;

    },
    bodyRenderer: (isDataCollapsed, rowData) => formatPercent(rowData.exitPercentage)
}];
