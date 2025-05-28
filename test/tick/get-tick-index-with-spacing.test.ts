import { expect, test } from 'vitest';
import { getTickIndexWithSpacing } from '../../src';

test('without tick spacing', () => {
  expect(getTickIndexWithSpacing(1000, 0)).toBe(1000);
});

test('with tick spacing', () => {
  expect(getTickIndexWithSpacing(1000, 100)).toBe(1000);
  expect(getTickIndexWithSpacing(1000, 9)).toBe(999);
  expect(getTickIndexWithSpacing(1000, 30)).toBe(990);
  expect(getTickIndexWithSpacing(-1000, 30)).toBe(-990);
});
