import React from 'react';
import { useGameState } from './hooks/useGameState';
import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/GameScreen';
import './App.css';

function App() {
  const {
    gameState,
    startSoloGame,
    depositToSavings,
    withdrawFromSavings,
    createFixedDeposit,
    collectFD,
    breakFD,
    buyAsset,
    sellAsset,
    togglePause
  } = useGameState();

  return (
    <div className="app">
      {gameState.mode === 'menu' && (
        <MainMenu onStartSolo={startSoloGame} />
      )}

      {gameState.mode === 'solo' && (
        <GameScreen
          gameState={gameState}
          onDeposit={depositToSavings}
          onWithdraw={withdrawFromSavings}
          onCreateFD={createFixedDeposit}
          onCollectFD={collectFD}
          onBreakFD={breakFD}
          onBuyAsset={buyAsset}
          onSellAsset={sellAsset}
          onTogglePause={togglePause}
        />
      )}
    </div>
  );
}

export default App;
