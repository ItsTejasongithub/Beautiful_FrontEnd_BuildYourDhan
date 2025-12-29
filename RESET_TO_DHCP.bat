@echo off
echo ========================================
echo    Reset to Automatic IP (DHCP)
echo ========================================
echo.
echo This will reset your WiFi to obtain IP automatically
echo.
pause

REM Check for admin privileges
net session >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: This script must be run as Administrator
    echo.
    echo Right-click on RESET_TO_DHCP.bat and select "Run as administrator"
    echo.
    pause
    exit /b 1
)

echo Resetting to DHCP...
echo.

REM Reset to DHCP
netsh interface ip set address name="Wi-Fi" dhcp
netsh interface ip set dns name="Wi-Fi" dhcp

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   Reset Successful!
    echo ========================================
    echo.
    echo Your WiFi adapter is now set to obtain IP automatically
    echo.
    echo Run ipconfig to see your new IP address
    echo.
) else (
    echo.
    echo ERROR: Failed to reset to DHCP
    echo Check WiFi adapter name or do it manually via Network Settings
    echo.
)

pause
