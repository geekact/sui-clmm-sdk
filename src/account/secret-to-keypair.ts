import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

export const secretToKeypair = (secretKey: Uint8Array | string) => {
  return Ed25519Keypair.fromSecretKey(secretKey, { skipValidation: false });
};
