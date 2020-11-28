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

    test('isValidTime "00:00:00"', () =>
        expect(isValidTime('00:00:00')).toBe(true)
    );

    test('isValidTime "10:10:10"', () =>
        expect(isValidTime('10:10:10')).toBe(true)
    );

    test('isValidTime "10:10"', () =>
        expect(isValidTime('10:10')).toBe(false)
    );

    test('isValidTime "10"', () =>
        expect(isValidTime('10')).toBe(false)
    );

    test('isValidTime "1000:00:10"', () =>
        expect(isValidTime('1000:00:10')).toBe(true)
    );

});

/**
 * countTime 测试
 */
describe('countTime test', () => {

    test('countTime "00:00:00"', () =>
        expect(countTime('00:00:00')).toBe(0)
    );

    test('countTime "00:00:01"', () =>
        expect(countTime('00:00:01')).toBe(1)
    );

    test('countTime "00:00:20"', () =>
        expect(countTime('00:00:20')).toBe(20)
    );

    test('countTime "00:01:00"', () =>
        expect(countTime('00:01:00')).toBe(60)
    );

    test('countTime "00:20:20"', () =>
        expect(countTime('00:20:20')).toBe(20 * 60 + 20)
    );

    test('countTime "01:20:20"', () =>
        expect(countTime('01:20:20')).toBe(60 * 60 + 20 * 60 + 20)
    );

    test('countTime "20:20"', () =>
        expect(countTime('20:20')).toBe(0)
    );

    test('countTime "20"', () =>
        expect(countTime('20')).toBe(0)
    );

});

describe('fillZero test', () => {

    test('fillZero "0"', () =>
        expect(fillZero('0')).toBe('00')
    );

    test('fillZero "6"', () =>
        expect(fillZero('6')).toBe('06')
    );

    test('fillZero "10"', () =>
        expect(fillZero('10')).toBe('10')
    );

    test('fillZero "100"', () =>
        expect(fillZero('100')).toBe('100')
    );

});
