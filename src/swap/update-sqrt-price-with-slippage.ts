import BN from 'bn.js';
import Decimal from 'decimal.js';
import { priceToSqrtPriceX64, sqrtPriceX64ToPrice } from '../tick';
import { MIN_SQRT_PRICE, MAX_SQRT_PRICE } from '../constant';

export const updateSqrtPriceWithSlippage = (opts: {
  sqrtPrice: Decimal.Value | BN | bigint;
  slippage: string | number;
  a2b: boolean;
  decimalsA: number;
  decimalsB: number;
}): BN => {
  const { slippage, decimalsA, decimalsB } = opts;
  const op = opts.a2b ? 'minus' : 'plus';
  const priceWithSlippage = sqrtPriceX64ToPrice(opts.sqrtPrice, decimalsA, decimalsB).mul(
    new Decimal(1)[op](slippage),
  );
  const sqrtPrice = priceToSqrtPriceX64(priceWithSlippage, decimalsA, decimalsB);

  if (sqrtPrice.lt(MIN_SQRT_PRICE)) return MIN_SQRT_PRICE;
  if (sqrtPrice.gt(MAX_SQRT_PRICE)) return MAX_SQRT_PRICE;
  return sqrtPrice;
};
