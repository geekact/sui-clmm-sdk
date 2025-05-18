import Decimal from 'decimal.js';

export const amountToDecimals = (amount: Decimal.Value, decimals: number): Decimal => {
  return new Decimal(amount).mul(Decimal.pow(10, decimals));
};
