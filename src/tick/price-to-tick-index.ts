import type Decimal from 'decimal.js';
import { sqrtPriceX64ToTickIndex } from './sqrt-price-x64-to-tick-index';
import { priceToSqrtPriceX64 } from './price-to-sqrt-price-x64';

export const priceToTickIndex = (
  price: Decimal.Value,
  decimalsA: number,
  decimalsB: number,
): number => {
  return sqrtPriceX64ToTickIndex(priceToSqrtPriceX64(price, decimalsA, decimalsB));
};
