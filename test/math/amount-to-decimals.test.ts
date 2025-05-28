import { expect, test } from 'vitest';
import { amountToDecimals } from '../../src';

test('amount to decimals', () => {
  expect(amountToDecimals(10, 9).toNumber()).toBe(10000000000);
  expect(amountToDecimals(1234.56789, 5).toNumber()).toBe(123456789);
  expect(amountToDecimals(0.001, 3).toNumber()).toBe(1);
  expect(amountToDecimals(0, 3).toNumber()).toBe(0);
  expect(amountToDecimals(-1, 3).toNumber()).toBe(-1000);
});
