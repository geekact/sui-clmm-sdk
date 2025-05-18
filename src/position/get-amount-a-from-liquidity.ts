import type BN from 'bn.js';
import type Decimal from 'decimal.js';
import { amountToX64, toBN, toDecimal } from '../math';

export const getAmountAFromLiquidity = (opts: {
  liquidity: Decimal.Value | BN | bigint;
  sqrtPrice0X64: Decimal.Value | BN | bigint;
  sqrtPrice1X64: Decimal.Value | BN | bigint;
  /**
   * [true]math.ceil or [false]math.floor. Default `false`
   */
  roundUp?: boolean;
}): BN => {
  const { roundUp = false } = opts;
  const liquidity = toDecimal(opts.liquidity);
  const sqrtPrice0X64 = toDecimal(opts.sqrtPrice0X64);
  const sqrtPrice1X64 = toDecimal(opts.sqrtPrice1X64);
  const [lowerSqrtPrice, upperSqrtPrice] = sqrtPrice0X64.lt(sqrtPrice1X64)
    ? [sqrtPrice0X64, sqrtPrice1X64]
    : [sqrtPrice1X64, sqrtPrice0X64];

  const amount = amountToX64(liquidity)
    .mul(upperSqrtPrice.sub(lowerSqrtPrice))
    .div(upperSqrtPrice.mul(lowerSqrtPrice));
  return toBN(amount[roundUp ? 'ceil' : 'floor']());
};
