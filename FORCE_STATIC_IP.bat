@echo off
echo ========================================
echo    Force Static IP Configuration
echo ========================================
echo.
echo This will set your WiFi adapter to use:
echo   IP Address: 192.168.0.67
echo   Subnet:     255.255.255.0
echo   Gateway:    192.168.0.1
echo   DNS:        192.168.0.1, 8.8.8.8
echo.
echo WARNING: This requires Administrator privileges
echo.
pause
echo.

REM Check for admin privileges
net session >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: This script must be run as Administrator
    echo.
    echo Right-click on FORCE_STATIC_IP.bat and select "Run as administrator"
    echo.
    pause
    exit /b 1
)

echo Setting static IP...
echo.

REM Set static IP for Wi-Fi adapter
netsh interface ip set address name="Wi-Fi" static 192.168.0.67 255.255.255.0 192.168.0.1

if %ERRORLEVEL% EQU 0 (
    echo IP address set successfully!
    echo.

    echo Setting DNS servers...
    netsh interface ip set dns name="Wi-Fi" static 192.168.0.1
    netsh interface ip add dns name="Wi-Fi" 8.8.8.8 index=2

    echo.
    echo ========================================
    echo   Static IP Configured Successfully!
    echo ========================================
    echo.
    echo Your WiFi adapter now has:
    echo   IP: 192.168.0.67 (STATIC)
    echo.
    echo This IP will not change even after restart.
    echo.
    echo To verify, run: ipconfig
    echo.
) else (
    echo.
    echo ERROR: Failed to set static IP
    echo.
    echo Possible reasons:
    echo   1. WiFi adapter name is not "Wi-Fi"
    echo   2. IP address conflicts with another device
    echo   3. Gateway address is incorrect
    echo.
    echo Please use the manual method (run SET_STATIC_IP_GUIDE.bat)
    echo.
)

pause
