import type BN from 'bn.js';
import Decimal from 'decimal.js';
import { toDecimal } from './to-decimal';

export const amountFromX64 = (num: Decimal.Value | BN | bigint): Decimal => {
  return toDecimal(num).mul(Decimal.pow(2, -64));
};
