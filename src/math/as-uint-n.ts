export const asUintN = (bits: number | string, len: number = 32) => {
  return BigInt.asUintN(len, BigInt(bits));
};
