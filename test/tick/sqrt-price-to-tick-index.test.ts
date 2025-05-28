import { expect, test } from 'vitest';
import {
  BN,
  MAX_SQRT_PRICE,
  MAX_TICK_INDEX,
  MIN_SQRT_PRICE,
  MIN_TICK_INDEX,
  sqrtPriceToTickIndex,
} from '../../src';

test('sqrtPrice to tickIndex', () => {
  expect(sqrtPriceToTickIndex('99999999999999')).toBe(-242517);
  expect(sqrtPriceToTickIndex('99999999999999999999')).toBe(33807);
  expect(sqrtPriceToTickIndex(MIN_SQRT_PRICE)).toBe(MIN_TICK_INDEX);
  expect(sqrtPriceToTickIndex(MAX_SQRT_PRICE)).toBe(MAX_TICK_INDEX);
});

test('not in range', () => {
  expect(() => sqrtPriceToTickIndex(MIN_SQRT_PRICE.sub(new BN(1)))).toThrowError(
    'Provided sqrtPrice is not within the supported sqrtPrice range.',
  );

  expect(() => sqrtPriceToTickIndex(MAX_SQRT_PRICE.add(new BN(1)))).toThrowError(
    'Provided sqrtPrice is not within the supported sqrtPrice range.',
  );
});
