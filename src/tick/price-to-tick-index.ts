import type Decimal from 'decimal.js';
import { sqrtPriceToTickIndex } from './sqrt-price-to-tick-index';
import { priceToSqrtPrice } from './price-to-sqrt-price';

export const priceToTickIndex = (
  price: Decimal.Value,
  decimalsA: number,
  decimalsB: number,
): number => {
  return sqrtPriceToTickIndex(priceToSqrtPrice(price, decimalsA, decimalsB));
};
