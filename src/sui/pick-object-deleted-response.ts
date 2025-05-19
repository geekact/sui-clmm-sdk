import type { SuiObjectResponse, SuiObjectRef } from '@mysten/sui/client';

export const pickObjectDeletedResponse = (
  response: SuiObjectResponse,
): SuiObjectRef | undefined => {
  if (
    response.error &&
    'object_id' in response.error &&
    'version' in response.error &&
    'digest' in response.error
  ) {
    const { error } = response;
    return {
      objectId: error.object_id,
      version: error.version,
      digest: error.digest,
    } satisfies SuiObjectRef;
  }

  return;
};
