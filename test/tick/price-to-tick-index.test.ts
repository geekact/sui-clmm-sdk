import { expect, test } from 'vitest';
import { priceToTickIndex } from '../../src';

test('price to tickIndex', () => {
  expect(priceToTickIndex(2, 9, 6)).toBe(-62150);
});

test('out of range', () => {
  expect(() => priceToTickIndex(0, 9, 6)).toThrowError();
});
