import { asIntN } from './as-int-n';

export const bitsToNumber = (field: { bits: number | string } | number | string, len?: number) => {
  return Number(asIntN(typeof field === 'object' ? field.bits : field, len));
};
