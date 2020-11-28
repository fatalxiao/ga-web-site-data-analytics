/**
 * @file Util.test.js
 * @author liangxiaojun(liangxiaojun@derbysoft.com)
 */

'use strict';

// Vendors
import {getDigitLength} from 'vendors/Util';

/**
 * getDigitLength 测试
 */
describe('getDigitLength test', () => {

    test('getDigitLength 100', () =>
        expect(getDigitLength(100)).toBe(0)
    );

    test('getDigitLength 0', () =>
        expect(getDigitLength(0)).toBe(0)
    );

    test('getDigitLength 0.1', () =>
        expect(getDigitLength(0.1)).toBe(1)
    );

    test('getDigitLength "0.1"', () =>
        expect(getDigitLength('0.1')).toBe(1)
    );

    test('getDigitLength 0.000001', () =>
        expect(getDigitLength(0.000001)).toBe(6)
    );

    test('getDigitLength 100.000001', () =>
        expect(getDigitLength(100.000001)).toBe(6)
    );

    test('getDigitLength "100.000001"', () =>
        expect(getDigitLength('100.000001')).toBe(6)
    );

});
