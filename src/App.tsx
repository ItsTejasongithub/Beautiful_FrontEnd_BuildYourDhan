import { useGameState } from './hooks/useGameState';
import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/GameScreen';
import { AdminSettingsPanel } from './components/AdminSettingsPanel';
import './App.css';

function App() {
  const {
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
    togglePause
  } = useGameState();

  return (
    <div className="app">
      {gameState.mode === 'menu' && (
        <MainMenu
          onStartSolo={() => startSoloGame()}
          onOpenSettings={openSettings}
        />
      )}

      {gameState.mode === 'settings' && (
        <AdminSettingsPanel
          onStartGame={(settings) => startSoloGame(settings)}
          onBack={backToMenu}
        />
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
