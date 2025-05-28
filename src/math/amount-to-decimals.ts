import Decimal from 'decimal.js';

/**
 * transform 12.345 to 12345 with decimals 3
 */
export const amountToDecimals = (amount: Decimal.Value, decimals: number): Decimal => {
  return new Decimal(amount).mul(Decimal.pow(10, decimals));
};
