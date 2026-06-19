import type { SuiClientTypes } from '@mysten/sui/client';

/**
 * Pick **AddressOwner** or **ObjectOwner** from object. `Immutable` owner will be ignored.
 */
export const pickObjectOwner = (
  response: SuiClientTypes.Object | { owner: SuiClientTypes.ObjectOwner | null },
): string | undefined => {
  const owner = 'owner' in response ? response.owner : null;

  if (!owner || owner.$kind === 'Immutable') return;
  if (owner.$kind === 'AddressOwner') return owner.AddressOwner;
  if (owner.$kind === 'ObjectOwner') return owner.ObjectOwner;
  if (owner.$kind === 'ConsensusAddressOwner') return owner.ConsensusAddressOwner.owner;
  return;
};
