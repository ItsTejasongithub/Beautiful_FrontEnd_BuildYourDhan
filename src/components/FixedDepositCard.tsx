import React, { useState } from 'react';
import { FixedDeposit } from '../types';
import './AssetCard.css';

interface FixedDepositCardProps {
  fixedDeposits: FixedDeposit[];
  pocketCash: number;
  currentRates: { threeMonth: number; oneYear: number; threeYear: number };
  onCreate: (amount: number, duration: 3 | 12 | 36, rate: number) => void;
  onCollect: (fdId: string) => void;
  onBreak: (fdId: string) => void;
}

export const FixedDepositCard: React.FC<FixedDepositCardProps> = ({
  fixedDeposits,
  pocketCash,
  currentRates,
  onCreate,
  onCollect,
  onBreak
}) => {
  const [showInput, setShowInput] = useState(false);
  const [inputAmount, setInputAmount] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<3 | 12 | 36>(12);

  const handleCreateFD = () => {
    const amount = parseFloat(inputAmount);
    if (isNaN(amount) || amount <= 0 || amount > pocketCash) return;

    const rate =
      selectedDuration === 3 ? currentRates.threeMonth :
      selectedDuration === 12 ? currentRates.oneYear :
      currentRates.threeYear;

    onCreate(amount, selectedDuration, rate);
    setShowInput(false);
    setInputAmount('');
  };

  const handleMax = () => {
    setInputAmount(pocketCash.toFixed(0));
  };

  return (
    <div className="asset-card fd-card">
      <h3 className="card-title">FIXED DEPOSIT</h3>

      <div className="fd-rates">
        <div className="rate-item">
          <span className="rate-label">3Mo</span>
          <span className="rate-value">{currentRates.threeMonth}%</span>
        </div>
        <div className="rate-item">
          <span className="rate-label">1Yr</span>
          <span className="rate-value">{currentRates.oneYear}%</span>
        </div>
        <div className="rate-item">
          <span className="rate-label">3Yr</span>
          <span className="rate-value">{currentRates.threeYear}%</span>
        </div>
      </div>

      {fixedDeposits.length < 3 && !showInput && (
        <button
          className="action-button create-fd-btn"
          onClick={() => setShowInput(true)}
        >
          Create FD
        </button>
      )}

      {showInput && (
        <div className="input-section">
          <div className="duration-selector">
            <button
              className={`duration-btn ${selectedDuration === 3 ? 'active' : ''}`}
              onClick={() => setSelectedDuration(3)}
            >
              3 Mo
            </button>
            <button
              className={`duration-btn ${selectedDuration === 12 ? 'active' : ''}`}
              onClick={() => setSelectedDuration(12)}
            >
              1 Yr
            </button>
            <button
              className={`duration-btn ${selectedDuration === 36 ? 'active' : ''}`}
              onClick={() => setSelectedDuration(36)}
            >
              3 Yr
            </button>
          </div>

          <div className="input-container">
            <input
              type="number"
              className="amount-input"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="Enter amount"
            />
            <button className="max-button" onClick={handleMax}>
              MAX
            </button>
          </div>

          <div className="button-group">
            <button className="action-button confirm-btn" onClick={handleCreateFD}>
              Create
            </button>
            <button
              className="action-button cancel-btn"
              onClick={() => setShowInput(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="fd-list">
        {fixedDeposits.map(fd => (
          <div
            key={fd.id}
            className={`fd-item ${fd.isMatured ? 'matured' : ''}`}
          >
            <div className="fd-info">
              <span>₹{fd.amount.toFixed(0)}</span>
              <span>{fd.duration === 3 ? '3Mo' : fd.duration === 12 ? '1Yr' : '3Yr'}</span>
              <span>{fd.interestRate}%</span>
            </div>
            {fd.isMatured ? (
              <button
                className="collect-btn"
                onClick={() => onCollect(fd.id)}
              >
                Collect
              </button>
            ) : (
              <button
                className="break-btn"
                onClick={() => {
                  if (window.confirm('Breaking FD early will incur 1% penalty. Continue?')) {
                    onBreak(fd.id);
                  }
                }}
              >
                Break
              </button>
            )}
          </div>
        ))}
      </div>

      {fixedDeposits.length >= 3 && (
        <div className="max-fd-notice">Maximum 3 FDs reached</div>
      )}
    </div>
  );
};
