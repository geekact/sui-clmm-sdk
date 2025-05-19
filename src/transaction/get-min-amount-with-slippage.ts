import Decimal from 'decimal.js';

export const getMinAmountWithSlippage = (amount: Decimal.Value, slippage: string) => {
  const ratio = new Decimal(1).minus(new Decimal(slippage));
  if (ratio.lte(0) || ratio.gte(1)) {
    throw new Error('Invalid slippage range');
  }
  return new Decimal(amount).mul(ratio);
};
