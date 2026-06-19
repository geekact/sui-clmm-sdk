import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client';

/**
 * ```
 * const objectsGenerator = batchGetOwnedObjects(sui, { owner });
 *
 * // Usage 1
 * const objects = await Array.fromAsync(objectsGenerator);
 * // Usage 2
 * for await (const object of objectsGenerator) {
 *   console.log(object);
 * }
 * ```
 */
export async function* batchGetOwnedObjects(
  sui: ClientWithCoreApi,
  input: SuiClientTypes.ListOwnedObjectsOptions,
) {
  let hasNextPage = true;
  let cursor = input.cursor;

  do {
    const result = await sui.core.listOwnedObjects({ ...input, cursor });
    for (const object of result.objects) {
      yield object;
    }
    cursor = result.cursor;
    hasNextPage = result.hasNextPage;
  } while (hasNextPage);
}
