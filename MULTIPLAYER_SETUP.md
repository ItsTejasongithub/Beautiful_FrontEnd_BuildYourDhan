# 🎮 Rupee Rush - Multiplayer Setup Guide

Complete guide to set up and play Rupee Rush in multiplayer mode on your local network.

## 📋 Prerequisites

- Node.js v18 or higher
- npm or yarn
- All devices on the same WiFi/network

---

## 🚀 Quick Start

### Step 1: Install Dependencies

#### Backend Server
```bash
cd rupee-rush-server
npm install
```

#### Frontend
```bash
cd GameDesgin
npm install
```

### Step 2: Start the Backend Server

```bash
cd rupee-rush-server
npm run dev
```

You'll see output like:
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

**📝 Note down the Network URL!** (e.g., `http://192.168.1.100:3001`)

### Step 3: Configure Frontend

Edit `GameDesgin/.env`:
```env
VITE_SERVER_URL=http://192.168.1.100:3001
```
Replace `192.168.1.100` with your actual server IP from Step 2.

### Step 4: Start the Frontend

```bash
cd GameDesgin
npm run dev
```

The game will be available at `http://localhost:5173`

### Step 5: Play!

1. **On the server laptop**: Open `http://localhost:5173` in browser
2. **On other laptops**: Open `http://<server-ip>:5173` in browser
   - Example: `http://192.168.1.100:5173`

---

## 🎯 How to Play Multiplayer

### Creating a Room (Host)

1. Click **"MULTI MODE"** on main menu
2. Click **"CREATE ROOM"**
3. Enter your name
4. You'll get a **6-digit room code** (e.g., "ABC123")
5. **Share this code** with other players
6. Click **"CONFIGURE SETTINGS"** to set up the game
7. Wait for at least 2 players to join
8. Click **"START GAME"**

### Joining a Room (Player)

1. Click **"MULTI MODE"** on main menu
2. Click **"JOIN ROOM"**
3. Enter your name
4. Enter the **room code** from the host
5. Wait for host to start the game

---

## 🎮 Game Modes

### Host View (Spectator Mode)
- ✅ Watch all players in real-time
- ✅ See leaderboard with networth rankings
- ✅ View portfolio breakdowns on hover
- ✅ Track who completed quizzes
- ❌ Cannot play the game

### Player View
- ✅ Play the full investment game
- ✅ See leaderboard in sidebar (networth only)
- ✅ Complete educational quizzes
- ✅ Independent portfolio management

---

## 🏆 Multiplayer Features

### Global Quiz Pause
- When **ANY player** unlocks a new asset → **ALL players pause**
- Game resumes only when **ALL players** complete their quiz
- Host can see who finished quiz and who hasn't

### Real-time Leaderboard
- Updated after every transaction
- Ranked by **total networth**
- **Host sees**: Full breakdown with percentages
- **Players see**: Just rankings and networth numbers

### Minimum Players
- Need **at least 2 players** to start
- Host doesn't count as a player (spectator only)

---

## 🛠️ Troubleshooting

### "Not connected to server"

**Check:**
1. Is the backend server running?
2. Is the `.env` file configured with correct server URL?
3. Are all devices on the same network?
4. Is firewall blocking port 3001?

**Fix (Windows Firewall):**
```powershell
netsh advfirewall firewall add rule name="Rupee Rush Server" dir=in action=allow protocol=TCP localport=3001
```

### Can't access from other laptops

**Fix:**
1. Find your IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` or `ip addr`

2. Update `.env` with your actual IP:
   ```env
   VITE_SERVER_URL=http://<your-ip>:3001
   ```

3. Access frontend from other devices:
   ```
   http://<your-ip>:5173
   ```

### Port already in use

**Fix:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill
```

---

## 📁 Project Structure

```
BeautifulGameDesgin/
├── GameDesgin/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── MultiplayerLobby.tsx
│   │   │   ├── HostSpectatorView.tsx
│   │   │   ├── PlayerGameWrapper.tsx
│   │   │   └── MultiplayerLeaderboardSidebar.tsx
│   │   ├── contexts/
│   │   │   └── MultiplayerContext.tsx
│   │   ├── services/
│   │   │   └── socketService.ts
│   │   └── types/
│   │       └── multiplayer.ts
│   ├── .env                    # Server configuration
│   └── package.json
│
└── rupee-rush-server/         # Backend (Node.js + Socket.io)
    ├── src/
    │   ├── server.ts
    │   ├── rooms/
    │   │   └── roomManager.ts
    │   ├── game/
    │   │   └── gameSync.ts
    │   └── types/
    │       └── index.ts
    ├── package.json
    └── README.md
```

---

## 🎯 Feature Checklist

### ✅ Implemented Features

- [x] Room creation with 6-digit codes
- [x] Room joining system
- [x] Host admin settings configuration
- [x] Host spectator view with full leaderboard
- [x] Player game mode with sidebar leaderboard
- [x] Global quiz pause mechanism
- [x] Real-time networth synchronization
- [x] Portfolio breakdown for host view
- [x] Minimum 2 players requirement
- [x] Local network support

### 📝 Known Limitations

- Solo mode game logic is reused (no changes needed)
- Asset prices are deterministic (from historical CSV data)
- No player reconnection after disconnect
- No mid-game player joins (only in lobby)

---

## 🎮 Playing on Multiple Laptops

### Laptop 1 (Server Host)
```bash
# Terminal 1
cd rupee-rush-server
npm run dev

# Terminal 2
cd GameDesgin
npm run dev

# Browser
http://localhost:5173
```

### Laptop 2, 3, 4... (Players)
```bash
# Terminal (if running frontend locally)
cd GameDesgin
npm run dev

# OR just open browser directly to:
http://<laptop-1-ip>:5173
```

**Note:** You can run the frontend on each laptop separately, or just access the frontend from Laptop 1's IP address.

---

## 💡 Tips

1. **Use a stable WiFi connection** - Mobile hotspots may have restrictions
2. **Keep server laptop plugged in** - Don't let it sleep
3. **Share room code via chat** - WhatsApp, Slack, etc.
4. **Host should configure settings** before others join
5. **Test with 2 laptops first** before adding more players

---

## 🐛 Reporting Issues

If you encounter bugs or have feature requests, check the console logs:

**Frontend Console:**
- Press `F12` in browser
- Check Console tab

**Backend Logs:**
- Check terminal where `npm run dev` is running

---

## 🎉 Enjoy Playing!

Happy investing! May the best portfolio win! 🏆📈

---

**Built with:**
- React + TypeScript
- Socket.io
- Node.js + Express
- Vite
