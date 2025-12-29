@echo off
REM This batch file must be run as Administrator
REM It adds Windows Firewall rules to allow Node.js network access

echo ========================================
echo    Firewall Configuration for Game
echo ========================================
echo.

REM Check for admin privileges
net session >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: This script must be run as Administrator
    echo.
    echo Right-click on FIREWALL_FIX.bat and select "Run as administrator"
    echo.
    pause
    exit /b 1
)

echo Adding Windows Firewall rules for Node.js...
echo.

REM Find Node.js installation path
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found in PATH
    pause
    exit /b 1
)

for /f "delims=" %%i in ('where node') do set NODE_PATH=%%i

echo Node.js found at: %NODE_PATH%
echo.

REM Remove existing rules (if any)
netsh advfirewall firewall delete rule name="Node.js Server - Inbound" >nul 2>&1
netsh advfirewall firewall delete rule name="Node.js Server - Outbound" >nul 2>&1

REM Add new firewall rules
echo Creating firewall rules...
netsh advfirewall firewall add rule name="Node.js Server - Inbound" dir=in action=allow program="%NODE_PATH%" enable=yes profile=private,domain

netsh advfirewall firewall add rule name="Node.js Server - Outbound" dir=out action=allow program="%NODE_PATH%" enable=yes profile=private,domain

echo.
echo ========================================
echo   Firewall Configuration Complete!
echo ========================================
echo.
echo Node.js is now allowed through Windows Firewall
echo Other devices on your network can now connect
echo.
echo You can now run START_GAME.bat
echo.
pause
