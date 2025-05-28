import { expect, test } from 'vitest';
import { getPrevTickIndex } from '../../src';

test('prev tick', () => {
  expect(getPrevTickIndex(1000, 30)).toBe(960);
  expect(getPrevTickIndex(-1000, 30)).toBe(-1020);
});
