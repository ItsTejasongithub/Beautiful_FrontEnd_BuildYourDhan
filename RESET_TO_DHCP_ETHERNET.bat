@echo off
echo ========================================
echo    Reset ETHERNET to Automatic IP
echo ========================================
echo.
pause

REM Check for admin privileges
net session >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Must run as Administrator!
    echo.
    pause
    exit /b 1
)

echo Resetting to DHCP...
echo.

REM Try common adapter names
netsh interface ip set address name="Ethernet" dhcp >nul 2>&1
netsh interface ip set dns name="Ethernet" dhcp >nul 2>&1

netsh interface ip set address name="Ethernet 2" dhcp >nul 2>&1
netsh interface ip set dns name="Ethernet 2" dhcp >nul 2>&1

netsh interface ip set address name="Local Area Connection" dhcp >nul 2>&1
netsh interface ip set dns name="Local Area Connection" dhcp >nul 2>&1

echo.
echo ========================================
echo   Reset Complete!
echo ========================================
echo.
echo Ethernet adapter reset to automatic (DHCP)
echo.
pause
