import { expect, test } from 'vitest';
import { parsePoolTypeArguments } from '../../src';

test('parse pool arguments', () => {
  expect(parsePoolTypeArguments('0xabc<ii::ii,jj,k:k>')).toStrictEqual(['ii::ii', 'jj', 'k:k']);
  expect(parsePoolTypeArguments('0xabc<ii::ii, jj, k:k>')).toStrictEqual(['ii::ii', 'jj', 'k:k']);
  expect(parsePoolTypeArguments('0xabc<ii::ii, jj>')).toStrictEqual(['ii::ii', 'jj']);
  expect(parsePoolTypeArguments('0xabc<ii>')).toStrictEqual(['ii']);
});

test('invalid format', () => {
  expect(() => parsePoolTypeArguments('oxabc<>')).toThrowError();
  expect(() => parsePoolTypeArguments('oxabc')).toThrowError();
});
