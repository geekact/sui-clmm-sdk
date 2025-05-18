import { asIntN } from './as-int-n';

export const bitsToNumber = (bits: number | string) => {
  return Number(asIntN(bits));
};
