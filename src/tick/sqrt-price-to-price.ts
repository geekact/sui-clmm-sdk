import BN from 'bn.js';
import Decimal from 'decimal.js';
import { amountFromX64 } from '../math';

export const sqrtPriceToPrice = (
  sqrtPriceX64: Decimal.Value | BN | bigint,
  decimalsA: number,
  decimalsB: number,
): Decimal => {
  return amountFromX64(sqrtPriceX64)
    .pow(2)
    .mul(Decimal.pow(10, decimalsA - decimalsB));
};
