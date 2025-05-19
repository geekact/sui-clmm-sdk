import type { GetOwnedObjectsParams, SuiClient } from '@mysten/sui/client';

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
export async function* batchGetOwnedObjects(sui: SuiClient, input: GetOwnedObjectsParams) {
  let hasNextPage = true;
  let cursor = input.cursor;

  do {
    const result = await sui.getOwnedObjects({ ...input, cursor });
    for (const obj of result.data) {
      yield obj;
    }
    cursor = result.nextCursor;
    hasNextPage = result.hasNextPage;
  } while (hasNextPage);
}
