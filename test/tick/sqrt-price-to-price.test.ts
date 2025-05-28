import { expect, test } from 'vitest';
import { sqrtPriceToPrice } from '../../src';

test('sqrtPrice to price', () => {
  expect(sqrtPriceToPrice('99999999999999', 9, 6).toString()).toBe('2.9387358770556599952e-8');
  expect(sqrtPriceToPrice('-99999999999999', 9, 6)).toMatchInlineSnapshot(
    `"2.9387358770556599952e-8"`,
  );
});
