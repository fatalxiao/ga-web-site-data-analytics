/**
 * @file TimeColumnUtil.test.js
 */

'use strict';

/* eslint-disable no-undef */

// Vendors
import {
    isValidTime,
    parseTime,
    fillZero,
    formatTime
} from 'vendors/TimeColumnUtil';

/**
 * isValidTime 测试
 */
describe('isValidTime test', () => {

    {
        const value = '00:00:00';
        test(`isValidTime ${value}`, () =>
            expect(isValidTime(value)).toBe(true)
        );
    }

    {
        const value = '10:10:10';
        test(`isValidTime ${value}`, () =>
            expect(isValidTime(value)).toBe(true)
        );
    }

    {
        const value = '10:10';
        test(`isValidTime ${value}`, () =>
            expect(isValidTime(value)).toBe(false)
        );
    }

    {
        const value = '10';
        test(`isValidTime ${value}`, () =>
            expect(isValidTime(value)).toBe(false)
        );
    }

    {
        const value = '1000:00:10';
        test(`isValidTime ${value}`, () =>
            expect(isValidTime(value)).toBe(true)
        );
    }

});

/**
 * parseTime 测试
 */
describe('parseTime test', () => {

    {
        const value = '00:00:00';
        test(`parseTime ${value}`, () =>
            expect(parseTime(value)).toBe(0)
        );
    }

    {
        const value = '00:00:01';
        test(`parseTime ${value}`, () =>
            expect(parseTime(value)).toBe(1)
        );
    }

    {
        const value = '00:00:20';
        test(`parseTime ${value}`, () =>
            expect(parseTime(value)).toBe(20)
        );
    }

    {
        const value = '00:01:00';
        test(`parseTime ${value}`, () =>
            expect(parseTime(value)).toBe(60)
        );
    }

    {
        const value = '00:20:20';
        test(`parseTime ${value}`, () =>
            expect(parseTime(value)).toBe(20 * 60 + 20)
        );
    }

    {
        const value = '01:20:20';
        test(`parseTime ${value}`, () =>
            expect(parseTime(value)).toBe(60 * 60 + 20 * 60 + 20)
        );
    }

    {
        const value = '20:20:20';
        test(`parseTime ${value}`, () =>
            expect(parseTime(value)).toBe(20 * 60 * 60 + 20 * 60 + 20)
        );
    }

    {
        const value = '20:20';
        test(`parseTime ${value}`, () =>
            expect(parseTime(value)).toBe(0)
        );
    }

    {
        const value = '20';
        test(`parseTime ${value}`, () =>
            expect(parseTime(value)).toBe(0)
        );
    }

});

/**
 * fillZero 测试
 */
describe('fillZero test', () => {

    {
        const value = '0';
        test(`fillZero ${value}`, () =>
            expect(fillZero(value)).toBe('00')
        );
    }

    {
        const value = '6';
        test(`fillZero ${value}`, () =>
            expect(fillZero(value)).toBe('06')
        );
    }

    {
        const value = '10';
        test(`fillZero ${value}`, () =>
            expect(fillZero(value)).toBe('10')
        );
    }

    {
        const value = '100';
        test(`fillZero ${value}`, () =>
            expect(fillZero(value)).toBe('100')
        );
    }

    {
        const value = 0;
        test(`fillZero ${value}`, () =>
            expect(fillZero(value)).toBe('00')
        );
    }

    {
        const value = -1;
        test(`fillZero ${value}`, () =>
            expect(fillZero(value)).toBe('-1')
        );
    }

});

/**
 * formatTime 测试
 */
describe('formatTime test', () => {

    {
        const value = 0;
        test(`formatTime ${value}`, () =>
            expect(formatTime(value)).toBe('00:00:00')
        );
    }

    {
        const value = 1;
        test(`formatTime ${value}`, () =>
            expect(formatTime(value)).toBe('00:00:01')
        );
    }

    {
        const value = 20;
        test(`formatTime ${value}`, () =>
            expect(formatTime(value)).toBe('00:00:20')
        );
    }

    {
        const value = 59;
        test(`formatTime ${value}`, () =>
            expect(formatTime(value)).toBe('00:00:59')
        );
    }

    {
        const value = 60;
        test(`formatTime ${value}`, () =>
            expect(formatTime(value)).toBe('00:01:00')
        );
    }

    {
        const value = 20 * 60;
        test(`formatTime ${value}`, () =>
            expect(formatTime(value)).toBe('00:20:00')
        );
    }

    {
        const value = 20 * 60 + 20;
        test(`formatTime ${value}`, () =>
            expect(formatTime(value)).toBe('00:20:20')
        );
    }

    {
        const value = 60 * 60;
        test(`formatTime ${value}`, () =>
            expect(formatTime(value)).toBe('01:00:00')
        );
    }

    {
        const value = 60 * 60 + 20 * 60 + 20;
        test(`formatTime ${value}`, () =>
            expect(formatTime(value)).toBe('01:20:20')
        );
    }

    {
        const value = 20 * 60 * 60 + 20 * 60 + 20;
        test(`formatTime ${value}`, () =>
            expect(formatTime(value)).toBe('20:20:20')
        );
    }

    {
        const value = -1;
        test(`formatTime ${value}`, () =>
            expect(formatTime(value)).toBe('00:00:00')
        );
    }

});
