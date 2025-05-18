import BN from 'bn.js';
import type Decimal from 'decimal.js';
import { toDecimal } from '../math';
import { getLiquidityFromAmountA } from './get-liquidity-from-amount-a';
import { getLiquidityFromAmountB } from './get-liquidity-from-amount-b';

export const getLiquidityFromAmounts = (opts: {
  amountA: Decimal.Value | BN | bigint;
  amountB: Decimal.Value | BN | bigint;
  currentSqrtPrice: Decimal.Value | BN | bigint;
  lowerSqrtPrice: Decimal.Value | BN | bigint;
  upperSqrtPrice: Decimal.Value | BN | bigint;
  /**
   * [true]math.ceil or [false]math.floor. Default `false`
   */
  roundUp?: boolean;
}): BN => {
  const { roundUp = false } = opts;
  const amountA = toDecimal(opts.amountA);
  const amountB = toDecimal(opts.amountB);
  const current = toDecimal(opts.currentSqrtPrice);
  const lower = toDecimal(opts.lowerSqrtPrice);
  const upper = toDecimal(opts.upperSqrtPrice);

  if (amountA.lt(0) || amountB.lt(0) || (amountA.eq(0) && amountB.eq(0))) {
    return new BN(0);
  }

  if (current.lt(lower)) {
    return getLiquidityFromAmountA({
      amount: amountA,
      sqrtPrice0X64: lower,
      sqrtPrice1X64: upper,
      roundUp,
    });
  } else if (current.lt(upper)) {
    return getLiquidityFromAmountA({
      amount: amountA,
      sqrtPrice0X64: current,
      sqrtPrice1X64: upper,
      roundUp,
    });
  } else {
    return getLiquidityFromAmountB({
      amount: amountB,
      sqrtPrice0X64: lower,
      sqrtPrice1X64: current,
      roundUp,
    });
  }
};
