import React from 'react';
import './MainMenu.css';

interface MainMenuProps {
  onStartSolo: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartSolo }) => {
  return (
    <div className="main-menu">
      <div className="menu-content">
        <h1 className="game-title">BUILD YOUR DHAN</h1>
        <p className="game-subtitle">A Financial Investment Journey</p>

        <div className="menu-buttons">
          <button className="menu-button solo-button" onClick={onStartSolo}>
            SOLO MODE
          </button>
          <button className="menu-button multi-button" disabled>
            MULTI MODE
            <span className="coming-soon">(Coming Soon)</span>
          </button>
        </div>

        <div className="menu-info">
          <h3>Game Rules:</h3>
          <ul>
            <li>Play through 20 years of investing (3 seconds = 1 month)</li>
            <li>Start with ₹1,00,000 in pocket cash</li>
            <li>Unlock new investment options each year</li>
            <li>Build your wealth through smart investments</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
