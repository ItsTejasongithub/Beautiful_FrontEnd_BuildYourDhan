@echo off
setlocal enabledelayedexpansion
echo ========================================
echo    Manual IP Configuration
echo ========================================
echo.

REM Show all available IPs
echo Your current network adapters:
echo.
ipconfig | findstr /c:"adapter" /c:"IPv4"
echo.

echo ========================================
echo.

REM Prompt user for IP
set /p CUSTOM_IP="Enter your correct IP address (e.g., 192.168.0.117): "

REM Validate IP format (basic check)
echo %CUSTOM_IP% | findstr /r "^[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*$" >nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Invalid IP address format
    echo Please use format like: 192.168.0.117
    pause
    exit /b 1
)

echo.
echo Setting backend URL to: http://%CUSTOM_IP%:3001
echo.

REM Update .env.local
echo VITE_SERVER_URL=http://%CUSTOM_IP%:3001 > FrontEND\.env.local

echo.
echo ========================================
echo   Configuration Updated!
echo ========================================
echo.
echo Backend configured to use: %CUSTOM_IP%
echo.
echo Now share these URLs with players:
echo   Game URL:    http://%CUSTOM_IP%:5173
echo   Backend URL: http://%CUSTOM_IP%:3001
echo.
echo Next steps:
echo   1. Run STOP_GAME.bat (if servers are running)
echo   2. Run START_GAME.bat to restart with new IP
echo.
pause
