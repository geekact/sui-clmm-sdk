import type { MultiGetTransactionBlocksParams, SuiClient } from '@mysten/sui/client';

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
export async function* batchGetTransactionBlocks(
  sui: SuiClient,
  digests: string[],
  params: Omit<MultiGetTransactionBlocksParams, 'digests'> = {},
) {
  digests = [...new Set(digests)];

  do {
    const blocks = await sui.multiGetTransactionBlocks({
      digests: digests.splice(0, 50),
      ...params,
    });
    for (const block of blocks) {
      yield block;
    }
  } while (digests.length > 0);
}
