export const asIntN = (bits: number | string, len: number = 32) => {
  return BigInt.asIntN(len, BigInt(bits));
};
