import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client';
import type { Transaction } from '@mysten/sui/transactions';
import { toBN } from '../math';
import type BN from 'bn.js';

export type EstimateTransactionGasInput = Partial<
  Omit<SuiClientTypes.SimulateTransactionOptions, 'transaction'>
> & {
  sender?: string;
};

export const estimateTransactionGas = async (
  sui: ClientWithCoreApi,
  tx: Transaction,
  input?: EstimateTransactionGasInput,
): Promise<BN> => {
  const sender = input?.sender ?? tx.getData().sender;
  if (!sender) throw new Error('Sender is not provided for gas calculation');
  if (!tx.getData().sender) {
    tx.setSender(sender);
  }

  const result = await sui.core.simulateTransaction<{ effects: true }>({
    transaction: tx,
    checksEnabled: input?.checksEnabled ?? false,
    signal: input?.signal,
    include: { effects: true },
  });
  const txResult = result.Transaction ?? result.FailedTransaction;
  if (!txResult?.effects) {
    throw new Error('Transaction simulation did not return effects');
  }
  const { gasUsed } = txResult.effects;

  return toBN(gasUsed.computationCost)
    .add(toBN(gasUsed.storageCost))
    .sub(toBN(gasUsed.storageRebate));
};
