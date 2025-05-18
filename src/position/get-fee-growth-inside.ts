import BN from 'bn.js';
import { subUnderflowU128, toBN } from '../math';

export interface FeeGrowthInsideOptions {
  pool: {
    tickIndex: number;
    feeGrowthGlobalA: BN | string | bigint;
    feeGrowthGlobalB: BN | string | bigint;
  };
  tickLower: {
    tickIndex: number;
    feeGrowthOutsideA: BN | string | bigint;
    feeGrowthOutsideB: BN | string | bigint;
  };
  tickUpper: {
    tickIndex: number;
    feeGrowthOutsideA: BN | string | bigint;
    feeGrowthOutsideB: BN | string | bigint;
  };
}

export const getFeeGrowthInside = (opts: FeeGrowthInsideOptions): [BN, BN] => {
  const { tickLower, tickUpper, pool } = opts;
  let feeGrowthBlowA = new BN(0);
  let feeGrowthBelowB = new BN(0);

  if (pool.tickIndex < tickLower.tickIndex) {
    feeGrowthBlowA = subUnderflowU128(
      toBN(pool.feeGrowthGlobalA),
      toBN(tickLower.feeGrowthOutsideA),
    );
    feeGrowthBelowB = subUnderflowU128(
      toBN(pool.feeGrowthGlobalB),
      toBN(tickLower.feeGrowthOutsideB),
    );
  } else {
    feeGrowthBlowA = toBN(tickLower.feeGrowthOutsideA);
    feeGrowthBelowB = toBN(tickLower.feeGrowthOutsideB);
  }

  let feeGrowthAboveA = new BN(0);
  let feeGrowthAboveB = new BN(0);

  if (pool.tickIndex < tickUpper.tickIndex) {
    feeGrowthAboveA = toBN(tickUpper.feeGrowthOutsideA);
    feeGrowthAboveB = toBN(tickUpper.feeGrowthOutsideB);
  } else {
    feeGrowthAboveA = subUnderflowU128(
      toBN(pool.feeGrowthGlobalA),
      toBN(tickUpper.feeGrowthOutsideA),
    );
    feeGrowthAboveB = subUnderflowU128(
      toBN(pool.feeGrowthGlobalB),
      toBN(tickUpper.feeGrowthOutsideB),
    );
  }
  const feeGrowthInsideA = subUnderflowU128(
    subUnderflowU128(toBN(pool.feeGrowthGlobalA), feeGrowthBlowA),
    feeGrowthAboveA,
  );
  const feeGrowthInsideB = subUnderflowU128(
    subUnderflowU128(toBN(pool.feeGrowthGlobalB), feeGrowthBelowB),
    feeGrowthAboveB,
  );

  return [feeGrowthInsideA, feeGrowthInsideB];
};
