# sui-clmm-sdk

Sui ecosystem clmm common sdk for dapps.

# Installation

```bash
pnpm add sui-clmm-sdk
```

# Methods

<!-- methods start -->

## math

- [amount-from-decimals]('./math/amount-from-decimals.ts)
- [amount-from-x64]('./math/amount-from-x64.ts)
- [amount-to-decimals]('./math/amount-to-decimals.ts)
- [amount-to-x64]('./math/amount-to-x64.ts)
- [apr2apy]('./math/apr2apy.ts)
- [as-int-n]('./math/as-int-n.ts)
- [as-uint-n]('./math/as-uint-n.ts)
- [bits-to-number]('./math/bits-to-number.ts)
- [check-overlimit]('./math/check-overlimit.ts)
- [signed-shift-left]('./math/signed-shift-left.ts)
- [signed-shift-right]('./math/signed-shift-right.ts)
- [sub-underflow-u128]('./math/sub-underflow-u128.ts)
- [to-bn]('./math/to-bn.ts)
- [to-decimal]('./math/to-decimal.ts)

## position

- [collect-owed-fees]('./position/collect-owed-fees.ts)
- [collect-owed-rewards]('./position/collect-owed-rewards.ts)
- [get-amount-a-from-liquidity]('./position/get-amount-a-from-liquidity.ts)
- [get-amount-b-from-liquidity]('./position/get-amount-b-from-liquidity.ts)
- [get-amounts-from-liquidity]('./position/get-amounts-from-liquidity.ts)
- [get-fee-growth-inside]('./position/get-fee-growth-inside.ts)
- [get-liquidity-from-amount-a]('./position/get-liquidity-from-amount-a.ts)
- [get-liquidity-from-amount-b]('./position/get-liquidity-from-amount-b.ts)
- [get-liquidity-from-amounts]('./position/get-liquidity-from-amounts.ts)

## tick

- [get-boundary-tick-index]('./tick/get-boundary-tick-index.ts)
- [get-current-tick-index]('./tick/get-current-tick-index.ts)
- [get-next-tick-index]('./tick/get-next-tick-index.ts)
- [get-prev-tick-index]('./tick/get-prev-tick-index.ts)
- [get-tick-score]('./tick/get-tick-score.ts)
- [price-to-sqrt-price-x64]('./tick/price-to-sqrt-price-x64.ts)
- [price-to-tick-index]('./tick/price-to-tick-index.ts)
- [sqrt-price-x64-to-price]('./tick/sqrt-price-x64-to-price.ts)
- [sqrt-price-x64-to-tick-index]('./tick/sqrt-price-x64-to-tick-index.ts)
- [tick-index-to-price]('./tick/tick-index-to-price.ts)
- [tick-index-to-sqrt-price-x64]('./tick/tick-index-to-sqrt-price-x64.ts)
<!-- methods end -->
