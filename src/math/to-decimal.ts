import type BN from 'bn.js';
import Decimal from 'decimal.js';

export const toDecimal = (value: Decimal.Value | BN | bigint): Decimal => {
  if (Decimal.isDecimal(value)) return value;
  return new Decimal(value.toString());
};
