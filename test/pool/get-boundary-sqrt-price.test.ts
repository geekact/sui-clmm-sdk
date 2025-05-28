import { expect, test } from 'vitest';
import {
  getBoundarySqrtPrice,
  getTickIndexWithSpacing,
  MAX_SQRT_PRICE,
  MAX_TICK_INDEX,
  MIN_SQRT_PRICE,
  MIN_TICK_INDEX,
  tickIndexToSqrtPrice,
} from '../../src';

test('a2b', () => {
  expect(getBoundarySqrtPrice(true, 0).toString()).toBe(MIN_SQRT_PRICE.toString());
  expect(getBoundarySqrtPrice(true, 129).toString()).toBe(
    tickIndexToSqrtPrice(getTickIndexWithSpacing(MIN_TICK_INDEX, 129)).toString(),
  );
});

test('b2a', () => {
  expect(getBoundarySqrtPrice(false, 0).toString()).toBe(MAX_SQRT_PRICE.toString());
  expect(getBoundarySqrtPrice(false, 129).toString()).toBe(
    tickIndexToSqrtPrice(getTickIndexWithSpacing(MAX_TICK_INDEX, 129)).toString(),
  );
});
