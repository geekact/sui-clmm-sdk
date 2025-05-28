import { expect, test } from 'vitest';
import { getNextTickIndex } from '../../src';

test('next tick', () => {
  expect(getNextTickIndex(1000, 30)).toBe(1020);
  expect(getNextTickIndex(-1000, 30)).toBe(-960);
});
