import type BN from 'bn.js';
import type Decimal from 'decimal.js';
import { amountFromDecimals } from '../math';

export const calculatePoolTVL = (opts: {
  amountA: Decimal.Value | BN | bigint;
  amountB: Decimal.Value | BN | bigint;
  decimalsA: number;
  decimalsB: number;
  priceA: number | string;
  priceB: number | string;
}): [tvl: Decimal, tvlA: Decimal, tvlB: Decimal] => {
  const tvlA = amountFromDecimals(opts.amountA, opts.decimalsA).mul(opts.priceA);
  const tvlB = amountFromDecimals(opts.amountB, opts.decimalsB).mul(opts.priceB);
  const tvl = tvlA.add(tvlB);
  return <const>[tvl, tvlA, tvlB];
};
