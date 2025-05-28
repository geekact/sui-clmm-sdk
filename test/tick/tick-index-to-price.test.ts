import { expect, test } from 'vitest';
import { tickIndexToPrice } from '../../src';

test('tickIndex to price', () => {
  expect(tickIndexToPrice(0, 9, 6).toNumber()).toBe(1000);
  expect(tickIndexToPrice(0, 6, 9).toNumber()).toBe(0.001);
  expect(tickIndexToPrice(30000, 6, 9).toNumber()).toBe(0.020082524519410366);
});
