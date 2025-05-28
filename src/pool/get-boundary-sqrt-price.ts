import type BN from 'bn.js';
import { MAX_TICK_INDEX } from '../constant';
import { getTickIndexWithSpacing, tickIndexToSqrtPrice } from '../tick';
import { MIN_TICK_INDEX } from 'turbos-clmm-sdk';

export const getBoundarySqrtPrice = (a2b: boolean, tickSpacing: number): BN => {
  return a2b
    ? tickIndexToSqrtPrice(getTickIndexWithSpacing(MIN_TICK_INDEX, tickSpacing))
    : tickIndexToSqrtPrice(getTickIndexWithSpacing(MAX_TICK_INDEX, tickSpacing));
};
