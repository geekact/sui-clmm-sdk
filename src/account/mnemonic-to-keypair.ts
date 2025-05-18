import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

export const mnemonicToKeypair = (
  mnemonics: string,
  path: {
    accountIndex?: number;
    isExternal?: boolean;
    addressIndex?: number;
  } = {},
) => {
  const { accountIndex = 0, isExternal = false, addressIndex = 0 } = path;
  const derivePath = `m/44'/784'/${accountIndex}'/${isExternal ? 1 : 0}'/${addressIndex}'`;
  return Ed25519Keypair.deriveKeypair(mnemonics, derivePath);
};
