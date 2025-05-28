import { expect, test } from 'vitest';
import { amountFromDecimals } from '../../src';

test('amount from decimals', () => {
  expect(amountFromDecimals(10000000000, 9).toNumber()).toBe(10);
  expect(amountFromDecimals(123456789, 5).toNumber()).toBe(1234.56789);
  expect(amountFromDecimals(1, 3).toNumber()).toBe(0.001);
  expect(amountFromDecimals(0, 3).toNumber()).toBe(0);
  expect(amountFromDecimals(-1000, 3).toNumber()).toBe(-1);
});
