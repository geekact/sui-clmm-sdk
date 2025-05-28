import { expect, test } from 'vitest';
import { calculateAPY } from '../../src';

test('apr to apy', () => {
  expect(calculateAPY(0.5).toNumber()).toBe(0.6481572517391195);
  expect(calculateAPY(1).toNumber()).toBe(1.7145674820218744);
  expect(calculateAPY(3.23).toNumber()).toBe(23.92302598900697);
});
