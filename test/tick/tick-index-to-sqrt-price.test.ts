import { expect, test } from 'vitest';
import {
  MAX_SQRT_PRICE,
  MAX_TICK_INDEX,
  MIN_SQRT_PRICE,
  MIN_TICK_INDEX,
  tickIndexToSqrtPrice,
} from '../../src';

test('positive', () => {
  expect(tickIndexToSqrtPrice(1).toString()).toBe('18447666387855959850');
});

test('negative', () => {
  expect(tickIndexToSqrtPrice(-1).toString()).toBe('18445821805675392311');
});

test('zero', () => {
  expect(tickIndexToSqrtPrice(0).toString()).toBe('18446744073709551616');
});

test('out of range', () => {
  expect(tickIndexToSqrtPrice(MAX_TICK_INDEX + 1).gt(MAX_SQRT_PRICE)).toBeTruthy();
  expect(tickIndexToSqrtPrice(MIN_TICK_INDEX - 1).lt(MIN_SQRT_PRICE)).toBeTruthy();
});
