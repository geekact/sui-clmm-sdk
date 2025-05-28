import { expect, test } from 'vitest';
import { priceToSqrtPrice } from '../../src';

test('price to sqrtPrice', () => {
  expect(priceToSqrtPrice(2, 9, 6).toString()).toBe('824963474247118971');
  expect(priceToSqrtPrice(0, 9, 6).toString()).toBe('0');
});
