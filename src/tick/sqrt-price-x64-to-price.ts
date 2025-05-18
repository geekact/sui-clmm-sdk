import BN from 'bn.js';
import Decimal from 'decimal.js';
import { toDecimal } from '../math';

export const sqrtPriceX64ToPrice = (
  sqrtPriceX64: Decimal.Value | BN | bigint,
  decimalsA: number,
  decimalsB: number,
): Decimal => {
  return toDecimal(sqrtPriceX64)
    .mul(Decimal.pow(2, -64))
    .pow(2)
    .mul(Decimal.pow(10, decimalsA - decimalsB));
};
