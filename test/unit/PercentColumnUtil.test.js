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
