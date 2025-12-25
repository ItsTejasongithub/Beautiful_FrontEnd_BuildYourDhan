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
  // Dynamic asset data storage
  const [assetDataMap, setAssetDataMap] = useState<{ [key: string]: AssetData[] }>({});
  const [fdRates, setFdRates] = useState<FDRate[]>([]);

  const currentYear = gameState.currentYear;
  const selectedAssets = gameState.selectedAssets;

  // Load CSV data dynamically based on selected assets
  useEffect(() => {
    const loadData = async () => {
      if (!selectedAssets) return;

      try {
        const dataMap: { [key: string]: AssetData[] } = {};

        // Load FD rates
        const fdText = await loadCSV('/data/Fd_Rate/fd_rates.csv');
        setFdRates(parseFDRates(fdText));

        // Load gold data (always available)
        const physicalGoldText = await loadCSV('/data/Gold_Investments/Physical_Gold.csv');
        dataMap['Physical_Gold'] = parseAssetCSV(physicalGoldText);

        const digitalGoldText = await loadCSV('/data/Gold_Investments/Digital_Gold.csv');
        dataMap['Digital_Gold'] = parseAssetCSV(digitalGoldText);

        // Load selected Index Fund or Mutual Fund
        const fundFolder = selectedAssets.fundType === 'index' ? 'Index_Funds' : 'Mutual_Funds';
        const fundText = await loadCSV(`/data/${fundFolder}/${selectedAssets.fundName}.csv`);
        dataMap[selectedAssets.fundName] = parseAssetCSV(fundText);

        // Load selected stocks
        for (const stock of selectedAssets.stocks) {
          const stockText = await loadCSV(`/data/Indian_Stocks/${stock}.csv`);
          dataMap[stock] = parseAssetCSV(stockText);
        }

        // Load Crypto data (always BTC and ETH)
        const btcText = await loadCSV('/data/Crypto_Assets/BTC.csv');
        dataMap['BTC'] = parseAssetCSV(btcText);

        const ethText = await loadCSV('/data/Crypto_Assets/ETH.csv');
        dataMap['ETH'] = parseAssetCSV(ethText);

        // Load selected commodity
        const commodityText = await loadCSV(`/data/Commodities/${selectedAssets.commodity}.csv`);
        dataMap[selectedAssets.commodity] = parseAssetCSV(commodityText);

        // Load REIT data (always EMBASSY and MINDSPACE)
        const embassyText = await loadCSV('/data/REIT/EMBASSY.csv');
        dataMap['EMBASSY'] = parseAssetCSV(embassyText);

        const mindspaceText = await loadCSV('/data/REIT/MINDSPACE.csv');
        dataMap['MINDSPACE'] = parseAssetCSV(mindspaceText);

        setAssetDataMap(dataMap);
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    loadData();
  }, [selectedAssets]);

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

  // Helper function to get asset data safely
  const getAssetData = (assetName: string): AssetData[] => {
    return assetDataMap[assetName] || [];
  };

  // Get asset prices
  const physicalGoldPrice = getAssetPriceAtDate(getAssetData('Physical_Gold'), currentYear, gameState.currentMonth);
  const digitalGoldPrice = getAssetPriceAtDate(getAssetData('Digital_Gold'), currentYear, gameState.currentMonth);

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

  const physicalGoldHistory = getRecentPrices(getAssetData('Physical_Gold'));
  const digitalGoldHistory = getRecentPrices(getAssetData('Digital_Gold'));

  const previousPhysicalGoldPrice = physicalGoldHistory[physicalGoldHistory.length - 2] || physicalGoldPrice;
  const previousDigitalGoldPrice = digitalGoldHistory[digitalGoldHistory.length - 2] || digitalGoldPrice;

  // Fund prices (dynamically selected)
  const fundPrice = selectedAssets ? getAssetPriceAtDate(getAssetData(selectedAssets.fundName), currentYear, gameState.currentMonth) : 0;
  const fundHistory = selectedAssets ? getRecentPrices(getAssetData(selectedAssets.fundName)) : [];
  const previousFundPrice = fundHistory[fundHistory.length - 2] || fundPrice;

  // Crypto prices
  const btcPrice = getAssetPriceAtDate(getAssetData('BTC'), currentYear, gameState.currentMonth);
  const btcHistory = getRecentPrices(getAssetData('BTC'));
  const previousBtcPrice = btcHistory[btcHistory.length - 2] || btcPrice;

  const ethPrice = getAssetPriceAtDate(getAssetData('ETH'), currentYear, gameState.currentMonth);
  const ethHistory = getRecentPrices(getAssetData('ETH'));
  const previousEthPrice = ethHistory[ethHistory.length - 2] || ethPrice;

  // Commodity prices (dynamically selected)
  const commodityPrice = selectedAssets ? getAssetPriceAtDate(getAssetData(selectedAssets.commodity), currentYear, gameState.currentMonth) : 0;
  const commodityHistory = selectedAssets ? getRecentPrices(getAssetData(selectedAssets.commodity)) : [];
  const previousCommodityPrice = commodityHistory[commodityHistory.length - 2] || commodityPrice;

  // REIT prices
  const embassyPrice = getAssetPriceAtDate(getAssetData('EMBASSY'), currentYear, gameState.currentMonth);
  const embassyHistory = getRecentPrices(getAssetData('EMBASSY'));
  const previousEmbassyPrice = embassyHistory[embassyHistory.length - 2] || embassyPrice;

  const mindspacePrice = getAssetPriceAtDate(getAssetData('MINDSPACE'), currentYear, gameState.currentMonth);
  const mindspaceHistory = getRecentPrices(getAssetData('MINDSPACE'));
  const previousMindspacePrice = mindspaceHistory[mindspaceHistory.length - 2] || mindspacePrice;

  // Helper function to get stock price data dynamically
  const getStockPriceData = (stockName: string) => {
    const data = getAssetData(stockName);
    const price = getAssetPriceAtDate(data, currentYear, gameState.currentMonth);
    const history = getRecentPrices(data);
    const previousPrice = history[history.length - 2] || price;
    return { price, history, previousPrice };
  };

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
                {selectedAssets && (
                  <TradeableAssetCard
                    name={selectedAssets.fundName}
                    currentPrice={fundPrice}
                    previousPrice={previousFundPrice}
                    priceHistory={fundHistory}
                    holding={selectedAssets.fundType === 'index' ? gameState.holdings.indexFund : gameState.holdings.mutualFund}
                    pocketCash={gameState.pocketCash}
                    unit="/share"
                    onBuy={(qty) => onBuyAsset(selectedAssets.fundType === 'index' ? 'indexFund' : 'mutualFund', selectedAssets.fundName, qty, fundPrice)}
                    onSell={(qty) => onSellAsset(selectedAssets.fundType === 'index' ? 'indexFund' : 'mutualFund', selectedAssets.fundName, qty, fundPrice)}
                  />
                )}
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
                {selectedAssets && (
                  <TradeableAssetCard
                    name={selectedAssets.fundName}
                    currentPrice={fundPrice}
                    previousPrice={previousFundPrice}
                    priceHistory={fundHistory}
                    holding={selectedAssets.fundType === 'index' ? gameState.holdings.indexFund : gameState.holdings.mutualFund}
                    pocketCash={gameState.pocketCash}
                    unit="/share"
                    onBuy={(qty) => onBuyAsset(selectedAssets.fundType === 'index' ? 'indexFund' : 'mutualFund', selectedAssets.fundName, qty, fundPrice)}
                    onSell={(qty) => onSellAsset(selectedAssets.fundType === 'index' ? 'indexFund' : 'mutualFund', selectedAssets.fundName, qty, fundPrice)}
                  />
                )}
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
                {selectedAssets && (
                  <TradeableAssetCard
                    name={selectedAssets.fundName}
                    currentPrice={fundPrice}
                    previousPrice={previousFundPrice}
                    priceHistory={fundHistory}
                    holding={selectedAssets.fundType === 'index' ? gameState.holdings.indexFund : gameState.holdings.mutualFund}
                    pocketCash={gameState.pocketCash}
                    unit="/share"
                    onBuy={(qty) => onBuyAsset(selectedAssets.fundType === 'index' ? 'indexFund' : 'mutualFund', selectedAssets.fundName, qty, fundPrice)}
                    onSell={(qty) => onSellAsset(selectedAssets.fundType === 'index' ? 'indexFund' : 'mutualFund', selectedAssets.fundName, qty, fundPrice)}
                  />
                )}
              </div>
            </section>

            {/* INDIVIDUAL STOCKS Section - Dynamic */}
            {isAssetUnlocked('INDIAN_STOCKS') && selectedAssets && (
              <section className="stocks-section">
                <h2 className="section-title">INDIVIDUAL STOCKS</h2>
                <div className="section-cards">
                  {selectedAssets.stocks.map((stockName) => {
                    const stockData = getStockPriceData(stockName);
                    return (
                      <TradeableAssetCard
                        key={stockName}
                        name={stockName}
                        currentPrice={stockData.price}
                        previousPrice={stockData.previousPrice}
                        priceHistory={stockData.history}
                        holding={gameState.holdings.stocks[stockName] || { quantity: 0, avgPrice: 0, totalInvested: 0 }}
                        pocketCash={gameState.pocketCash}
                        unit="/share"
                        onBuy={(qty) => onBuyAsset('stocks', stockName, qty, stockData.price)}
                        onSell={(qty) => onSellAsset('stocks', stockName, qty, stockData.price)}
                        isStock={true}
                      />
                    );
                  })}
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

            {/* COMMODITY Section - Dynamic */}
            {isAssetUnlocked('COMMODITY') && selectedAssets && (
              <section className="commodity-section">
                <h2 className="section-title">COMMODITY</h2>
                <div className="section-cards">
                  <TradeableAssetCard
                    name={selectedAssets.commodity}
                    currentPrice={commodityPrice}
                    previousPrice={previousCommodityPrice}
                    priceHistory={commodityHistory}
                    holding={gameState.holdings.commodity}
                    pocketCash={gameState.pocketCash}
                    unit="/oz"
                    onBuy={(qty) => onBuyAsset('commodity', selectedAssets.commodity, qty, commodityPrice)}
                    onSell={(qty) => onSellAsset('commodity', selectedAssets.commodity, qty, commodityPrice)}
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
