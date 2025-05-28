import Decimal from 'decimal.js';
import { toDecimal } from './to-decimal';
import type BN from 'bn.js';

/**
 * transform 12345 to 12.345 with decimals 3
 */
export const amountFromDecimals = (
  amount: Decimal.Value | BN | bigint,
  decimals: number,
): Decimal => {
  return toDecimal(amount).div(Decimal.pow(10, decimals));
};
