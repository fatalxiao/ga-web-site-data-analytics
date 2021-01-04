/**
 * @file Util.test.js
 */

'use strict';

/* eslint-disable no-undef */

// Vendors
import {getDigitLength} from 'vendors/Util';

/**
 * getDigitLength 测试
 */
describe('getDigitLength test', () => {

    {
        const value = 0;
        test(`getDigitLength ${value}`, () =>
            expect(getDigitLength(value)).toBe(0)
        );
    }

    {
        const value = 100;
        test(`getDigitLength ${value}`, () =>
            expect(getDigitLength(value)).toBe(0)
        );
    }

    {
        const value = 0.1;
        test(`getDigitLength ${value}`, () =>
            expect(getDigitLength(value)).toBe(1)
        );
    }

    {
        const value = '0.1';
        test(`getDigitLength ${value}`, () =>
            expect(getDigitLength(value)).toBe(1)
        );
    }

    {
        const value = 0.000001;
        test(`getDigitLength ${value}`, () =>
            expect(getDigitLength(value)).toBe(6)
        );
    }

    {
        const value = 100.000001;
        test(`getDigitLength ${value}`, () =>
            expect(getDigitLength(value)).toBe(6)
        );
    }

    {
        const value = '100.000001';
        test(`getDigitLength ${value}`, () =>
            expect(getDigitLength(value)).toBe(6)
        );
    }

    {
        const value = -1;
        test(`getDigitLength ${value}`, () =>
            expect(getDigitLength(value)).toBe(0)
        );
    }

    {
        const value = -0.1;
        test(`getDigitLength ${value}`, () =>
            expect(getDigitLength(value)).toBe(1)
        );
    }

});
