import { AssetInfo } from '../types';

export const MONTH_DURATION_MS = 3000; // 3 seconds = 1 month
export const TOTAL_GAME_YEARS = 20;
export const STARTING_CASH = 100000; // Starting pocket cash in rupees
export const SAVINGS_INTEREST_RATE = 0.004; // 0.4% per annum
export const GAME_START_YEAR = 2005; // Game year 1 maps to calendar year 2005

// Asset unlock timeline based on year
export const ASSET_UNLOCK_TIMELINE: { [key: number]: string[] } = {
  1: ['SAVINGS_AC'],
  2: ['FIXED_DEPOSIT'],
  3: ['PHYSICAL_GOLD', 'DIGITAL_GOLD'],
  4: ['INDEX_FUND', 'MUTUAL_FUND'], // User can select one
  5: ['INDIAN_STOCKS'], // Min 2, Max 5 stocks
  6: ['BTC', 'ETH'],
  7: ['COMMODITY'], // User can select one
  8: ['EMBASSY', 'MINDSPACE'] // Both REITs
};

// Available stocks for selection in Year 5
export const AVAILABLE_STOCKS = [
  'TATAMOTORS', 'ITC', 'BAJFINANCE', 'RELIANCE', 'TCS',
  'INFY', 'HDFCBANK', 'ICICIBANK', 'WIPRO', 'SBIN'
];

// Available index funds (user selects one in Year 4)
export const AVAILABLE_INDEX_FUNDS = [
  'NIFTYBEES', 'UTINIFTETF', 'HDFCNIFETF', 'SETFNIF50'
];

// Available mutual funds (user selects one in Year 4)
export const AVAILABLE_MUTUAL_FUNDS = [
  'SBI_Bluechip', 'ICICI_Bluechip', 'Axis_Midcap',
  'Kotak_Emerging', 'PGIM_Midcap', 'Nippon_SmallCap'
];

// Available commodities (user selects one in Year 7)
export const AVAILABLE_COMMODITIES = [
  'SILVER', 'CRUDEOIL_WTI', 'COPPER', 'WHEAT', 'BRENT'
];

export const getAssetPath = (category: string, assetName: string): string => {
  const categoryMap: { [key: string]: string } = {
    'stocks': 'Indian_Stocks',
    'index': 'Index_Funds',
    'mutual': 'Mutual_Funds',
    'commodity': 'Commodities',
    'crypto': 'Crypto_Assets',
    'reit': 'REIT',
    'gold': 'Gold_Investments'
  };

  const folder = categoryMap[category] || category;
  return `/data/${folder}/${assetName}.csv`;
};

// Utility function to get random items from an array
export const getRandomItems = <T>(array: T[], min: number, max: number): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Utility function to get a single random item from an array
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
