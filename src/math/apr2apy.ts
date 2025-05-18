import Decimal from 'decimal.js';

/**
 * apy = (1 + apr/365) ** 365 - 1
 */
export const apr2apy = (apr: Decimal.Value) => {
  return new Decimal(1).plus(new Decimal(apr).div(100).div(365)).pow(365).minus(1).mul(100);
};
