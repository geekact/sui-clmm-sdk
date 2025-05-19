import type { SuiObjectResponse } from '@mysten/sui/client';

export const pickObjectNotExistsResponse = (response: SuiObjectResponse): string | undefined => {
  if (
    response.error &&
    'object_id' in response.error &&
    !('version' in response.error) &&
    !('digest' in response.error)
  ) {
    return response.error.object_id;
  }

  return;
};
