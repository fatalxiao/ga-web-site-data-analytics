/**
 * @file PercentColumnUtil.test.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

'use strict';

/* eslint-disable no-undef */

// Vendors
import {
    isValidPercent,
    formatPercent,
    getAveragePercent
} from 'vendors/PercentColumnUtil';

/**
 * isValidPercent 测试
 */
describe('isValidPercent test', () => {

    {
        const value = '0%';
        test(`isValidPercent ${value}`, () =>
            expect(isValidPercent(value)).toBe(true)
        );
    }

    {
        const value = '100%';
        test(`isValidPercent ${value}`, () =>
            expect(isValidPercent(value)).toBe(true)
        );
    }

    {
        const value = '-100%';
        test(`isValidPercent ${value}`, () =>
            expect(isValidPercent(value)).toBe(true)
        );
    }

    {
        const value = '0.0001%';
        test(`isValidPercent ${value}`, () =>
            expect(isValidPercent(value)).toBe(true)
        );
    }

    {
        const value = '0';
        test(`isValidPercent ${value}`, () =>
            expect(isValidPercent(value)).toBe(false)
        );
    }

    {
        const value = '1.0';
        test(`isValidPercent ${value}`, () =>
            expect(isValidPercent(value)).toBe(false)
        );
    }

    {
        const value = '0.0001';
        test(`isValidPercent ${value}`, () =>
            expect(isValidPercent(value)).toBe(false)
        );
    }

    {
        const value = '%';
        test(`isValidPercent ${value}`, () =>
            expect(isValidPercent(value)).toBe(false)
        );
    }

    {
        const value = '.%';
        test(`isValidPercent ${value}`, () =>
            expect(isValidPercent(value)).toBe(false)
        );
    }

});

/**
 * formatPercent 测试
 */
describe('formatPercent test', () => {

    {
        const value = 1;
        test(`formatPercent ${value}`, () =>
            expect(formatPercent(value)).toBe('100.00%')
        );
    }

    {
        const value = 0.1;
        test(`formatPercent ${value}`, () =>
            expect(formatPercent(value)).toBe('10.00%')
        );
    }

    {
        const value = 0.01;
        test(`formatPercent ${value}`, () =>
            expect(formatPercent(value)).toBe('1.00%')
        );
    }

    {
        const value = 0.001;
        test(`formatPercent ${value}`, () =>
            expect(formatPercent(value)).toBe('0.10%')
        );
    }

    {
        const value = 0.0001;
        test(`formatPercent ${value}`, () =>
            expect(formatPercent(value)).toBe('0.01%')
        );
    }

    {
        const value = 0.00001;
        test(`formatPercent ${value}`, () =>
            expect(formatPercent(value)).toBe('0.00%')
        );
    }

    {
        const value = null;
        test(`formatPercent ${value}`, () =>
            expect(formatPercent(value)).toBe('0.00%')
        );
    }

    {
        const value = '1';
        test(`formatPercent ${value}`, () =>
            expect(formatPercent(value)).toBe('100.00%')
        );
    }

});

/**
 * getAveragePercent 测试
 */
describe('getAveragePercent test', () => {

    {
        const value = ['1%'];
        test(`getAveragePercent [${value}]`, () =>
            expect(getAveragePercent(value)).toBe('1.00%')
        );
    }

    {
        const value = ['1%', '1%'];
        test(`getAveragePercent [${value}]`, () =>
            expect(getAveragePercent(value)).toBe('1.00%')
        );
    }

    {
        const value = ['0%', '1%'];
        test(`getAveragePercent [${value}]`, () =>
            expect(getAveragePercent(value)).toBe('0.50%')
        );
    }

    {
        const value = ['0%', '1%', '2%'];
        test(`getAveragePercent [${value}]`, () =>
            expect(getAveragePercent(value)).toBe('1.00%')
        );
    }

    {
        const value = ['0', '1%'];
        test(`getAveragePercent [${value}]`, () =>
            expect(getAveragePercent(value)).toBe('1.00%')
        );
    }

    {
        const value = ['%', '1%'];
        test(`getAveragePercent [${value}]`, () =>
            expect(getAveragePercent(value)).toBe('1.00%')
        );
    }

});
