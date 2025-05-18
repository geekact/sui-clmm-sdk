import type BN from 'bn.js';

export const signedShiftRight = (n0: BN, shiftBy: number, bitWidth: number) => {
  let twoN0 = n0.toTwos(bitWidth).shrn(shiftBy);
  twoN0.imaskn(bitWidth - shiftBy + 1);
  return twoN0.fromTwos(bitWidth - shiftBy);
};
