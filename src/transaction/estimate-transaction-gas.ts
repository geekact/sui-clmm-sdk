import type { DevInspectTransactionBlockParams, SuiClient } from '@mysten/sui/client';
import type { Transaction } from '@mysten/sui/transactions';
import { toBN } from '../math';
import type BN from 'bn.js';

export const estimateTransactionGas = async (
  sui: SuiClient,
  tx: Transaction,
  input?: Partial<Omit<DevInspectTransactionBlockParams, 'transactionBlock'>>,
): Promise<BN> => {
  const sender = input?.sender || tx.getData().sender;
  if (!sender) throw new Error('Sender is not provided for gas calculation');

  const result = await sui.devInspectTransactionBlock({
    ...input,
    transactionBlock: tx,
    sender,
  });
  const { gasUsed } = result.effects;

  return toBN(gasUsed.computationCost)
    .add(toBN(gasUsed.storageCost))
    .sub(toBN(gasUsed.storageRebate));
};
