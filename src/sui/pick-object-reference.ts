import type { SuiObjectResponse, OwnedObjectRef, SuiObjectRef } from '@mysten/sui/client';
import { pickObjectDeletedResponse } from './pick-object-deleted-response';

export const pickObjectReference = (response: SuiObjectResponse | OwnedObjectRef): SuiObjectRef => {
  if ('reference' in response) return response.reference;

  if ('error' in response && response.error?.code !== 'deleted') {
    throw new Error(`Object with error: ${response.error?.code}`);
  }

  if (response.data) {
    return {
      objectId: response.data.objectId,
      version: response.data.version,
      digest: response.data.digest,
    } satisfies SuiObjectRef;
  }
  return pickObjectDeletedResponse(response)!;
};
