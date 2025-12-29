# Rupee Rush - Multiplayer Server

Backend server for Rupee Rush multiplayer mode. Enables local network play with room-based matchmaking.

## Features

- Room-based multiplayer (6-digit alphanumeric codes)
- Real-time game state synchronization via Socket.io
- Global quiz pause system
- Live leaderboard updates
- Minimum 2 players to start
- Host spectator mode with admin controls

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

```bash
# Navigate to server directory
cd rupee-rush-server

# Install dependencies
npm install
```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
# Build the TypeScript code
npm run build

# Start the server
npm start
```

## Configuration

The server runs on **port 3001** by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=4000 npm run dev
```

## Network Setup

### Finding Your Server IP

When the server starts, it will display:

```
🎮 ════════════════════════════════════════════════════════
   RUPEE RUSH - Multiplayer Server
   ════════════════════════════════════════════════════════
   Status: ✅ Running
   Local:  http://localhost:3001
   Network: http://192.168.1.100:3001
   ════════════════════════════════════════════════════════
   📱 Share the Network URL with players on your network!
   ════════════════════════════════════════════════════════
```

### Connecting Players

1. **Start the server** on one laptop (server host)
2. **Note the Network URL** (e.g., `http://192.168.1.100:3001`)
3. **All players** must be on the **same WiFi/network**
4. **Configure frontend** with the server URL (see Frontend Setup below)

## Frontend Setup

Update the frontend `.env` file with your server URL:

```env
VITE_SERVER_URL=http://192.168.1.100:3001
```

Replace `192.168.1.100` with your actual server IP address.

## Firewall Configuration

If players can't connect, ensure **port 3001** is open on the server host:

### Windows

```powershell
# Allow inbound connections on port 3001
netsh advfirewall firewall add rule name="Rupee Rush Server" dir=in action=allow protocol=TCP localport=3001
```

### macOS/Linux

```bash
# macOS - Allow incoming connections
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add node

# Linux (UFW)
sudo ufw allow 3001/tcp
```

## How It Works

### Room System

- Host creates room → Gets 6-digit code (e.g., "ABC123")
- Players join using the code
- Minimum 2 players required to start

### Game Synchronization

- All players see the same game time
- Asset prices are identical for everyone
- Each player has independent portfolio
- Leaderboard ranks by networth

### Quiz System

- When ANY player unlocks a new asset → everyone pauses
- Game resumes only when ALL players complete their quiz
- Host can see who completed quiz

## Troubleshooting

### Can't connect from other devices?

1. Check all devices are on **same network**
2. Verify firewall allows port 3001
3. Try using server's **IP address** instead of hostname
4. Check server is running: visit `http://localhost:3001/health`

### Port already in use?

```bash
# Kill process on port 3001 (Windows)
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Kill process on port 3001 (macOS/Linux)
lsof -ti:3001 | xargs kill
```

## API Endpoints

### Health Check

```
GET /health
```

Returns server status.

## Socket Events

See [src/types/index.ts](src/types/index.ts) for complete event documentation.

## Development

### Type Checking

```bash
npm run type-check
```

### Project Structure

```
src/
├── server.ts           # Main server entry point
├── types/
│   └── index.ts        # Shared TypeScript types
├── rooms/
│   └── roomManager.ts  # Room creation/management
└── game/
    └── gameSync.ts     # Game state synchronization
```

## License

MIT
