# sui-clmm-sdk

Sui ecosystem clmm common sdk for dapps.

# Installation

```bash
pnpm add sui-clmm-sdk
```

# Methods

All available methods in repo are listed below:

<!-- methods start -->

## account

- [generate-mnemonic](src/account/generate-mnemonic.ts)
- [mnemonic-to-keypair](src/account/mnemonic-to-keypair.ts)
- [secret-to-keypair](src/account/secret-to-keypair.ts)

## position

- [collect-owed-fees](src/position/collect-owed-fees.ts)
- [collect-owed-rewards](src/position/collect-owed-rewards.ts)
- [get-amount-a-from-liquidity](src/position/get-amount-a-from-liquidity.ts)
- [get-amount-b-from-liquidity](src/position/get-amount-b-from-liquidity.ts)
- [get-amounts-from-liquidity](src/position/get-amounts-from-liquidity.ts)
- [get-fee-growth-inside](src/position/get-fee-growth-inside.ts)
- [get-liquidity-from-amount-a](src/position/get-liquidity-from-amount-a.ts)
- [get-liquidity-from-amount-b](src/position/get-liquidity-from-amount-b.ts)
- [get-liquidity-from-amounts](src/position/get-liquidity-from-amounts.ts)

## tick

- [get-boundary-tick-index](src/tick/get-boundary-tick-index.ts)
- [get-current-tick-index](src/tick/get-current-tick-index.ts)
- [get-next-tick-index](src/tick/get-next-tick-index.ts)
- [get-prev-tick-index](src/tick/get-prev-tick-index.ts)
- [get-tick-score](src/tick/get-tick-score.ts)
- [price-to-sqrt-price-x64](src/tick/price-to-sqrt-price-x64.ts)
- [price-to-tick-index](src/tick/price-to-tick-index.ts)
- [sqrt-price-x64-to-price](src/tick/sqrt-price-x64-to-price.ts)
- [sqrt-price-x64-to-tick-index](src/tick/sqrt-price-x64-to-tick-index.ts)
- [tick-index-to-price](src/tick/tick-index-to-price.ts)
- [tick-index-to-sqrt-price-x64](src/tick/tick-index-to-sqrt-price-x64.ts)

## math

- [amount-from-decimals](src/math/amount-from-decimals.ts)
- [amount-from-x64](src/math/amount-from-x64.ts)
- [amount-to-decimals](src/math/amount-to-decimals.ts)
- [amount-to-x64](src/math/amount-to-x64.ts)
- [as-int-n](src/math/as-int-n.ts)
- [as-uint-n](src/math/as-uint-n.ts)
- [bits-to-number](src/math/bits-to-number.ts)
- [calculate-apy](src/math/calculate-apy.ts)
- [check-overlimit](src/math/check-overlimit.ts)
- [signed-shift-left](src/math/signed-shift-left.ts)
- [signed-shift-right](src/math/signed-shift-right.ts)
- [sub-underflow-u128](src/math/sub-underflow-u128.ts)
- [to-bn](src/math/to-bn.ts)
- [to-decimal](src/math/to-decimal.ts)
<!-- methods end -->
