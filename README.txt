╔═══════════════════════════════════════════════════════╗
║                                                       ║
║           RUPEE RUSH - Quick Start Guide             ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  QUICK START (2 SIMPLE STEPS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Double-click: START_GAME.bat
2. Share URL with friends: http://YOUR_IP:5173

That's it! ✓


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BATCH FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

START_GAME.bat  → Starts the game server
STOP_GAME.bat   → Stops the game server

Only 2 files - that's all you need!


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WHAT HAPPENS WHEN YOU START
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

START_GAME.bat automatically:
✓ Detects your network IP
✓ Installs dependencies (first time only)
✓ Configures frontend/backend
✓ Starts both servers
✓ Opens game in browser
✓ Optionally sets static IP (192.168.0.67)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NETWORK PLAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For You (Host):
http://localhost:5173

For Friends (Same WiFi):
http://YOUR_IP:5173

Everyone must be on the SAME WiFi network!


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  STATIC IP (RECOMMENDED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For permanent IP address (192.168.0.67):

1. Right-click START_GAME.bat
2. Select "Run as Administrator"
3. Choose "Y" when prompted

Your game URL will NEVER change after this!


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  AUTO-START ON WINDOWS BOOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To auto-start game when Windows boots:

1. Press Windows + R
2. Type: shell:startup
3. Press Enter
4. Create shortcut to START_GAME.bat in that folder

Game will start automatically on every boot!


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Players can't connect?
→ Check Windows Firewall
→ Verify everyone on same WiFi
→ Run START_GAME.bat as Admin (sets static IP)

Port already in use?
→ Run STOP_GAME.bat first
→ Restart START_GAME.bat

Game not loading?
→ Wait 10 seconds after starting
→ Manually open: http://localhost:5173


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Node.js 18+ (https://nodejs.org/)
✓ Modern web browser
✓ Same WiFi for all players


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TECHNICAL DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BackEND Server:  Port 3001 (WebSocket + API)
FrontEND Server: Port 5173 (Game UI)
Preferred IP:    192.168.0.67 (Static)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Enjoy playing Rupee Rush! 🎮
