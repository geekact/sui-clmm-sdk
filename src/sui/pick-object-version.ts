import type { SuiObjectResponse, SuiObjectRef, SuiObjectData } from '@mysten/sui/client';
import { pickObjectReference } from './pick-object-reference';

export const pickObjectVersion = (
  response: SuiObjectResponse | SuiObjectRef | SuiObjectData,
): string => {
  if ('version' in response) return response.version;
  return pickObjectReference(response).version;
};
