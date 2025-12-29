# Rupee Rush - Game Launcher Guide

## Quick Start

### To Start the Game (Local + Network):
1. Double-click `START_GAME.bat`
2. Wait for both servers to start (takes ~5-10 seconds)
3. Game will automatically open in your browser
4. **Network URL will be displayed** - share it with friends on your WiFi!

### To Stop the Game:
- **Option 1**: Double-click `STOP_GAME.bat`
- **Option 2**: Close the "BackEND Server" and "FrontEND Server" windows manually

## Batch Files Overview

| File | Purpose |
|------|---------|
| `START_GAME.bat` | Main launcher - starts both servers and displays network URLs |
| `STOP_GAME.bat` | Stops all game servers |
| `FIREWALL_FIX.bat` | Fixes Windows Firewall (run as Administrator if players can't connect) |
| `NETWORK_INFO.bat` | Shows your IP address and connection info |

## What Happens When You Start

1. **Network Detection**: Automatically detects your IP address
2. **Dependency Check**: Installs npm packages if needed
3. **Network Configuration**: Configures servers for network access
4. **BackEND Server**: Starts on `http://YOUR_IP:3001` (port 3001)
5. **FrontEND Server**: Starts on `http://YOUR_IP:5173` (port 5173)
6. **Browser**: Automatically opens the game

## Game URLs

When `START_GAME.bat` runs, it will display:

**For This Computer (Host):**
- `http://localhost:5173`

**For Other Players (Same WiFi):**
- `http://YOUR_IP:5173` (example: `http://192.168.1.100:5173`)

## Network Multiplayer Setup

### Step 1: Start the Server (Host)
1. Run `START_GAME.bat` on your computer
2. Note the **NETWORK ACCESS URL** displayed (e.g., `http://192.168.1.100:5173`)
3. Keep both server windows running

### Step 2: Share with Players
Share the Network URL with friends who are on the **same WiFi network**

### Step 3: Players Join
1. Players open the URL in their browser
2. They can join your game rooms and play together!

### Step 4: Firewall Configuration (If Needed)
If players can't connect:
1. Right-click `FIREWALL_FIX.bat`
2. Select "Run as Administrator"
3. This adds Node.js to Windows Firewall exceptions

## Server Windows

When you run `START_GAME.bat`, two console windows will open:
- **Rupee Rush - BackEND Server**: Keep this running (shows player connections)
- **Rupee Rush - FrontEND Server**: Keep this running (shows game access)

You can minimize these windows but don't close them while playing.

## Troubleshooting

### Players can't connect from other devices?

**Solution 1**: Run Firewall Fix
1. Right-click `FIREWALL_FIX.bat`
2. Select "Run as Administrator"
3. Restart the game servers

**Solution 2**: Check Network
- Run `NETWORK_INFO.bat` to verify your IP
- Ensure all devices are on the **same WiFi network**
- Try pinging your IP from other devices

**Solution 3**: Temporary Firewall Disable
- Temporarily disable Windows Firewall for testing
- If it works, the firewall was blocking connections

### Game doesn't open automatically?
- Manually open your browser and go to `http://localhost:5173`

### Port already in use error?
- Run `STOP_GAME.bat` first to stop any previous instances
- Check if other apps are using ports 3001 or 5173

### Wrong IP address detected?
- Run `NETWORK_INFO.bat` to see your actual IP
- Manually edit `FrontEND\.env.local` to use correct IP:
  ```
  VITE_SERVER_URL=http://YOUR_CORRECT_IP:3001
  ```

### Changes not showing?
- Servers auto-reload on code changes
- If not, stop servers and start again

### Node.js not found?
- Install Node.js from https://nodejs.org/
- Restart your computer after installation

## Requirements

- **Node.js**: Version 18 or higher
- **Internet**: Only needed for first-time dependency installation
- **Browser**: Chrome, Firefox, Edge, or Safari
- **Network**: All players must be on the same WiFi

## Network Architecture

```
Host Computer (Running START_GAME.bat)
├── BackEND Server (Port 3001)
│   └── Handles game logic, rooms, WebSocket connections
├── FrontEND Server (Port 5173)
│   └── Serves game UI to browsers
│
└── Players on Same WiFi
    ├── Player 1: http://YOUR_IP:5173
    ├── Player 2: http://YOUR_IP:5173
    └── Player 3: http://YOUR_IP:5173
```

## Technical Details

### Configuration Files Modified:
- **[vite.config.ts](FrontEND/vite.config.ts)**: Server listens on `0.0.0.0` (all network interfaces)
- **[server.ts](BackEND/src/server.ts:290)**: Backend listens on `0.0.0.0`
- **[.env.local](FrontEND/.env.local)**: Auto-generated with your IP for backend connection

### Ports Used:
- **3001**: BackEND Server (WebSocket + API)
- **5173**: FrontEND Server (Game UI)

## Development

### Manual Start (for developers):

**BackEND:**
```bash
cd BackEND
npm run dev
```

**FrontEND:**
```bash
cd FrontEND
npm run dev
```

**Note**: Manual start won't auto-configure network settings. Use `START_GAME.bat` for network play.

## Security Notes

- Game is accessible to **anyone on your WiFi network**
- No authentication required (for local network play)
- Don't share your network URL publicly
- Only use on trusted networks

## Notes

- The launcher window can be closed after servers start
- Servers will keep running in their own windows
- Game saves are handled in browser localStorage
- No internet required after initial setup
- Backend displays player connections in real-time
- Frontend shows all network requests
