import BN from 'bn.js';
import { subUnderflowU128, toBN } from '../math';
import { assertInLimit } from '../math/assert-in-limit';
import type Decimal from 'decimal.js';

const ZERO = new BN(0);
const THOUSAND = new BN(1000);

export const collectOwedRewards = (opts: {
  pool: {
    liquidity: Decimal.Value | BN | bigint;
    tickIndex: number;
    rewardUpdatedAt: Date;
    rewards: {
      emissionsPerSecond: Decimal.Value | BN | bigint;
      growthGlobal: Decimal.Value | BN | bigint;
    }[];
  };
  position: {
    liquidity: Decimal.Value | BN | bigint;
    rewards: {
      rewardGrowthInside: Decimal.Value | BN | bigint;
      amountOwed: Decimal.Value | BN | bigint;
    }[];
  };
  tickLower: {
    tickIndex: number;
    rewardGrowthsOutside: (Decimal.Value | BN | bigint)[];
    initialized: boolean;
  };
  tickUpper: {
    tickIndex: number;
    rewardGrowthsOutside: (Decimal.Value | BN | bigint)[];
    initialized: boolean;
  };
  currentTime?: Date;
}): BN[] => {
  const { pool, position, tickLower, tickUpper } = opts;
  const now = opts.currentTime ? opts.currentTime.getTime() : Date.now();
  const secondDelta = new BN(now - pool.rewardUpdatedAt.getTime()).div(THOUSAND);
  const poolLiquidity = toBN(pool.liquidity);
  const positionLiquidity = toBN(position.liquidity);

  return pool.rewards.map((reward, index) => {
    const emissionsPerSecond = toBN(reward.emissionsPerSecond);
    const growthGlobal = toBN(reward.growthGlobal);
    const positionReward = position.rewards[index];
    const growthInside = toBN(positionReward?.rewardGrowthInside ?? '0');
    const amountOwed = toBN(positionReward?.amountOwed ?? '0');

    // Increment the global reward growth tracker based on time elasped since the last whirlpool update.
    let adjustedRewardGrowthGlobalX64 = growthGlobal;
    if (poolLiquidity.gt(ZERO)) {
      let rewardGrowthDelta = secondDelta.mul(emissionsPerSecond);
      assertInLimit(rewardGrowthDelta, 128);
      rewardGrowthDelta = rewardGrowthDelta.div(poolLiquidity);
      adjustedRewardGrowthGlobalX64 = growthGlobal.add(rewardGrowthDelta);
    }

    // Calculate the reward growth outside of the position
    const tickLowerRewardGrowthsOutsideX64 = toBN(tickLower.rewardGrowthsOutside[index]!);
    const tickUpperRewardGrowthsOutsideX64 = toBN(tickUpper.rewardGrowthsOutside[index]!);
    let rewardGrowthsBelowX64 = adjustedRewardGrowthGlobalX64;
    if (tickLower.initialized) {
      rewardGrowthsBelowX64 =
        pool.tickIndex < tickLower.tickIndex
          ? subUnderflowU128(adjustedRewardGrowthGlobalX64, tickLowerRewardGrowthsOutsideX64)
          : tickLowerRewardGrowthsOutsideX64;
    }

    let rewardGrowthsAboveX64 = new BN(0);
    if (tickUpper.initialized) {
      rewardGrowthsAboveX64 =
        pool.tickIndex < tickUpper.tickIndex
          ? tickUpperRewardGrowthsOutsideX64
          : subUnderflowU128(adjustedRewardGrowthGlobalX64, tickUpperRewardGrowthsOutsideX64);
    }

    const rewardGrowthInsideX64 = subUnderflowU128(
      subUnderflowU128(adjustedRewardGrowthGlobalX64, rewardGrowthsBelowX64),
      rewardGrowthsAboveX64,
    );

    // Knowing the growth of the reward checkpoint for the position,
    // calculate and increment the amount owed for each reward.
    return amountOwed
      .shln(64)
      .add(subUnderflowU128(rewardGrowthInsideX64, growthInside).mul(positionLiquidity))
      .shrn(64);
  });
};
