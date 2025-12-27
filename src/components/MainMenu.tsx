import React from 'react';
import './MainMenu.css';

interface MainMenuProps {
  onStartSolo: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartSolo, onOpenSettings }) => {
  return (
    <div className="main-menu">
      <div className="menu-content">
        <img src="/Rupee_logo.png" alt="Rupee Rush Logo" className="game-logo-img" />
        <h1 className="game-title">RUPEE RUSH</h1>
        <p className="game-subtitle">A Financial Investment Journey</p>

        <div className="menu-buttons">
          <button className="menu-button settings-button" onClick={onOpenSettings}>
            SOLO GAME
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
            <li>Unlock new investment options progressively</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
