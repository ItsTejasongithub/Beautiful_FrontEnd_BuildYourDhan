import { useState, useEffect, useCallback } from 'react';
import { GameState, FixedDeposit, AssetHolding, SelectedAssets, AdminSettings } from '../types';
import {
  MONTH_DURATION_MS,
  STARTING_CASH,
  SAVINGS_INTEREST_RATE,
  TOTAL_GAME_YEARS,
  AVAILABLE_STOCKS,
  AVAILABLE_INDEX_FUNDS,
  AVAILABLE_MUTUAL_FUNDS,
  AVAILABLE_COMMODITIES,
  FINANCIAL_QUOTES,
  getRandomItems,
  getRandomItem
} from '../utils/constants';
import { generateAssetUnlockSchedule } from '../utils/assetUnlockCalculator';

const initialHoldings = {
  physicalGold: { quantity: 0, avgPrice: 0, totalInvested: 0 },
  digitalGold: { quantity: 0, avgPrice: 0, totalInvested: 0 },
  indexFund: { quantity: 0, avgPrice: 0, totalInvested: 0 },
  mutualFund: { quantity: 0, avgPrice: 0, totalInvested: 0 },
  stocks: {},
  crypto: {},
  commodity: { quantity: 0, avgPrice: 0, totalInvested: 0 },
  reits: {}
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    mode: 'menu',
    currentYear: 1,
    currentMonth: 1,
    pocketCash: STARTING_CASH,
    savingsAccount: { balance: 0, interestRate: SAVINGS_INTEREST_RATE },
    fixedDeposits: [],
    holdings: initialHoldings,
    gameStartTime: 0,
    isPaused: false,
    completedQuizzes: []
  });

  // Start game timer
  useEffect(() => {
    if (gameState.mode !== 'solo' || gameState.isPaused) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        let newMonth = prev.currentMonth + 1;
        let newYear = prev.currentYear;

        if (newMonth > 12) {
          newMonth = 1;
          newYear += 1;
        }

        // End game after 20 years
        if (newYear > TOTAL_GAME_YEARS) {
          clearInterval(interval);
          return prev;
        }

        // Apply monthly savings account interest (annual rate / 12)
        const monthlyInterest = prev.savingsAccount.balance * (SAVINGS_INTEREST_RATE / 12);
        const newSavingsBalance = prev.savingsAccount.balance + monthlyInterest;

        // Update FD maturity status
        const updatedFDs = prev.fixedDeposits.map(fd => {
          if (!fd.isMatured && fd.maturityYear === newYear && fd.maturityMonth === newMonth) {
            return { ...fd, isMatured: true };
          }
          return fd;
        });

        return {
          ...prev,
          currentMonth: newMonth,
          currentYear: newYear,
          savingsAccount: { ...prev.savingsAccount, balance: newSavingsBalance },
          fixedDeposits: updatedFDs
        };
      });
    }, MONTH_DURATION_MS);

    return () => clearInterval(interval);
  }, [gameState.mode, gameState.isPaused]);

  const openSettings = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      mode: 'settings'
    }));
  }, []);

  const startSoloGame = useCallback((adminSettings?: AdminSettings) => {
    // Randomly select assets for this game
    const selectedStocks = getRandomItems(AVAILABLE_STOCKS, 2, 5);

    // When using admin settings, select earliest available fund based on selected categories
    let fundType: 'index' | 'mutual';
    let fundName: string;

    if (adminSettings) {
      const hasFunds = adminSettings.selectedCategories.includes('FUNDS');

      if (hasFunds) {
        // Randomly decide between index or mutual fund
        const useIndexFund = Math.random() > 0.5;
        fundType = useIndexFund ? 'index' : 'mutual';

        if (useIndexFund) {
          fundName = 'NIFTYBEES'; // Earliest index fund (2009)
        } else {
          fundName = 'SBI_Bluechip'; // Earliest mutual fund (2018)
        }
      } else {
        // Fallback to random if FUNDS not selected
        fundType = Math.random() > 0.5 ? 'index' : 'mutual';
        fundName = fundType === 'index'
          ? getRandomItem(AVAILABLE_INDEX_FUNDS)
          : getRandomItem(AVAILABLE_MUTUAL_FUNDS);
      }
    } else {
      // Random selection for quick start
      fundType = Math.random() > 0.5 ? 'index' : 'mutual';
      fundName = fundType === 'index'
        ? getRandomItem(AVAILABLE_INDEX_FUNDS)
        : getRandomItem(AVAILABLE_MUTUAL_FUNDS);
    }

    const selectedCommodity = getRandomItem(AVAILABLE_COMMODITIES);

    const selectedAssets: SelectedAssets = {
      stocks: selectedStocks,
      fundType,
      fundName,
      commodity: selectedCommodity
    };

    // Generate asset unlock schedule if admin settings are provided
    const assetUnlockSchedule = adminSettings
      ? generateAssetUnlockSchedule(adminSettings.selectedCategories, adminSettings.gameStartYear)
      : undefined;

    // Shuffle quotes for this game - one unique quote per year
    const shuffledQuotes = [...FINANCIAL_QUOTES].sort(() => Math.random() - 0.5);

    setGameState({
      mode: 'solo',
      currentYear: 1,
      currentMonth: 1,
      pocketCash: STARTING_CASH,
      savingsAccount: { balance: 0, interestRate: SAVINGS_INTEREST_RATE },
      fixedDeposits: [],
      holdings: initialHoldings,
      gameStartTime: Date.now(),
      isPaused: false,
      selectedAssets,
      adminSettings,
      assetUnlockSchedule,
      yearlyQuotes: shuffledQuotes,
      completedQuizzes: []
    });
  }, []);

  const backToMenu = useCallback(() => {
    setGameState({
      mode: 'menu',
      currentYear: 1,
      currentMonth: 1,
      pocketCash: STARTING_CASH,
      savingsAccount: { balance: 0, interestRate: SAVINGS_INTEREST_RATE },
      fixedDeposits: [],
      holdings: initialHoldings,
      gameStartTime: 0,
      isPaused: false
    });
  }, []);

  const depositToSavings = useCallback((amount: number) => {
    setGameState(prev => {
      if (amount > prev.pocketCash) return prev;
      return {
        ...prev,
        pocketCash: prev.pocketCash - amount,
        savingsAccount: {
          ...prev.savingsAccount,
          balance: prev.savingsAccount.balance + amount
        }
      };
    });
  }, []);

  const withdrawFromSavings = useCallback((amount: number) => {
    setGameState(prev => {
      if (amount > prev.savingsAccount.balance) return prev;
      return {
        ...prev,
        pocketCash: prev.pocketCash + amount,
        savingsAccount: {
          ...prev.savingsAccount,
          balance: prev.savingsAccount.balance - amount
        }
      };
    });
  }, []);

  const createFixedDeposit = useCallback((amount: number, duration: 3 | 12 | 36, interestRate: number) => {
    setGameState(prev => {
      if (amount > prev.pocketCash || prev.fixedDeposits.length >= 3) return prev;

      const maturityMonth = (prev.currentMonth + duration) % 12 || 12;
      const maturityYear = prev.currentYear + Math.floor((prev.currentMonth + duration - 1) / 12);

      const newFD: FixedDeposit = {
        id: `${Date.now()}-${Math.random()}`,
        amount,
        duration,
        interestRate,
        startMonth: prev.currentMonth,
        startYear: prev.currentYear,
        maturityMonth,
        maturityYear,
        isMatured: false
      };

      return {
        ...prev,
        pocketCash: prev.pocketCash - amount,
        fixedDeposits: [...prev.fixedDeposits, newFD]
      };
    });
  }, []);

  const collectFD = useCallback((fdId: string) => {
    setGameState(prev => {
      const fd = prev.fixedDeposits.find(f => f.id === fdId);
      if (!fd || !fd.isMatured) return prev;

      const maturityAmount = fd.amount * (1 + fd.interestRate / 100);

      return {
        ...prev,
        pocketCash: prev.pocketCash + maturityAmount,
        fixedDeposits: prev.fixedDeposits.filter(f => f.id !== fdId)
      };
    });
  }, []);

  const breakFD = useCallback((fdId: string) => {
    setGameState(prev => {
      const fd = prev.fixedDeposits.find(f => f.id === fdId);
      if (!fd) return prev;

      const penalty = 0.01; // 1% penalty
      const returnAmount = fd.amount * (1 - penalty);

      return {
        ...prev,
        pocketCash: prev.pocketCash + returnAmount,
        fixedDeposits: prev.fixedDeposits.filter(f => f.id !== fdId)
      };
    });
  }, []);

  const buyAsset = useCallback((assetType: string, assetName: string, quantity: number, currentPrice: number) => {
    setGameState(prev => {
      const totalCost = quantity * currentPrice;
      if (totalCost > prev.pocketCash) return prev;

      const newHoldings = { ...prev.holdings };

      if (assetType === 'physicalGold' || assetType === 'digitalGold' || assetType === 'indexFund' ||
          assetType === 'mutualFund' || assetType === 'commodity') {
        const holding = newHoldings[assetType as keyof typeof newHoldings] as AssetHolding;
        const newQuantity = holding.quantity + quantity;
        const newTotalInvested = holding.totalInvested + totalCost;
        (newHoldings[assetType as keyof typeof newHoldings] as AssetHolding) = {
          quantity: newQuantity,
          avgPrice: newTotalInvested / newQuantity,
          totalInvested: newTotalInvested
        };
      } else if (assetType === 'stocks' || assetType === 'crypto' || assetType === 'reits') {
        const assetGroup = newHoldings[assetType as 'stocks' | 'crypto' | 'reits'];
        const holding = assetGroup[assetName] || { quantity: 0, avgPrice: 0, totalInvested: 0 };
        const newQuantity = holding.quantity + quantity;
        const newTotalInvested = holding.totalInvested + totalCost;
        assetGroup[assetName] = {
          quantity: newQuantity,
          avgPrice: newTotalInvested / newQuantity,
          totalInvested: newTotalInvested
        };
      }

      return {
        ...prev,
        pocketCash: prev.pocketCash - totalCost,
        holdings: newHoldings
      };
    });
  }, []);

  const sellAsset = useCallback((assetType: string, assetName: string, quantity: number, currentPrice: number) => {
    setGameState(prev => {
      const newHoldings = { ...prev.holdings };
      let holding: AssetHolding | undefined;

      if (assetType === 'physicalGold' || assetType === 'digitalGold' || assetType === 'indexFund' ||
          assetType === 'mutualFund' || assetType === 'commodity') {
        holding = newHoldings[assetType as keyof typeof newHoldings] as AssetHolding;
      } else if (assetType === 'stocks' || assetType === 'crypto' || assetType === 'reits') {
        const assetGroup = newHoldings[assetType as 'stocks' | 'crypto' | 'reits'];
        holding = assetGroup[assetName];
      }

      if (!holding || holding.quantity < quantity) return prev;

      const saleAmount = quantity * currentPrice;
      const newQuantity = holding.quantity - quantity;
      const reducedInvestment = (holding.totalInvested / holding.quantity) * quantity;

      if (assetType === 'physicalGold' || assetType === 'digitalGold' || assetType === 'indexFund' ||
          assetType === 'mutualFund' || assetType === 'commodity') {
        (newHoldings[assetType as keyof typeof newHoldings] as AssetHolding) = {
          quantity: newQuantity,
          avgPrice: newQuantity > 0 ? (holding.totalInvested - reducedInvestment) / newQuantity : 0,
          totalInvested: holding.totalInvested - reducedInvestment
        };
      } else if (assetType === 'stocks' || assetType === 'crypto' || assetType === 'reits') {
        const assetGroup = newHoldings[assetType as 'stocks' | 'crypto' | 'reits'];
        if (newQuantity === 0) {
          delete assetGroup[assetName];
        } else {
          assetGroup[assetName] = {
            quantity: newQuantity,
            avgPrice: (holding.totalInvested - reducedInvestment) / newQuantity,
            totalInvested: holding.totalInvested - reducedInvestment
          };
        }
      }

      return {
        ...prev,
        pocketCash: prev.pocketCash + saleAmount,
        holdings: newHoldings
      };
    });
  }, []);

  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  }, []);

  const markQuizCompleted = useCallback((category: string) => {
    setGameState(prev => ({
      ...prev,
      completedQuizzes: [...(prev.completedQuizzes || []), category]
    }));
  }, []);

  return {
    gameState,
    openSettings,
    startSoloGame,
    backToMenu,
    depositToSavings,
    withdrawFromSavings,
    createFixedDeposit,
    collectFD,
    breakFD,
    buyAsset,
    sellAsset,
    togglePause,
    markQuizCompleted
  };
};
