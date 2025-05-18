import BN from 'bn.js';
import Decimal from 'decimal.js';

export const toBN = (value: Decimal.Value | BN | bigint): BN => {
  if (BN.isBN(value)) return value;
  return new BN(value.toString());
};
