import type Decimal from 'decimal.js';
import { sqrtPriceToPrice } from './sqrt-price-to-price';
import { tickIndexToSqrtPrice } from './tick-index-to-sqrt-price';

export const tickIndexToPrice = (
  tickIndex: number,
  decimalsA: number,
  decimalsB: number,
): Decimal => {
  return sqrtPriceToPrice(tickIndexToSqrtPrice(tickIndex), decimalsA, decimalsB);
};
