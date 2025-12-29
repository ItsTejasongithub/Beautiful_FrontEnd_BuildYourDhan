@echo off
echo ========================================
echo    Set Static IP for ETHERNET
echo ========================================
echo.
echo This will set your Ethernet adapter to:
echo   IP Address: 192.168.0.67
echo   Subnet:     255.255.255.0
echo   Gateway:    192.168.0.1
echo   DNS:        192.168.0.1, 8.8.8.8
echo.
echo WARNING: Requires Administrator privileges
echo.
pause

REM Check for admin privileges
net session >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Must run as Administrator!
    echo.
    echo Right-click this file and select "Run as administrator"
    echo.
    pause
    exit /b 1
)

echo.
echo Finding Ethernet adapter...
echo.

REM Try common Ethernet adapter names
set "ADAPTER_FOUND=NO"

REM Try "Ethernet"
netsh interface ip set address name="Ethernet" static 192.168.0.67 255.255.255.0 192.168.0.1 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set "ADAPTER_FOUND=YES"
    set "ADAPTER_NAME=Ethernet"
    goto :dns_config
)

REM Try "Ethernet 2"
netsh interface ip set address name="Ethernet 2" static 192.168.0.67 255.255.255.0 192.168.0.1 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set "ADAPTER_FOUND=YES"
    set "ADAPTER_NAME=Ethernet 2"
    goto :dns_config
)

REM Try "Local Area Connection"
netsh interface ip set address name="Local Area Connection" static 192.168.0.67 255.255.255.0 192.168.0.1 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set "ADAPTER_FOUND=YES"
    set "ADAPTER_NAME=Local Area Connection"
    goto :dns_config
)

if "%ADAPTER_FOUND%"=="NO" (
    echo.
    echo ERROR: Could not find Ethernet adapter!
    echo.
    echo Run FIND_ADAPTER.bat to see your adapter names
    echo Then manually edit this file with correct adapter name
    echo.
    pause
    exit /b 1
)

:dns_config
echo IP address set successfully on: %ADAPTER_NAME%
echo.
echo Setting DNS servers...

netsh interface ip set dns name="%ADAPTER_NAME%" static 192.168.0.1 >nul 2>&1
netsh interface ip add dns name="%ADAPTER_NAME%" 8.8.8.8 index=2 >nul 2>&1

echo.
echo ========================================
echo   Static IP Configured Successfully!
echo ========================================
echo.
echo Adapter: %ADAPTER_NAME%
echo IP:      192.168.0.67 (STATIC)
echo Gateway: 192.168.0.1
echo DNS:     192.168.0.1, 8.8.8.8
echo.
echo This IP will persist after restart.
echo.
echo Verify with: ipconfig
echo.
pause
