import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client';

/**
 * ```
 * const blocksGenerator = batchGetTransactionBlocks(sui, ['digest1', 'digest2', ...]);
 *
 * // Usage 1
 * const blocks = await Array.fromAsync(blocksGenerator);
 * // Usage 2
 * for await (const block of blocksGenerator) {
 *   console.log(block);
 * }
 * ```
 */
export async function* batchGetTransactionBlocks<
  Include extends SuiClientTypes.TransactionInclude = {},
>(
  sui: ClientWithCoreApi,
  digests: string[],
  params: Omit<SuiClientTypes.GetTransactionOptions<Include>, 'digest'> = {},
) {
  const uniqueDigests = [...new Set(digests)];
  const step = 50;

  for (let i = 0; i < uniqueDigests.length; i += step) {
    const batch = uniqueDigests.slice(i, i + step);
    const results = await Promise.all(
      batch.map((digest) => sui.core.getTransaction({ ...params, digest })),
    );
    for (const result of results) {
      const tx = result.Transaction ?? result.FailedTransaction;
      if (tx) {
        yield tx;
      }
    }
  }
}
