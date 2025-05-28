import { test, expect } from 'vitest';
import { bitsToNumber } from '../../src';

test('number', () => {
  expect(bitsToNumber(0)).toBe(0);
  expect(bitsToNumber(1000)).toBe(1000);
});

test('string', () => {
  expect(bitsToNumber('1000')).toBe(1000);
  expect(bitsToNumber('12345678987654321')).toBe(1653732529);
});

test('object', () => {
  expect(bitsToNumber({ bits: 1000 })).toBe(1000);
  expect(bitsToNumber({ bits: '-12345678987654321' })).toBe(-1653732529);
});
