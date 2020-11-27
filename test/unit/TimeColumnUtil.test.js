/**
 * @file TimeColumnUtil.test.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

'use strict';

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

    test('isValidTime "00:00:00"', () => {
        expect(isValidTime('00:00:00')).toBe(true);
    });

    test('isValidTime "10:10:10"', () => {
        expect(isValidTime('10:10:10')).toBe(true);
    });

    test('isValidTime "10:10"', () => {
        expect(isValidTime('10:10')).toBe(false);
    });

    test('isValidTime "10"', () => {
        expect(isValidTime('10')).toBe(false);
    });

    test('isValidTime "1000:00:10"', () => {
        expect(isValidTime('1000:00:10')).toBe(true);
    });

});

/**
 * countTime 测试
 */
describe('countTime test', () => {

    test('countTime "00:00:00"', () => {
        expect(countTime('00:00:00')).toBe(0);
    });

    test('countTime "00:00:01"', () => {
        expect(countTime('00:00:01')).toBe(1);
    });

    test('countTime "00:00:20"', () => {
        expect(countTime('00:00:20')).toBe(20);
    });

    test('countTime "00:01:00"', () => {
        expect(countTime('00:01:00')).toBe(60);
    });

    test('countTime "00:20:20"', () => {
        expect(countTime('00:20:20')).toBe(1220);
    });

    test('countTime "20:20"', () => {
        expect(countTime('20:20')).toBe(0);
    });

    test('countTime "20"', () => {
        expect(countTime('20')).toBe(0);
    });

});
