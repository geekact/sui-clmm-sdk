import type BN from 'bn.js';
import Decimal from 'decimal.js';
import { toDecimal } from './to-decimal';

export const amountToX64 = (
  num: Decimal.Value | BN | bigint,
  round?: 'floor' | 'ceil' | 'round',
): Decimal => {
  const value = toDecimal(num).mul(Decimal.pow(2, 64));
  return round ? value[round]() : value;
};
