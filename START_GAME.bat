@echo off
setlocal enabledelayedexpansion
title Rupee Rush Game Server
color 0A

echo.
echo ╔════════════════════════════════════════╗
echo ║   RUPEE RUSH - Game Server Launcher    ║
echo ╚════════════════════════════════════════╝
echo.

REM Get the script directory
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

REM ========================================
REM STEP 1: Check Node.js
REM ========================================
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Install from: https://nodejs.org/
    echo.
    timeout /t 10
    exit /b 1
)

REM ========================================
REM STEP 2: Smart IP Detection
REM ========================================
echo [1/6] Detecting network...

REM Try to get IP (prefer 192.168.0.67, fallback to any 192.168.x.x)
set "IP="
set "FOUND_67=NO"

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set "TEMP_IP=%%a"
    for /f "tokens=* delims= " %%b in ("!TEMP_IP!") do set TEMP_IP=%%b

    REM Check if we have 192.168.0.67 (preferred)
    if "!TEMP_IP!"=="192.168.0.67" (
        set "IP=192.168.0.67"
        set "FOUND_67=YES"
        goto :ip_found
    )

    REM Otherwise collect any 192.168.x.x
    echo !TEMP_IP! | findstr /b "192.168" >nul
    if !ERRORLEVEL! EQU 0 (
        if "!IP!"=="" set "IP=!TEMP_IP!"
    )
)
:ip_found

REM If not using 192.168.0.67, show info
if "!FOUND_67!"=="NO" (
    if not "!IP!"=="" (
        echo.
        echo Current IP: !IP!
        echo.
        echo TIP: For stable connection, use STATIC IP: 192.168.0.67
        echo Run SET_STATIC_IP_ETHERNET.bat as Admin to set it permanently
        echo.
        timeout /t 2 >nul
    )
)

if "!IP!"=="" set "IP=localhost"
echo Network: !IP!
echo.

REM ========================================
REM STEP 3: Configure Frontend
REM ========================================
echo [2/6] Configuring frontend...
echo VITE_SERVER_URL=http://!IP!:3001 > FrontEND\.env.local
echo.

REM ========================================
REM STEP 4: Install Dependencies
REM ========================================
echo [3/6] Checking dependencies...

if not exist "BackEND\node_modules\" (
    echo Installing BackEND...
    cd BackEND
    call npm install --silent >nul 2>&1
    cd ..
)

if not exist "FrontEND\node_modules\" (
    echo Installing FrontEND...
    cd FrontEND
    call npm install --silent >nul 2>&1
    cd ..
)

echo Dependencies OK
echo.

REM ========================================
REM STEP 5: Start Servers
REM ========================================
echo [4/6] Starting servers...

cd BackEND
start /MIN "BackEND-Server" cmd /k "title BackEND Server && color 0B && npm run dev"
timeout /t 2 /nobreak >nul
cd ..

cd FrontEND
start /MIN "FrontEND-Server" cmd /k "title FrontEND Server && color 0E && npm run dev"
cd ..

echo.
echo [5/6] Initializing...
timeout /t 4 /nobreak >nul

REM ========================================
REM STEP 6: Open Browser
REM ========================================
echo [6/6] Opening browser...
start http://localhost:5173
timeout /t 1 /nobreak >nul

REM ========================================
REM Display Status
REM ========================================
cls
color 0A
echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║                                                   ║
echo ║         RUPEE RUSH - SERVER RUNNING ✓             ║
echo ║                                                   ║
echo ╚═══════════════════════════════════════════════════╝
echo.
echo ┌───────────────────────────────────────────────────┐
echo │  PLAY THE GAME                                    │
echo └───────────────────────────────────────────────────┘
echo.
echo   This Computer:
echo   → http://localhost:5173
echo.
echo   Network Players (Same WiFi):
echo   → http://!IP!:5173
echo.
echo ┌───────────────────────────────────────────────────┐
echo │  SERVER STATUS                                    │
echo └───────────────────────────────────────────────────┘
echo.
echo   BackEND:  Running on port 3001 ✓
echo   FrontEND: Running on port 5173 ✓
echo.
echo   (Server windows minimized in taskbar)
echo.
echo ┌───────────────────────────────────────────────────┐
echo │  HOW TO USE                                       │
echo └───────────────────────────────────────────────────┘
echo.
echo   1. Share with friends: http://!IP!:5173
echo   2. Everyone on SAME WiFi
echo   3. To stop: Run STOP_GAME.bat
echo.
if not "!IP!"=="192.168.0.67" (
    echo ┌───────────────────────────────────────────────────┐
    echo │  TIP: Set Static IP                              │
    echo └───────────────────────────────────────────────────┘
    echo.
    echo   Right-click START_GAME.bat ^> Run as Admin
    echo   This sets permanent IP: 192.168.0.67
    echo.
)
echo ═══════════════════════════════════════════════════
echo.
echo This window can be closed safely.
echo Servers will continue in background.
echo.
pause
