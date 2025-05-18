import type BN from 'bn.js';
import type Decimal from 'decimal.js';
import { amountFromX64, toBN, toDecimal } from '../math';

export const getLiquidityFromAmountA = (opts: {
  amount: Decimal.Value | BN | bigint;
  sqrtPrice0X64: Decimal.Value | BN | bigint;
  sqrtPrice1X64: Decimal.Value | BN | bigint;
  /**
   * [true]math.ceil or [false]math.floor. Default `false`
   */
  roundUp?: boolean;
}) => {
  const { roundUp = false } = opts;
  const amount = toDecimal(opts.amount);
  const sqrtPrice0X64 = toDecimal(opts.sqrtPrice0X64);
  const sqrtPrice1X64 = toDecimal(opts.sqrtPrice1X64);
  const [lowerSqrtPrice, upperSqrtPrice] = sqrtPrice0X64.lt(sqrtPrice1X64)
    ? [sqrtPrice0X64, sqrtPrice1X64]
    : [sqrtPrice1X64, sqrtPrice0X64];

  const liquidity = amountFromX64(
    amount.mul(upperSqrtPrice.mul(lowerSqrtPrice)).div(upperSqrtPrice.sub(lowerSqrtPrice)),
  );
  return toBN(liquidity[roundUp ? 'ceil' : 'floor']());
};
