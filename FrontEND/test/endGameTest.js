import { io } from 'socket.io-client';
import fetch from 'node-fetch';

// Node ESM module for the project which uses "type": "module" in package.json


const SERVER_URL = 'http://localhost:3001';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runTest() {
  console.log('Starting end-game test...');

  // Create host socket
  const host = io(SERVER_URL, { transports: ['websocket'] });
  let roomId = null;

  host.on('connect', () => console.log('[HOST] connected:', host.id));
  host.on('gameEnded', (data) => console.log('[HOST] received gameEnded:', data));

  // Wait for connection
  await new Promise(resolve => host.once('connect', resolve));

  // Create room
  host.emit('createRoom', { playerName: 'TestHost' }, (resp) => {
    if (resp.success) {
      roomId = resp.roomId;
      console.log('[HOST] Room created:', roomId);
    } else {
      console.error('[HOST] createRoom failed:', resp.error);
    }
  });

  // Wait a bit
  await sleep(300);

  // Create player socket and join
  const player = io(SERVER_URL, { transports: ['websocket'] });
  player.on('connect', () => console.log('[PLAYER] connected:', player.id));
  player.on('gameEnded', (data) => console.log('[PLAYER] received gameEnded:', data));

  await new Promise(resolve => player.once('connect', resolve));

  player.emit('joinRoom', { roomId, playerName: 'TestPlayer' }, (resp) => {
    if (resp.success) {
      console.log('[PLAYER] Joined room', roomId);
    } else {
      console.error('[PLAYER] joinRoom failed:', resp.error);
    }
  });

  // Wait for a moment to ensure server has room info
  await sleep(500);

  // Start game as host
  host.emit('startGame', { adminSettings: { selectedCategories: ['SAVINGS_AC', 'INDIAN_STOCKS', 'BTC'], initialPocketCash: 100000, gameStartYear: 2005 } }, (resp) => {
    if (resp.success) {
      console.log('[HOST] startGame success');
    } else {
      console.error('[HOST] startGame failed:', resp.error);
    }
  });

  // Wait a moment
  await sleep(500);

  // Trigger server to end all games (debug endpoint)
  console.log('Requesting server to end all rooms via /debug/endAll');
  const res = await fetch(`${SERVER_URL}/debug/endAll`, { method: 'POST' });
  const json = await res.json();
  console.log('/debug/endAll response:', json);

  // Wait to receive events
  await sleep(500);

  // Clean up
  host.close();
  player.close();

  console.log('End-game test completed.');
}

runTest().catch(err => {
  console.error('Test failed:', err);
});