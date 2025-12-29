@echo off
title Stop Rupee Rush
color 0C

echo.
echo ╔════════════════════════════════════════╗
echo ║   Stopping Rupee Rush Game Server     ║
echo ╚════════════════════════════════════════╝
echo.
echo Terminating servers...
echo.

REM Kill all node processes
taskkill /F /IM node.exe >nul 2>&1

if %ERRORLEVEL% EQU 0 (
    echo [✓] All servers stopped successfully!
) else (
    echo [i] No running servers found.
)

echo.
echo ════════════════════════════════════════
echo.
echo Servers terminated.
echo You can close this window.
echo.
timeout /t 3
