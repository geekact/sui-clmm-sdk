import type BN from 'bn.js';

export const signedShiftLeft = (n0: BN, shiftBy: number, bitWidth: number) => {
  let twosN0 = n0.toTwos(bitWidth).shln(shiftBy);
  twosN0.imaskn(bitWidth + 1);
  return twosN0.fromTwos(bitWidth);
};
