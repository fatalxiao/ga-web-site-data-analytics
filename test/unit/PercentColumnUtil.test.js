/**
 * @file PercentColumnUtil.test.js
 */

'use strict';

/* eslint-disable no-undef */

// Vendors
import {
    isValidPercent,
    parsePercent,
    formatPercent
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
 * parsePercent 测试
 */
describe('parsePercent test', () => {

    {
        const value = '0%';
        test(`parsePercent ${value}`, () =>
            expect(parsePercent(value)).toBe(0)
        );
    }

    {
        const value = '0.0%';
        test(`parsePercent ${value}`, () =>
            expect(parsePercent(value)).toBe(0)
        );
    }

    {
        const value = '0.00%';
        test(`parsePercent ${value}`, () =>
            expect(parsePercent(value)).toBe(0)
        );
    }

    {
        const value = '1.00%';
        test(`parsePercent ${value}`, () =>
            expect(parsePercent(value)).toBe(0.01)
        );
    }

    {
        const value = '20.00%';
        test(`parsePercent ${value}`, () =>
            expect(parsePercent(value)).toBe(0.2)
        );
    }

    {
        const value = '100.00%';
        test(`parsePercent ${value}`, () =>
            expect(parsePercent(value)).toBe(1)
        );
    }

    {
        const value = '1000.00%';
        test(`parsePercent ${value}`, () =>
            expect(parsePercent(value)).toBe(10)
        );
    }

    {
        const value = '1000.10%';
        test(`parsePercent ${value}`, () =>
            expect(parsePercent(value)).toBe(10.001)
        );
    }

    {
        const value = '1000.10';
        test(`parsePercent ${value}`, () =>
            expect(parsePercent(value)).toBe(0)
        );
    }

    {
        const value = '%';
        test(`parsePercent ${value}`, () =>
            expect(parsePercent(value)).toBe(0)
        );
    }

});

/**
 * formatPercent 测试
 */
describe('formatPercent test', () => {

    {
        const value = 0;
        test(`formatPercent ${value}`, () =>
            expect(formatPercent(value)).toBe('0.00%')
        );
    }

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
        const value = '0';
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
