import type { SuiObjectResponse, SuiObjectRef, OwnedObjectRef } from '@mysten/sui/client';
import { pickObjectReference } from './pick-object-reference';
import { pickObjectNotExistsResponse } from './pick-object-not-exists-response';

export const pickObjectId = (
  response: SuiObjectResponse | SuiObjectRef | OwnedObjectRef,
): string => {
  if ('objectId' in response) return response.objectId;
  return (
    pickObjectReference(response)?.objectId ??
    pickObjectNotExistsResponse(response as SuiObjectResponse)!
  );
};
