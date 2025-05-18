import BN from 'bn.js';
import Decimal from 'decimal.js';
import { toDecimal } from '../math';
import { getAmountAFromLiquidity } from './get-amount-a-from-liquidity';
import { getAmountBFromLiquidity } from './get-amount-b-from-liquidity';

export const getAmountsFromLiquidity = (opts: {
  liquidity: Decimal.Value | BN | bigint;
  currentSqrtPrice: Decimal.Value | BN | bigint;
  lowerSqrtPrice: Decimal.Value | BN | bigint;
  upperSqrtPrice: Decimal.Value | BN | bigint;
  /**
   * [true]math.ceil or [false]math.floor. Default `false`
   */
  roundUp?: boolean;
}): [amountA: BN, amountB: BN] => {
  const { roundUp = false } = opts;
  const liquidity = toDecimal(opts.liquidity);
  const current = toDecimal(opts.currentSqrtPrice);
  const lower = toDecimal(opts.lowerSqrtPrice);
  const upper = toDecimal(opts.upperSqrtPrice);
  let amountA: BN, amountB: BN;

  if (liquidity.eq(0)) {
    amountA = new BN(0);
    amountB = new BN(0);
  } else if (current.lt(lower)) {
    // x = L * (pb - pa) / (pa * pb)
    amountA = getAmountAFromLiquidity({
      liquidity,
      sqrtPrice0X64: lower,
      sqrtPrice1X64: upper,
      roundUp,
    });
    amountB = new BN(0);
  } else if (current.lt(upper)) {
    // x = L * (pb - p) / (p * pb)
    // y = L * (p - pa)
    amountA = getAmountAFromLiquidity({
      liquidity,
      sqrtPrice0X64: current,
      sqrtPrice1X64: upper,
      roundUp,
    });
    amountB = getAmountBFromLiquidity({
      liquidity,
      sqrtPrice0X64: current,
      sqrtPrice1X64: lower,
      roundUp: roundUp,
    });
  } else {
    // y = L * (pb - pa)
    amountA = new BN(0);
    amountB = getAmountBFromLiquidity({
      liquidity: liquidity,
      sqrtPrice0X64: upper,
      sqrtPrice1X64: lower,
      roundUp: roundUp,
    });
  }

  return <const>[amountA, amountB];
};
