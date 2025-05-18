import Decimal from 'decimal.js';

export const updateAmountOutWithSlippage = (opts: {
  amountOut: Decimal.Value;
  slippage: string | number;
  inputByAmountIn: boolean;
}): Decimal => {
  const op = opts.inputByAmountIn ? 'minus' : 'plus';
  return new Decimal(opts.amountOut).mul(new Decimal(1)[op](opts.slippage));
};
