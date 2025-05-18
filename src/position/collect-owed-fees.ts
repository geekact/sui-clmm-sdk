import type BN from 'bn.js';
import { getFeeGrowthInside, type FeeGrowthInsideOptions } from './get-fee-growth-inside';
import { subUnderflowU128, toBN } from '../math';
import type Decimal from 'decimal.js';

export interface OwedFeesOptions extends FeeGrowthInsideOptions {
  position: {
    liquidity: Decimal.Value | BN | bigint;
    feeGrowthInsideA: Decimal.Value | BN | bigint;
    feeGrowthInsideB: Decimal.Value | BN | bigint;
    feeOwedA: Decimal.Value | BN | bigint;
    feeOwedB: Decimal.Value | BN | bigint;
  };
}

export const collectOwedFees = (opts: OwedFeesOptions): [BN, BN] => {
  const { position } = opts;
  const liquidity = toBN(position.liquidity);
  const [feeGrowthInsideA, feeGrowthInsideB] = getFeeGrowthInside(opts);
  const feeOwedDeltaA = subUnderflowU128(feeGrowthInsideA, toBN(position.feeGrowthInsideA))
    .mul(liquidity)
    .shrn(64);
  const feeOwedDeltaB = subUnderflowU128(feeGrowthInsideB, toBN(position.feeGrowthInsideB))
    .mul(liquidity)
    .shrn(64);

  return <const>[
    toBN(position.feeOwedA).add(feeOwedDeltaA),
    toBN(position.feeOwedB).add(feeOwedDeltaB),
  ];
};
