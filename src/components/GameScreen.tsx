import React, { useState, useEffect } from 'react';
import { GameState, AssetData, FDRate } from '../types';
import { SavingsAccountCard } from './SavingsAccountCard';
import { FixedDepositCard } from './FixedDepositCard';
import { TradeableAssetCard } from './TradeableAssetCard';
import { loadCSV, parseAssetCSV, parseFDRates, getAssetPriceAtDate, getFDRateForYear } from '../utils/csvLoader';
import { ASSET_UNLOCK_TIMELINE } from '../utils/constants';
import './GameScreen.css';

interface GameScreenProps {
  gameState: GameState;
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
  onCreateFD: (amount: number, duration: 3 | 12 | 36, rate: number) => void;
  onCollectFD: (fdId: string) => void;
  onBreakFD: (fdId: string) => void;
  onBuyAsset: (assetType: string, assetName: string, quantity: number, price: number) => void;
  onSellAsset: (assetType: string, assetName: string, quantity: number, price: number) => void;
  onTogglePause: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  gameState,
  onDeposit,
  onWithdraw,
  onCreateFD,
  onCollectFD,
  onBreakFD,
  onBuyAsset,
  onSellAsset,
  onTogglePause
}) => {
  const [physicalGoldData, setPhysicalGoldData] = useState<AssetData[]>([]);
  const [digitalGoldData, setDigitalGoldData] = useState<AssetData[]>([]);
  const [fdRates, setFdRates] = useState<FDRate[]>([]);

  // Index Fund & Mutual Fund data
  const [niftyBeesData, setNiftyBeesData] = useState<AssetData[]>([]);

  // Individual Stocks data
  const [tataMotorsData, setTataMotorsData] = useState<AssetData[]>([]);
  const [itcData, setItcData] = useState<AssetData[]>([]);
  const [bajajData, setBajajData] = useState<AssetData[]>([]);
  const [relianceData, setRelianceData] = useState<AssetData[]>([]);
  const [tcsData, setTcsData] = useState<AssetData[]>([]);

  // Crypto data
  const [btcData, setBtcData] = useState<AssetData[]>([]);
  const [ethData, setEthData] = useState<AssetData[]>([]);

  // Commodity data
  const [silverData, setSilverData] = useState<AssetData[]>([]);

  // REIT data
  const [embassyData, setEmbassyData] = useState<AssetData[]>([]);
  const [mindspaceData, setMindspaceData] = useState<AssetData[]>([]);

  const currentYear = gameState.currentYear;

  // Load CSV data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load FD rates
        const fdText = await loadCSV('/data/Fd_Rate/fd_rates.csv');
        setFdRates(parseFDRates(fdText));

        // Load gold data
        const physicalGoldText = await loadCSV('/data/Gold_Investments/Physical_Gold.csv');
        setPhysicalGoldData(parseAssetCSV(physicalGoldText));

        const digitalGoldText = await loadCSV('/data/Gold_Investments/Digital_Gold.csv');
        setDigitalGoldData(parseAssetCSV(digitalGoldText));

        // Load Index Fund data (NIFTYBEES as default)
        const niftyText = await loadCSV('/data/Index_Funds/NIFTYBEES.csv');
        setNiftyBeesData(parseAssetCSV(niftyText));

        // Load Stock data
        const tataMotorsText = await loadCSV('/data/Indian_Stocks/TATAMOTORS.csv');
        setTataMotorsData(parseAssetCSV(tataMotorsText));

        const itcText = await loadCSV('/data/Indian_Stocks/ITC.csv');
        setItcData(parseAssetCSV(itcText));

        const bajajText = await loadCSV('/data/Indian_Stocks/BAJFINANCE.csv');
        setBajajData(parseAssetCSV(bajajText));

        const relianceText = await loadCSV('/data/Indian_Stocks/RELIANCE.csv');
        setRelianceData(parseAssetCSV(relianceText));

        const tcsText = await loadCSV('/data/Indian_Stocks/TCS.csv');
        setTcsData(parseAssetCSV(tcsText));

        // Load Crypto data
        const btcText = await loadCSV('/data/Crypto_Assets/BTC.csv');
        setBtcData(parseAssetCSV(btcText));

        const ethText = await loadCSV('/data/Crypto_Assets/ETH.csv');
        setEthData(parseAssetCSV(ethText));

        // Load Commodity data (SILVER as default)
        const silverText = await loadCSV('/data/Commodities/SILVER.csv');
        setSilverData(parseAssetCSV(silverText));

        // Load REIT data
        const embassyText = await loadCSV('/data/REIT/EMBASSY.csv');
        setEmbassyData(parseAssetCSV(embassyText));

        const mindspaceText = await loadCSV('/data/REIT/MINDSPACE.csv');
        setMindspaceData(parseAssetCSV(mindspaceText));
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    loadData();
  }, []);

  // Check if asset is unlocked
  const isAssetUnlocked = (assetName: string): boolean => {
    for (const [year, assets] of Object.entries(ASSET_UNLOCK_TIMELINE)) {
      if (assets.includes(assetName) && currentYear >= parseInt(year)) {
        return true;
      }
    }
    return false;
  };

  // Get current FD rates
  const currentFDRates = {
    threeMonth: getFDRateForYear(fdRates, currentYear, 3),
    oneYear: getFDRateForYear(fdRates, currentYear, 12),
    threeYear: getFDRateForYear(fdRates, currentYear, 36)
  };

  // Get asset prices
  const physicalGoldPrice = getAssetPriceAtDate(physicalGoldData, currentYear, gameState.currentMonth);
  const digitalGoldPrice = getAssetPriceAtDate(digitalGoldData, currentYear, gameState.currentMonth);

  // Get price history for charts (last 12 months)
  const getRecentPrices = (data: AssetData[], months: number = 12): number[] => {
    const prices: number[] = [];
    for (let i = months; i >= 0; i--) {
      let targetMonth = gameState.currentMonth - i;
      let targetYear = currentYear;

      if (targetMonth <= 0) {
        targetMonth += 12;
        targetYear -= 1;
      }

      const price = getAssetPriceAtDate(data, targetYear, targetMonth);
      prices.push(price);
    }
    return prices;
  };

  const physicalGoldHistory = getRecentPrices(physicalGoldData);
  const digitalGoldHistory = getRecentPrices(digitalGoldData);

  const previousPhysicalGoldPrice = physicalGoldHistory[physicalGoldHistory.length - 2] || physicalGoldPrice;
  const previousDigitalGoldPrice = digitalGoldHistory[digitalGoldHistory.length - 2] || digitalGoldPrice;

  // Index Fund prices
  const niftyBeesPrice = getAssetPriceAtDate(niftyBeesData, currentYear, gameState.currentMonth);
  const niftyBeesHistory = getRecentPrices(niftyBeesData);
  const previousNiftyBeesPrice = niftyBeesHistory[niftyBeesHistory.length - 2] || niftyBeesPrice;

  // Stock prices
  const tataMotorsPrice = getAssetPriceAtDate(tataMotorsData, currentYear, gameState.currentMonth);
  const tataMotorsHistory = getRecentPrices(tataMotorsData);
  const previousTataMotorsPrice = tataMotorsHistory[tataMotorsHistory.length - 2] || tataMotorsPrice;

  const itcPrice = getAssetPriceAtDate(itcData, currentYear, gameState.currentMonth);
  const itcHistory = getRecentPrices(itcData);
  const previousItcPrice = itcHistory[itcHistory.length - 2] || itcPrice;

  const bajajPrice = getAssetPriceAtDate(bajajData, currentYear, gameState.currentMonth);
  const bajajHistory = getRecentPrices(bajajData);
  const previousBajajPrice = bajajHistory[bajajHistory.length - 2] || bajajPrice;

  const reliancePrice = getAssetPriceAtDate(relianceData, currentYear, gameState.currentMonth);
  const relianceHistory = getRecentPrices(relianceData);
  const previousReliancePrice = relianceHistory[relianceHistory.length - 2] || reliancePrice;

  const tcsPrice = getAssetPriceAtDate(tcsData, currentYear, gameState.currentMonth);
  const tcsHistory = getRecentPrices(tcsData);
  const previousTcsPrice = tcsHistory[tcsHistory.length - 2] || tcsPrice;

  // Crypto prices
  const btcPrice = getAssetPriceAtDate(btcData, currentYear, gameState.currentMonth);
  const btcHistory = getRecentPrices(btcData);
  const previousBtcPrice = btcHistory[btcHistory.length - 2] || btcPrice;

  const ethPrice = getAssetPriceAtDate(ethData, currentYear, gameState.currentMonth);
  const ethHistory = getRecentPrices(ethData);
  const previousEthPrice = ethHistory[ethHistory.length - 2] || ethPrice;

  // Commodity prices
  const silverPrice = getAssetPriceAtDate(silverData, currentYear, gameState.currentMonth);
  const silverHistory = getRecentPrices(silverData);
  const previousSilverPrice = silverHistory[silverHistory.length - 2] || silverPrice;

  // REIT prices
  const embassyPrice = getAssetPriceAtDate(embassyData, currentYear, gameState.currentMonth);
  const embassyHistory = getRecentPrices(embassyData);
  const previousEmbassyPrice = embassyHistory[embassyHistory.length - 2] || embassyPrice;

  const mindspacePrice = getAssetPriceAtDate(mindspaceData, currentYear, gameState.currentMonth);
  const mindspaceHistory = getRecentPrices(mindspaceData);
  const previousMindspacePrice = mindspaceHistory[mindspaceHistory.length - 2] || mindspacePrice;

  return (
    <div className="game-screen">
      {/* Left Sidebar */}
      <div className="sidebar">
        <h1 className="game-logo">BUILD<br />YOUR<br />DHAN</h1>

        <div className="game-info">
          <p className="quote">
            Rule No. 1 is never lose money. Rule No. 2 is never forget Rule No. 1.
          </p>
        </div>

        <div className="pocket-cash">
          <div className="pocket-label">Pocket Cash</div>
          <div className="pocket-amount">₹{gameState.pocketCash.toFixed(2)}</div>
        </div>

        <div className="leaderboard">
          <h3>Leaderboard</h3>
          <ol>
            <li>__________</li>
            <li>__________</li>
            <li>__________</li>
            <li>__________</li>
            <li>__________</li>
          </ol>
        </div>

        <div className="game-timer">
          <div>Year: {currentYear}/20</div>
          <div>Month: {gameState.currentMonth}</div>
        </div>

        <button className="pause-button" onClick={onTogglePause}>
          {gameState.isPaused ? '▶ RESUME' : '⏸ PAUSE'}
        </button>
      </div>

      {/* Main Content */}
      <div className={`main-content year-${currentYear}`}>
        {/* Dynamic Layout Based on Year */}

        {/* Year 1: Only Savings - Large Centered */}
        {currentYear === 1 && (
          <div className="year-1-layout">
            <section className="banking-section">
              <h2 className="section-title">BANKING</h2>
              <div className="section-cards">
                <SavingsAccountCard
                  balance={gameState.savingsAccount.balance}
                  pocketCash={gameState.pocketCash}
                  onDeposit={onDeposit}
                  onWithdraw={onWithdraw}
                />
              </div>
            </section>
          </div>
        )}

        {/* Year 2: Savings + FD - Split Screen */}
        {currentYear === 2 && (
          <div className="year-2-layout">
            <section className="banking-section">
              <h2 className="section-title">BANKING</h2>
              <div className="section-cards">
                <div className="large-card-wrapper">
                  <SavingsAccountCard
                    balance={gameState.savingsAccount.balance}
                    pocketCash={gameState.pocketCash}
                    onDeposit={onDeposit}
                    onWithdraw={onWithdraw}
                  />
                </div>
                <div className="large-card-wrapper">
                  <FixedDepositCard
                    fixedDeposits={gameState.fixedDeposits}
                    pocketCash={gameState.pocketCash}
                    currentRates={currentFDRates}
                    onCreate={onCreateFD}
                    onCollect={onCollectFD}
                    onBreak={onBreakFD}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Year 3: Savings + FD + Index Fund (horizontal) */}
        {currentYear === 3 && (
          <div className="year-3-layout">
            <section className="banking-section">
              <h2 className="section-title">BANKING</h2>
              <div className="section-cards">
                <SavingsAccountCard
                  balance={gameState.savingsAccount.balance}
                  pocketCash={gameState.pocketCash}
                  onDeposit={onDeposit}
                  onWithdraw={onWithdraw}
                />
                <FixedDepositCard
                  fixedDeposits={gameState.fixedDeposits}
                  pocketCash={gameState.pocketCash}
                  currentRates={currentFDRates}
                  onCreate={onCreateFD}
                  onCollect={onCollectFD}
                  onBreak={onBreakFD}
                />
              </div>
            </section>
            <section className="index-section">
              <h2 className="section-title">INDEX FUND</h2>
              <div className="section-cards">
                <TradeableAssetCard
                  name="NIFTY 50"
                  currentPrice={niftyBeesPrice}
                  previousPrice={previousNiftyBeesPrice}
                  priceHistory={niftyBeesHistory}
                  holding={gameState.holdings.indexFund}
                  pocketCash={gameState.pocketCash}
                  unit="/share"
                  onBuy={(qty) => onBuyAsset('indexFund', 'NIFTYBEES', qty, niftyBeesPrice)}
                  onSell={(qty) => onSellAsset('indexFund', 'NIFTYBEES', qty, niftyBeesPrice)}
                />
              </div>
            </section>
          </div>
        )}

        {/* Year 4: All Cards in One Row */}
        {currentYear === 4 && (
          <div className="year-4-layout">
            <section className="banking-section">
              <h2 className="section-title">BANKING</h2>
              <div className="section-cards">
                <SavingsAccountCard
                  balance={gameState.savingsAccount.balance}
                  pocketCash={gameState.pocketCash}
                  onDeposit={onDeposit}
                  onWithdraw={onWithdraw}
                />
                <FixedDepositCard
                  fixedDeposits={gameState.fixedDeposits}
                  pocketCash={gameState.pocketCash}
                  currentRates={currentFDRates}
                  onCreate={onCreateFD}
                  onCollect={onCollectFD}
                  onBreak={onBreakFD}
                />
              </div>
            </section>
            {isAssetUnlocked('PHYSICAL_GOLD') && (
              <section className="gold-section">
                <h2 className="section-title">GOLD</h2>
                <div className="section-cards">
                  <TradeableAssetCard
                    name="PHYSICAL GOLD"
                    currentPrice={physicalGoldPrice}
                    previousPrice={previousPhysicalGoldPrice}
                    priceHistory={physicalGoldHistory}
                    holding={gameState.holdings.physicalGold}
                    pocketCash={gameState.pocketCash}
                    unit="/10g"
                    onBuy={(qty) => onBuyAsset('physicalGold', 'Physical_Gold', qty, physicalGoldPrice)}
                    onSell={(qty) => onSellAsset('physicalGold', 'Physical_Gold', qty, physicalGoldPrice)}
                  />
                  <TradeableAssetCard
                    name="DIGITAL GOLD"
                    currentPrice={digitalGoldPrice}
                    previousPrice={previousDigitalGoldPrice}
                    priceHistory={digitalGoldHistory}
                    holding={gameState.holdings.digitalGold}
                    pocketCash={gameState.pocketCash}
                    unit="/10g"
                    onBuy={(qty) => onBuyAsset('digitalGold', 'Digital_Gold', qty, digitalGoldPrice)}
                    onSell={(qty) => onSellAsset('digitalGold', 'Digital_Gold', qty, digitalGoldPrice)}
                  />
                </div>
              </section>
            )}
            <section className="index-section">
              <h2 className="section-title">INDEX FUND</h2>
              <div className="section-cards">
                <TradeableAssetCard
                  name="NIFTY 50"
                  currentPrice={niftyBeesPrice}
                  previousPrice={previousNiftyBeesPrice}
                  priceHistory={niftyBeesHistory}
                  holding={gameState.holdings.indexFund}
                  pocketCash={gameState.pocketCash}
                  unit="/share"
                  onBuy={(qty) => onBuyAsset('indexFund', 'NIFTYBEES', qty, niftyBeesPrice)}
                  onSell={(qty) => onSellAsset('indexFund', 'NIFTYBEES', qty, niftyBeesPrice)}
                />
              </div>
            </section>
          </div>
        )}

        {/* Year 5+: Wrapped Layout with Sections */}
        {currentYear >= 5 && (
          <div className={`year-${currentYear}-layout`}>
            {/* BANKING Section */}
            <section className="banking-section">
              <h2 className="section-title">BANKING</h2>
              <div className="section-cards">
                <SavingsAccountCard
                  balance={gameState.savingsAccount.balance}
                  pocketCash={gameState.pocketCash}
                  onDeposit={onDeposit}
                  onWithdraw={onWithdraw}
                />
                <FixedDepositCard
                  fixedDeposits={gameState.fixedDeposits}
                  pocketCash={gameState.pocketCash}
                  currentRates={currentFDRates}
                  onCreate={onCreateFD}
                  onCollect={onCollectFD}
                  onBreak={onBreakFD}
                />
              </div>
            </section>

            {/* GOLD Section */}
            {isAssetUnlocked('PHYSICAL_GOLD') && (
              <section className="gold-section">
                <h2 className="section-title">GOLD</h2>
                <div className="section-cards">
                  <TradeableAssetCard
                    name="PHYSICAL GOLD"
                    currentPrice={physicalGoldPrice}
                    previousPrice={previousPhysicalGoldPrice}
                    priceHistory={physicalGoldHistory}
                    holding={gameState.holdings.physicalGold}
                    pocketCash={gameState.pocketCash}
                    unit="/10g"
                    onBuy={(qty) => onBuyAsset('physicalGold', 'Physical_Gold', qty, physicalGoldPrice)}
                    onSell={(qty) => onSellAsset('physicalGold', 'Physical_Gold', qty, physicalGoldPrice)}
                  />
                  <TradeableAssetCard
                    name="DIGITAL GOLD"
                    currentPrice={digitalGoldPrice}
                    previousPrice={previousDigitalGoldPrice}
                    priceHistory={digitalGoldHistory}
                    holding={gameState.holdings.digitalGold}
                    pocketCash={gameState.pocketCash}
                    unit="/10g"
                    onBuy={(qty) => onBuyAsset('digitalGold', 'Digital_Gold', qty, digitalGoldPrice)}
                    onSell={(qty) => onSellAsset('digitalGold', 'Digital_Gold', qty, digitalGoldPrice)}
                  />
                </div>
              </section>
            )}

            {/* INDEX FUND Section */}
            <section className="index-section">
              <h2 className="section-title">INDEX FUND</h2>
              <div className="section-cards">
                <TradeableAssetCard
                  name="NIFTY 50"
                  currentPrice={niftyBeesPrice}
                  previousPrice={previousNiftyBeesPrice}
                  priceHistory={niftyBeesHistory}
                  holding={gameState.holdings.indexFund}
                  pocketCash={gameState.pocketCash}
                  unit="/share"
                  onBuy={(qty) => onBuyAsset('indexFund', 'NIFTYBEES', qty, niftyBeesPrice)}
                  onSell={(qty) => onSellAsset('indexFund', 'NIFTYBEES', qty, niftyBeesPrice)}
                />
              </div>
            </section>

            {/* INDIVIDUAL STOCKS Section */}
            {isAssetUnlocked('INDIAN_STOCKS') && (
              <section className="stocks-section">
                <h2 className="section-title">INDIVIDUAL STOCKS</h2>
                <div className="section-cards">
                  <TradeableAssetCard
                    name="TATA MOTOR"
                    currentPrice={tataMotorsPrice}
                    previousPrice={previousTataMotorsPrice}
                    priceHistory={tataMotorsHistory}
                    holding={gameState.holdings.stocks['TATAMOTORS'] || { quantity: 0, avgPrice: 0, totalInvested: 0 }}
                    pocketCash={gameState.pocketCash}
                    unit="/share"
                    onBuy={(qty) => onBuyAsset('stocks', 'TATAMOTORS', qty, tataMotorsPrice)}
                    onSell={(qty) => onSellAsset('stocks', 'TATAMOTORS', qty, tataMotorsPrice)}
                    isStock={true}
                  />
                  <TradeableAssetCard
                    name="ITC"
                    currentPrice={itcPrice}
                    previousPrice={previousItcPrice}
                    priceHistory={itcHistory}
                    holding={gameState.holdings.stocks['ITC'] || { quantity: 0, avgPrice: 0, totalInvested: 0 }}
                    pocketCash={gameState.pocketCash}
                    unit="/share"
                    onBuy={(qty) => onBuyAsset('stocks', 'ITC', qty, itcPrice)}
                    onSell={(qty) => onSellAsset('stocks', 'ITC', qty, itcPrice)}
                    isStock={true}
                  />
                  <TradeableAssetCard
                    name="BAJAJ"
                    currentPrice={bajajPrice}
                    previousPrice={previousBajajPrice}
                    priceHistory={bajajHistory}
                    holding={gameState.holdings.stocks['BAJFINANCE'] || { quantity: 0, avgPrice: 0, totalInvested: 0 }}
                    pocketCash={gameState.pocketCash}
                    unit="/share"
                    onBuy={(qty) => onBuyAsset('stocks', 'BAJFINANCE', qty, bajajPrice)}
                    onSell={(qty) => onSellAsset('stocks', 'BAJFINANCE', qty, bajajPrice)}
                    isStock={true}
                  />
                  <TradeableAssetCard
                    name="RELIANCE IND."
                    currentPrice={reliancePrice}
                    previousPrice={previousReliancePrice}
                    priceHistory={relianceHistory}
                    holding={gameState.holdings.stocks['RELIANCE'] || { quantity: 0, avgPrice: 0, totalInvested: 0 }}
                    pocketCash={gameState.pocketCash}
                    unit="/share"
                    onBuy={(qty) => onBuyAsset('stocks', 'RELIANCE', qty, reliancePrice)}
                    onSell={(qty) => onSellAsset('stocks', 'RELIANCE', qty, reliancePrice)}
                    isStock={true}
                  />
                  <TradeableAssetCard
                    name="TCS"
                    currentPrice={tcsPrice}
                    previousPrice={previousTcsPrice}
                    priceHistory={tcsHistory}
                    holding={gameState.holdings.stocks['TCS'] || { quantity: 0, avgPrice: 0, totalInvested: 0 }}
                    pocketCash={gameState.pocketCash}
                    unit="/share"
                    onBuy={(qty) => onBuyAsset('stocks', 'TCS', qty, tcsPrice)}
                    onSell={(qty) => onSellAsset('stocks', 'TCS', qty, tcsPrice)}
                    isStock={true}
                  />
                </div>
              </section>
            )}

            {/* CRYPTOCURRENCY Section */}
            {isAssetUnlocked('BTC') && (
              <section className="crypto-section">
                <h2 className="section-title">CRYPTOCURRENCY</h2>
                <div className="section-cards">
                  <TradeableAssetCard
                    name="BTC"
                    currentPrice={btcPrice}
                    previousPrice={previousBtcPrice}
                    priceHistory={btcHistory}
                    holding={gameState.holdings.crypto['BTC'] || { quantity: 0, avgPrice: 0, totalInvested: 0 }}
                    pocketCash={gameState.pocketCash}
                    unit="/coin"
                    onBuy={(qty) => onBuyAsset('crypto', 'BTC', qty, btcPrice)}
                    onSell={(qty) => onSellAsset('crypto', 'BTC', qty, btcPrice)}
                  />
                  <TradeableAssetCard
                    name="ETH"
                    currentPrice={ethPrice}
                    previousPrice={previousEthPrice}
                    priceHistory={ethHistory}
                    holding={gameState.holdings.crypto['ETH'] || { quantity: 0, avgPrice: 0, totalInvested: 0 }}
                    pocketCash={gameState.pocketCash}
                    unit="/coin"
                    onBuy={(qty) => onBuyAsset('crypto', 'ETH', qty, ethPrice)}
                    onSell={(qty) => onSellAsset('crypto', 'ETH', qty, ethPrice)}
                  />
                </div>
              </section>
            )}

            {/* COMMODITY Section */}
            {isAssetUnlocked('COMMODITY') && (
              <section className="commodity-section">
                <h2 className="section-title">COMMODITY</h2>
                <div className="section-cards">
                  <TradeableAssetCard
                    name="SILVER"
                    currentPrice={silverPrice}
                    previousPrice={previousSilverPrice}
                    priceHistory={silverHistory}
                    holding={gameState.holdings.commodity}
                    pocketCash={gameState.pocketCash}
                    unit="/oz"
                    onBuy={(qty) => onBuyAsset('commodity', 'SILVER', qty, silverPrice)}
                    onSell={(qty) => onSellAsset('commodity', 'SILVER', qty, silverPrice)}
                  />
                </div>
              </section>
            )}

            {/* REITs Section */}
            {isAssetUnlocked('EMBASSY') && (
              <section className="reit-section">
                <h2 className="section-title">REITs</h2>
                <div className="section-cards">
                  <TradeableAssetCard
                    name="EMBASSY"
                    currentPrice={embassyPrice}
                    previousPrice={previousEmbassyPrice}
                    priceHistory={embassyHistory}
                    holding={gameState.holdings.reits['EMBASSY'] || { quantity: 0, avgPrice: 0, totalInvested: 0 }}
                    pocketCash={gameState.pocketCash}
                    unit="/share"
                    onBuy={(qty) => onBuyAsset('reits', 'EMBASSY', qty, embassyPrice)}
                    onSell={(qty) => onSellAsset('reits', 'EMBASSY', qty, embassyPrice)}
                  />
                  <TradeableAssetCard
                    name="MINDSPACE"
                    currentPrice={mindspacePrice}
                    previousPrice={previousMindspacePrice}
                    priceHistory={mindspaceHistory}
                    holding={gameState.holdings.reits['MINDSPACE'] || { quantity: 0, avgPrice: 0, totalInvested: 0 }}
                    pocketCash={gameState.pocketCash}
                    unit="/share"
                    onBuy={(qty) => onBuyAsset('reits', 'MINDSPACE', qty, mindspacePrice)}
                    onSell={(qty) => onSellAsset('reits', 'MINDSPACE', qty, mindspacePrice)}
                  />
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
