import Decimal from 'decimal.js';
import { toDecimal } from './to-decimal';
import type BN from 'bn.js';

export const amountFromDecimals = (
  amount: Decimal.Value | BN | bigint,
  decimals: number,
): Decimal => {
  return toDecimal(amount).div(Decimal.pow(10, decimals));
};
