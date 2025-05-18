import BN from 'bn.js';

export const TWO = new BN(2);

export const checkOverlimit = (n: BN, bitLimit: number) => {
  if (n.gte(TWO.pow(new BN(bitLimit)))) {
    throw new Error(`Value overflow u${bitLimit}`);
  }
};
