import { useState, useEffect, useCallback, useRef } from 'react';
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
import { generateQuestionIndices } from '../utils/assetEducation';

// Performance optimization: Disable debug logging in production
const DEBUG_MODE = false; // Set to true only when debugging

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

// Helper that returns true when the game is definitively over. When true,
// we must avoid applying any further financial updates (interest, recurring
// income, buys/sells, FD changes, etc.).
const gameHasEnded = (s: GameState) => s.isStarted === false && s.currentYear >= TOTAL_GAME_YEARS;

export const useGameState = (isMultiplayer: boolean = false) => {
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

  // Track if a transaction is in progress to prevent race conditions
  const transactionInProgress = useRef(false);
  const pendingTimeUpdate = useRef<{year: number; month: number} | null>(null);

  // Debug: Monitor pocket cash changes (DISABLED for performance)
  // useEffect(() => {
  //   console.log(`💵 Pocket Cash State: ₹${gameState.pocketCash.toFixed(2)}`);
  // }, [gameState.pocketCash]);

  // Start game timer (disabled in multiplayer mode - server controls time)
  useEffect(() => {
    if (gameState.mode !== 'solo' || gameState.isPaused || isMultiplayer) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        // CRITICAL FIX: Stop timer if game has ended (year 20, month 12)
        if (prev.currentYear >= TOTAL_GAME_YEARS && prev.currentMonth === 12) {
          clearInterval(interval);
          return prev;
        }

        // Check if game has ended before processing
        if (prev.currentYear > TOTAL_GAME_YEARS) {
          return prev;
        }

        let newMonth = prev.currentMonth + 1;
        let newYear = prev.currentYear;

        if (newMonth > 12) {
          newMonth = 1;
          newYear += 1;
        }

        // Stop at year 20, month 12 - don't increment to year 21
        if (newYear > TOTAL_GAME_YEARS) {
          clearInterval(interval);
          return {
            ...prev,
            currentYear: TOTAL_GAME_YEARS,
            currentMonth: 12,
            isStarted: false, // Mark game as ended
          };
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

        // Add recurring income every 6 months (months 6 and 12)
        let newPocketCash = prev.pocketCash;
        if ((newMonth === 6 || newMonth === 12) && prev.adminSettings?.recurringIncome) {
          newPocketCash += prev.adminSettings.recurringIncome;
        }

        return {
          ...prev,
          currentMonth: newMonth,
          currentYear: newYear,
          pocketCash: newPocketCash,
          savingsAccount: { ...prev.savingsAccount, balance: newSavingsBalance },
          fixedDeposits: updatedFDs
        };
      });
    }, MONTH_DURATION_MS);

    return () => clearInterval(interval);
  }, [gameState.mode, gameState.isPaused, isMultiplayer]);

  const openSettings = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      mode: 'settings'
    }));
  }, []);

  const startMultiplayerGame = useCallback((adminSettings: AdminSettings, initialData?: { selectedAssets?: any; assetUnlockSchedule?: any; yearlyQuotes?: string[]; quizQuestionIndices?: { [category: string]: number } }) => {
    // For multiplayer, either use provided initial data (from server/host) or generate locally
    let selectedAssets: SelectedAssets;
    let assetUnlockSchedule: any;
    let shuffledQuotes: string[];
    let quizQuestionIndices: { [category: string]: number };

    if (initialData && initialData.selectedAssets) {
      selectedAssets = initialData.selectedAssets;
      assetUnlockSchedule = initialData.assetUnlockSchedule;
      shuffledQuotes = initialData.yearlyQuotes || [...FINANCIAL_QUOTES].sort(() => Math.random() - 0.5);
      quizQuestionIndices = initialData.quizQuestionIndices || generateQuestionIndices();
    } else {
      const selectedStocks = getRandomItems(AVAILABLE_STOCKS, 2, 5);
      const fundType: 'index' | 'mutual' = Math.random() > 0.5 ? 'index' : 'mutual';
      const fundName = fundType === 'index'
        ? getRandomItem(AVAILABLE_INDEX_FUNDS)
        : getRandomItem(AVAILABLE_MUTUAL_FUNDS);
      const selectedCommodity = getRandomItem(AVAILABLE_COMMODITIES);

      selectedAssets = {
        stocks: selectedStocks,
        fundType,
        fundName,
        commodity: selectedCommodity
      };

      assetUnlockSchedule = generateAssetUnlockSchedule(
        adminSettings.selectedCategories,
        adminSettings.gameStartYear
      );

      shuffledQuotes = [...FINANCIAL_QUOTES].sort(() => Math.random() - 0.5);

      quizQuestionIndices = generateQuestionIndices();
    }

    setGameState({
      mode: 'solo',
      isStarted: true,
      currentYear: 1,
      currentMonth: 1,
      pocketCash: adminSettings.initialPocketCash || STARTING_CASH,
      savingsAccount: { balance: 0, interestRate: SAVINGS_INTEREST_RATE },
      fixedDeposits: [],
      holdings: initialHoldings,
      gameStartTime: Date.now(),
      isPaused: false,
      selectedAssets,
      adminSettings,
      assetUnlockSchedule,
      yearlyQuotes: shuffledQuotes,
      completedQuizzes: [],
      quizQuestionIndices
    });
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

    // Generate random question indices for quiz (one per category, consistent for this game session)
    const quizQuestionIndices = generateQuestionIndices();

    setGameState({
      mode: 'solo',
      isStarted: true,
      currentYear: 1,
      currentMonth: 1,
      pocketCash: adminSettings?.initialPocketCash || STARTING_CASH,
      savingsAccount: { balance: 0, interestRate: SAVINGS_INTEREST_RATE },
      fixedDeposits: [],
      holdings: initialHoldings,
      gameStartTime: Date.now(),
      isPaused: false,
      selectedAssets,
      adminSettings,
      assetUnlockSchedule,
      yearlyQuotes: shuffledQuotes,
      completedQuizzes: [],
      quizQuestionIndices
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
      if (gameHasEnded(prev)) return prev; // no updates after game end
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
      if (gameHasEnded(prev)) return prev;
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
      if (gameHasEnded(prev)) return prev;
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
    setGameState(prev => {      if (gameHasEnded(prev)) return prev;      const fd = prev.fixedDeposits.find(f => f.id === fdId);
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
      if (gameHasEnded(prev)) return prev;
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
    // CRITICAL FIX: Prevent buying at price 0 (invalid transaction!)
    if (currentPrice <= 0) {
      console.error(`❌ Cannot buy ${assetName}: Invalid price ${currentPrice}`);
      alert(`Cannot buy ${assetName}: Price data not available for this period`);
      return;
    }

    setGameState(prev => {
      if (gameHasEnded(prev)) return prev; // Prevent transactions after game end
      const totalCost = quantity * currentPrice;
      console.log(`🛒 Buying ${quantity} ${assetName} @ ₹${currentPrice} = ₹${totalCost}`);
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
    // CRITICAL DEBUG: Always log sell transactions to catch pricing issues
    console.log(`\n🔍 ===== SELL TRANSACTION START =====`);
    console.log(`📌 Asset: ${assetName} (${assetType})`);
    console.log(`📌 Quantity to Sell: ${quantity}`);
    console.log(`📌 Current Price per unit: ₹${currentPrice}`);
    console.log(`📌 Expected Sale Amount: ₹${(quantity * currentPrice).toFixed(2)}`);

    // CRITICAL FIX: Prevent selling at price 0 (would cause bankruptcy!)
    if (currentPrice <= 0) {
      console.error(`❌ Cannot sell ${assetName}: Invalid price ${currentPrice}`);
      alert(`Cannot sell ${assetName}: Price data not available for this period`);
      return;
    }

    // Mark transaction as in progress
    transactionInProgress.current = true;

    setGameState(prev => {
      if (gameHasEnded(prev)) return prev; // Prevent transactions after game end
      const newHoldings = { ...prev.holdings };
      let holding: AssetHolding | undefined;

      if (assetType === 'physicalGold' || assetType === 'digitalGold' || assetType === 'indexFund' ||
          assetType === 'mutualFund' || assetType === 'commodity') {
        holding = newHoldings[assetType as keyof typeof newHoldings] as AssetHolding;
      } else if (assetType === 'stocks' || assetType === 'crypto' || assetType === 'reits') {
        const assetGroup = newHoldings[assetType as 'stocks' | 'crypto' | 'reits'];
        holding = assetGroup[assetName];
      }

      if (!holding || holding.quantity < quantity) {
        if (DEBUG_MODE) {
          console.error(`❌ TRANSACTION BLOCKED: Insufficient holdings!`);
          console.error(`   Available: ${holding?.quantity || 0}, Requested: ${quantity}`);
        }
        return prev;
      }

      const saleAmount = quantity * currentPrice;
      const newQuantity = holding.quantity - quantity;
      const reducedInvestment = (holding.totalInvested / holding.quantity) * quantity;

      console.log(`💰 Sale Calculation:`);
      console.log(`   Holding Quantity: ${holding.quantity}`);
      console.log(`   Sale Amount: ₹${saleAmount.toFixed(2)}`);
      console.log(`   Reduced Investment: ₹${reducedInvestment.toFixed(2)}`);
      console.log(`   New Quantity: ${newQuantity}`);

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

      const updatedState = {
        ...prev,
        pocketCash: prev.pocketCash + saleAmount,
        holdings: newHoldings
      };

      console.log(`✅ Updated Pocket Cash: ₹${prev.pocketCash.toFixed(2)} + ₹${saleAmount.toFixed(2)} = ₹${updatedState.pocketCash.toFixed(2)}`);
      console.log(`🔍 ===== SELL TRANSACTION END =====\n`);

      return updatedState;
    });

    // Unlock transaction after state update completes
    setTimeout(() => {
      transactionInProgress.current = false;

      // Apply any pending time update
      if (pendingTimeUpdate.current) {
        const { year, month } = pendingTimeUpdate.current;
        pendingTimeUpdate.current = null;
        updateTime(year, month);
      }
    }, 50);
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

  // Update time from external source (for multiplayer)
  const updateTime = useCallback((year: number, month: number) => {
    // If a transaction is in progress, defer the time update
    if (transactionInProgress.current) {
      pendingTimeUpdate.current = { year, month };
      return;
    }

    setGameState(prev => {
      // Do not apply any time updates once the game has ended
      if (gameHasEnded(prev)) return prev;

      // If server sent a year beyond the allowed game years, clamp to final and mark game ended
      if (year > TOTAL_GAME_YEARS) {
        return {
          ...prev,
          currentYear: TOTAL_GAME_YEARS,
          currentMonth: 12,
          isStarted: false
        };
      }

      // If server sent the final year and final month, mark game ended
      if (year === TOTAL_GAME_YEARS && month >= 12) {
        // Apply any month change interest & FD maturity semantics first (so final state's pocket/savings are updated)
        let newSavingsBalance = prev.savingsAccount.balance;
        if (month !== prev.currentMonth) {
          const monthlyInterest = prev.savingsAccount.balance * (SAVINGS_INTEREST_RATE / 12);
          newSavingsBalance = prev.savingsAccount.balance + monthlyInterest;
        }

        const updatedFDs = prev.fixedDeposits.map(fd => {
          if (!fd.isMatured && fd.maturityYear === year && fd.maturityMonth === month) {
            return { ...fd, isMatured: true };
          }
          return fd;
        });

        let newPocketCash = prev.pocketCash;
        if ((month === 6 || month === 12) && month !== prev.currentMonth && prev.adminSettings?.recurringIncome) {
          newPocketCash += prev.adminSettings.recurringIncome;
        }

        console.log('🎯 updateTime: final year/month received, marking game as ended locally');

        return {
          ...prev,
          currentYear: TOTAL_GAME_YEARS,
          currentMonth: 12,
          pocketCash: newPocketCash,
          savingsAccount: { ...prev.savingsAccount, balance: newSavingsBalance },
          fixedDeposits: updatedFDs,
          isStarted: false,
        };
      }

      // Apply monthly savings account interest if month changed
      let newSavingsBalance = prev.savingsAccount.balance;
      if (month !== prev.currentMonth) {
        const monthlyInterest = prev.savingsAccount.balance * (SAVINGS_INTEREST_RATE / 12);
        newSavingsBalance = prev.savingsAccount.balance + monthlyInterest;
      }

      // Update FD maturity status
      const updatedFDs = prev.fixedDeposits.map(fd => {
        if (!fd.isMatured && fd.maturityYear === year && fd.maturityMonth === month) {
          return { ...fd, isMatured: true };
        }
        return fd;
      });

      // Add recurring income every 6 months (months 6 and 12)
      let newPocketCash = prev.pocketCash;
      if ((month === 6 || month === 12) && month !== prev.currentMonth && prev.adminSettings?.recurringIncome) {
        newPocketCash += prev.adminSettings.recurringIncome;
      }

      return {
        ...prev,
        currentYear: year,
        currentMonth: month,
        pocketCash: newPocketCash,
        savingsAccount: { ...prev.savingsAccount, balance: newSavingsBalance },
        fixedDeposits: updatedFDs
      };
    });
  }, []);

  // Update pause state from external source (for multiplayer)
  const updatePauseState = useCallback((isPaused: boolean) => {
    setGameState(prev => ({
      ...prev,
      isPaused
    }));
  }, []);

  return {
    gameState,
    openSettings,
    startSoloGame,
    startMultiplayerGame,
    backToMenu,
    depositToSavings,
    withdrawFromSavings,
    createFixedDeposit,
    collectFD,
    breakFD,
    buyAsset,
    sellAsset,
    togglePause,
    markQuizCompleted,
    updateTime,
    updatePauseState
  };
};
