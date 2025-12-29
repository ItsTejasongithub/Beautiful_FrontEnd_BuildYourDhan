@echo off
setlocal enabledelayedexpansion
echo ========================================
echo    Network Information for Game
echo ========================================
echo.

REM Get all IP addresses
echo Your Network Adapters and IP Addresses:
echo.
ipconfig | findstr /c:"adapter" /c:"IPv4"
echo.

echo ========================================
echo    Recommended URLs to Share
echo ========================================
echo.

REM Find best IP addresses
set "WIFI_IP="
set "ETH_IP="
set "OTHER_IP="

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set "TEMP_IP=%%a"
    for /f "tokens=* delims= " %%b in ("!TEMP_IP!") do set TEMP_IP=%%b

    REM Check if IP starts with 192.168 (most common home network)
    echo !TEMP_IP! | findstr /b "192.168" >nul
    if !ERRORLEVEL! EQU 0 (
        if "!WIFI_IP!"=="" set "WIFI_IP=!TEMP_IP!"
    )

    REM Check if IP starts with 10. (another common private network)
    echo !TEMP_IP! | findstr /b "10\." >nul
    if !ERRORLEVEL! EQU 0 (
        if "!ETH_IP!"=="" set "ETH_IP=!TEMP_IP!"
    )

    REM Store first IP as fallback
    if "!OTHER_IP!"=="" set "OTHER_IP=!TEMP_IP!"
)

REM Display recommended IP
if not "!WIFI_IP!"=="" (
    echo RECOMMENDED - Use this for WiFi network play:
    echo.
    echo   Game URL:    http://!WIFI_IP!:5173
    echo   Backend URL: http://!WIFI_IP!:3001
    echo.
    set "BEST_IP=!WIFI_IP!"
) else if not "!ETH_IP!"=="" (
    echo For Ethernet/LAN network play:
    echo.
    echo   Game URL:    http://!ETH_IP!:5173
    echo   Backend URL: http://!ETH_IP!:3001
    echo.
    set "BEST_IP=!ETH_IP!"
) else if not "!OTHER_IP!"=="" (
    echo WARNING: Using detected IP (may be virtual adapter):
    echo.
    echo   Game URL:    http://!OTHER_IP!:5173
    echo   Backend URL: http://!OTHER_IP!:3001
    echo.
    set "BEST_IP=!OTHER_IP!"
) else (
    echo ERROR: Could not detect any IP address
    echo Please check your network connection
    set "BEST_IP=localhost"
)

echo.
echo For this computer only:
echo.
echo   Game URL:    http://localhost:5173
echo   Backend URL: http://localhost:3001
echo.

echo ========================================
echo    Active Network Connections
echo ========================================
echo.
netstat -an | findstr ":3001 :5173"
echo.

echo ========================================
echo    Troubleshooting
echo ========================================
echo.
echo If players cannot connect:
echo   1. Ensure everyone is on the same WiFi
echo   2. Run FIREWALL_FIX.bat as Administrator
echo   3. Temporarily disable Windows Firewall
echo   4. Check your router settings
echo.
pause
