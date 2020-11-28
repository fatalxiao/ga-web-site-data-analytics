/**
 * @file TimeColumnUtil.test.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

'use strict';

/* eslint-disable no-undef */

// Vendors
import {
    isValidTime,
    countTime,
    fillZero,
    formatTime,
    getAverageTime
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
 * countTime 测试
 */
describe('countTime test', () => {

    {
        const value = '00:00:00';
        test(`countTime ${value}`, () =>
            expect(countTime(value)).toBe(0)
        );
    }

    {
        const value = '00:00:01';
        test(`countTime ${value}`, () =>
            expect(countTime(value)).toBe(1)
        );
    }

    {
        const value = '00:00:20';
        test(`countTime ${value}`, () =>
            expect(countTime(value)).toBe(20)
        );
    }

    {
        const value = '00:01:00';
        test(`countTime ${value}`, () =>
            expect(countTime(value)).toBe(60)
        );
    }

    {
        const value = '00:20:20';
        test(`countTime ${value}`, () =>
            expect(countTime(value)).toBe(20 * 60 + 20)
        );
    }

    {
        const value = '01:20:20';
        test(`countTime ${value}`, () =>
            expect(countTime(value)).toBe(60 * 60 + 20 * 60 + 20)
        );
    }

    {
        const value = '20:20:20';
        test(`countTime ${value}`, () =>
            expect(countTime(value)).toBe(20 * 60 * 60 + 20 * 60 + 20)
        );
    }

    {
        const value = '20:20';
        test(`countTime ${value}`, () =>
            expect(countTime(value)).toBe(0)
        );
    }

    {
        const value = '20';
        test(`countTime ${value}`, () =>
            expect(countTime(value)).toBe(0)
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

    test('formatTime 0', () =>
        expect(formatTime(0)).toBe('00:00:00')
    );

    test('formatTime 1', () =>
        expect(formatTime(1)).toBe('00:00:01')
    );

    test('formatTime 20', () =>
        expect(formatTime(20)).toBe('00:00:20')
    );

    test('formatTime 59', () =>
        expect(formatTime(59)).toBe('00:00:59')
    );

    test('formatTime 60', () =>
        expect(formatTime(60)).toBe('00:01:00')
    );

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

    test('formatTime -1', () =>
        expect(formatTime(-1)).toBe('00:00:00')
    );

});

/**
 * getAverageTime 测试
 */
describe('getAverageTime test', () => {

    test('getAverageTime ["00:00:00"]', () =>
        expect(getAverageTime(['00:00:00'])).toBe('00:00:00')
    );

    test('getAverageTime ["00:00:20"]', () =>
        expect(getAverageTime(['00:00:20'])).toBe('00:00:20')
    );

    test('getAverageTime ["00:00:00", "00:00:20"]', () =>
        expect(getAverageTime(['00:00:00', '00:00:20'])).toBe('00:00:10')
    );

});
