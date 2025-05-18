import Decimal from 'decimal.js';

/**
 * ```js
 * apy = (1 + apr/365) ** 365 - 1
 * ```
 */
export const calculateAPY = (apr: Decimal.Value): Decimal => {
  return new Decimal(1).plus(new Decimal(apr).div(365)).pow(365).minus(1);
};
