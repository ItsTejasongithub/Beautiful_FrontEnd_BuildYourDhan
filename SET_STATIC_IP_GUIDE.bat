@echo off
echo ========================================
echo    Static IP Configuration Guide
echo ========================================
echo.
echo Current Network Information:
echo.
ipconfig | findstr /c:"Wireless LAN adapter Wi-Fi" /c:"IPv4" /c:"Subnet" /c:"Default Gateway"
echo.
echo ========================================
echo.
echo To set a STATIC IP ADDRESS for your WiFi:
echo.
echo 1. Press Windows + R
echo 2. Type: ncpa.cpl
echo 3. Press Enter
echo.
echo 4. Right-click on "Wi-Fi" adapter
echo 5. Select "Properties"
echo.
echo 6. Double-click "Internet Protocol Version 4 (TCP/IPv4)"
echo.
echo 7. Select "Use the following IP address"
echo.
echo 8. Enter these values:
echo    ================================
echo    IP Address:     192.168.0.67
echo    Subnet Mask:    255.255.255.0
echo    Default Gateway: 192.168.0.1
echo.
echo    Preferred DNS:  192.168.0.1
echo    Alternate DNS:  8.8.8.8
echo    ================================
echo.
echo 9. Click OK on all dialogs
echo.
echo 10. Your IP will now ALWAYS be 192.168.0.67
echo.
echo ========================================
echo    IMPORTANT NOTES
echo ========================================
echo.
echo - Use an IP address OUTSIDE your router's DHCP range
echo - Typically safe range: 192.168.0.50 - 192.168.0.254
echo - IP 192.168.0.67 is usually safe
echo.
echo - If you can't connect to internet after:
echo   * Check Default Gateway is correct (usually .1)
echo   * Check DNS settings
echo   * You can always switch back to "Obtain automatically"
echo.
echo ========================================
echo.
echo After setting static IP:
echo   Run START_GAME.bat and it will always use 192.168.0.67
echo.
pause
