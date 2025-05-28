import { expect, test } from 'vitest';
import { isTickIndexInRange, MAX_TICK_INDEX, MIN_TICK_INDEX } from '../../src';

test('normal value', () => {
  expect(isTickIndexInRange(100, 0)).toBeTruthy();
  expect(isTickIndexInRange(-1000, 0)).toBeTruthy();
  expect(isTickIndexInRange(100, 30)).toBeTruthy();
});

test('min tick', () => {
  expect(isTickIndexInRange(MIN_TICK_INDEX, 0)).toBeTruthy();
  expect(isTickIndexInRange(MIN_TICK_INDEX, 100)).toBeFalsy();
  expect(isTickIndexInRange(MIN_TICK_INDEX + 35, 100)).toBeFalsy();
  expect(isTickIndexInRange(MIN_TICK_INDEX + 36, 100)).toBeTruthy();
  expect(isTickIndexInRange(MIN_TICK_INDEX + 37, 100)).toBeTruthy();
});

test('max tick', () => {
  expect(isTickIndexInRange(MAX_TICK_INDEX, 0)).toBeTruthy();
  expect(isTickIndexInRange(MAX_TICK_INDEX, 100)).toBeFalsy();
  expect(isTickIndexInRange(MAX_TICK_INDEX - 35, 100)).toBeFalsy();
  expect(isTickIndexInRange(MAX_TICK_INDEX - 36, 100)).toBeTruthy();
  expect(isTickIndexInRange(MAX_TICK_INDEX - 37, 100)).toBeTruthy();
});
