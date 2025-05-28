import { expect, test } from 'vitest';
import { getBoundaryTickIndex, MAX_TICK_INDEX, MIN_TICK_INDEX } from '../../src';

test('without spacing', () => {
  expect(getBoundaryTickIndex(0)).toStrictEqual([MIN_TICK_INDEX, MAX_TICK_INDEX]);
});

test('with spacing', () => {
  expect(getBoundaryTickIndex(100)).toStrictEqual([MIN_TICK_INDEX + 36, MAX_TICK_INDEX - 36]);
});
