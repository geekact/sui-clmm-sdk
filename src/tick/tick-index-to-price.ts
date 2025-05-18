import type Decimal from 'decimal.js';
import { sqrtPriceX64ToPrice } from './sqrt-price-x64-to-price';
import { tickIndexToSqrtPriceX64 } from './tick-index-to-sqrt-price-x64';

export const tickIndexToPrice = (
  tickIndex: number,
  decimalsA: number,
  decimalsB: number,
): Decimal => {
  return sqrtPriceX64ToPrice(tickIndexToSqrtPriceX64(tickIndex), decimalsA, decimalsB);
};
