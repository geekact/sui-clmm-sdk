import BN from 'bn.js';

const U128 = new BN(2).pow(new BN(128));

export const subUnderflowU128 = (n0: BN, n1: BN): BN => {
  return n0.add(U128).sub(n1).mod(U128);
};
