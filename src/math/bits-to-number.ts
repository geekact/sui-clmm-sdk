import { asIntN } from './as-int-n';

export const bitsToNumber = (bits: number | string, len?: number) => {
  return Number(asIntN(bits, len));
};
