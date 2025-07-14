import type { ObjectOwner, SuiObjectResponse } from '@mysten/sui/client';

/**
 * Pick **AddressOwner** or **ObjectOwner** from object. `Immutable` owner will be ignored.
 */
export const pickObjectOwner = (
  response: SuiObjectResponse | { owner: ObjectOwner | null },
): string | undefined => {
  if ('error' in response && response.error) {
    throw new Error(`Object with error: ${response.error?.code}`);
  }

  const owner =
    'data' in response ? response.data?.owner : 'owner' in response ? response.owner : null;

  if (!owner || owner === 'Immutable') return;
  if ('AddressOwner' in owner) return owner.AddressOwner;
  if ('ObjectOwner' in owner) return owner.ObjectOwner;
  return;
};
