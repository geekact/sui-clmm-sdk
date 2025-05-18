import { generateMnemonic as rawGenerateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

export const generateMnemonic = (wordsAmount: 12 | 24): string => {
  return rawGenerateMnemonic(wordlist, wordsAmount === 12 ? 128 : 256);
};
