import React, { useState } from 'react';
import { AssetHolding } from '../types';
import { MiniChart } from './MiniChart';
import './AssetCard.css';

interface TradeableAssetCardProps {
  name: string;
  currentPrice: number;
  previousPrice: number;
  priceHistory: number[];
  holding: AssetHolding;
  pocketCash: number;
  unit: string; // e.g., "/10g", "/share", "/coin"
  onBuy: (quantity: number) => void;
  onSell: (quantity: number) => void;
  isStock?: boolean; // Add compact stock card styling
}

export const TradeableAssetCard: React.FC<TradeableAssetCardProps> = ({
  name,
  currentPrice,
  previousPrice,
  priceHistory,
  holding,
  pocketCash,
  unit,
  onBuy,
  onSell,
  isStock = false
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [customQuantity, setCustomQuantity] = useState('');

  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice > 0 ? (priceChange / previousPrice) * 100 : 0;
  const isPositive = priceChange >= 0;

  const handleBuy = () => {
    const quantity = customQuantity ? parseFloat(customQuantity) : selectedQuantity;
    if (quantity <= 0) return;

    const totalCost = quantity * currentPrice;
    if (totalCost > pocketCash) {
      alert('Insufficient pocket cash!');
      return;
    }

    onBuy(quantity);
    setCustomQuantity('');
  };

  const handleSell = () => {
    const quantity = customQuantity ? parseFloat(customQuantity) : selectedQuantity;
    if (quantity <= 0) return;

    if (quantity > holding.quantity) {
      alert('Insufficient holdings!');
      return;
    }

    onSell(quantity);
    setCustomQuantity('');
  };

  const maxBuyQuantity = Math.floor(pocketCash / currentPrice);

  return (
    <div className={`asset-card tradeable-card ${isStock ? 'stock-card' : ''}`}>
      <h3 className="card-title">{name}</h3>

      <div className="chart-container">
        <MiniChart data={priceHistory} isPositive={isPositive} />
      </div>

      <div className="price-info">
        <div className="current-price">
          <span className="price-label">Curr. ₹{unit}</span>
          <span className={`price-value ${isPositive ? 'positive' : 'negative'}`}>
            ₹{currentPrice.toFixed(2)}
          </span>
          <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(priceChangePercent).toFixed(2)}%
          </span>
        </div>
        <div className="holding-info">
          <div className="holding-row">
            <span>Holdings:</span>
            <span>{holding.quantity.toFixed(2)}</span>
          </div>
        </div>
        <div className="holding-info">
          <div className="holding-row">
            <span>AVG. Price:</span>
            <span>₹{holding.avgPrice > 0 ? holding.avgPrice.toFixed(2) : '-'}</span>
          </div>
        </div>
      </div>

      <div className="quantity-selector">
        <button
          className={`qty-btn ${selectedQuantity === 1 && !customQuantity ? 'active' : ''}`}
          onClick={() => {
            setSelectedQuantity(1);
            setCustomQuantity('');
          }}
        >
          1
        </button>
        <button
          className={`qty-btn ${selectedQuantity === 10 && !customQuantity ? 'active' : ''}`}
          onClick={() => {
            setSelectedQuantity(10);
            setCustomQuantity('');
          }}
        >
          10
        </button>
        <input
          type="number"
          className="qty-input"
          value={customQuantity}
          onChange={(e) => setCustomQuantity(e.target.value)}
          placeholder="Custom"
        />
        <button
          className="qty-btn max-qty-btn"
          onClick={() => {
            setCustomQuantity(maxBuyQuantity.toString());
            setSelectedQuantity(0);
          }}
        >
          MAX
        </button>
      </div>

      <div className="button-group">
        <button className="action-button buy-btn" onClick={handleBuy}>
          BUY
        </button>
        <button className="action-button sell-btn" onClick={handleSell}>
          SELL
        </button>
      </div>
    </div>
  );
};
