import type BN from 'bn.js';
import { MIN_SQRT_PRICE, MAX_SQRT_PRICE } from '../constant';

export const getBoundarySqrtPrice = (a2b: boolean): BN => {
  return a2b ? MIN_SQRT_PRICE : MAX_SQRT_PRICE;
};
