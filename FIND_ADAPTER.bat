@echo off
echo ========================================
echo    Finding Network Adapter Names
echo ========================================
echo.
echo Your network adapters:
echo.
netsh interface show interface
echo.
echo ========================================
echo.
echo Now checking IP configuration:
echo.
ipconfig /all | findstr /c:"adapter" /c:"IPv4" /c:"DHCP Enabled"
echo.
echo ========================================
echo.
pause
