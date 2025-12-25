export interface GameState {
  mode: 'menu' | 'solo' | 'multi';
  currentYear: number;
  currentMonth: number;
  pocketCash: number;
  savingsAccount: SavingsAccount;
  fixedDeposits: FixedDeposit[];
  holdings: Holdings;
  gameStartTime: number;
  isPaused: boolean;
}

export interface SavingsAccount {
  balance: number;
  interestRate: number; // 0.4% PA = 0.004
}

export interface FixedDeposit {
  id: string;
  amount: number;
  duration: 3 | 12 | 36; // in months
  interestRate: number;
  startMonth: number;
  startYear: number;
  maturityMonth: number;
  maturityYear: number;
  isMatured: boolean;
}

export interface Holdings {
  physicalGold: AssetHolding;
  digitalGold: AssetHolding;
  indexFund: AssetHolding;
  mutualFund: AssetHolding;
  stocks: { [key: string]: AssetHolding };
  crypto: { [key: string]: AssetHolding };
  commodity: AssetHolding;
  reits: { [key: string]: AssetHolding };
}

export interface AssetHolding {
  quantity: number;
  avgPrice: number;
  totalInvested: number;
}

export interface AssetData {
  date: string;
  price: number;
}

export interface AssetInfo {
  name: string;
  category: string;
  unlockYear: number;
  isUnlocked: boolean;
}

export interface FDRate {
  year: number;
  threeMonth: number;
  oneYear: number;
  threeYear: number;
}
