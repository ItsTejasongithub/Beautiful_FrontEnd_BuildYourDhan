@echo off
setlocal enabledelayedexpansion

echo.
echo ================================================
echo         PUSH CHANGES TO GITHUB
echo ================================================
echo.

REM Get the script directory
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Install from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

REM Check if this is a git repository
if not exist ".git" (
    echo [INIT] Initializing Git repository...
    git init
    echo.
    echo [INIT] Adding remote repository...
    git remote add origin https://github.com/ItsTejasongithub/git-sync-bridge.git
    echo.
    echo [OK] Git repository initialized!
    echo.
)

REM Show current status
echo [1/5] Checking current status...
echo.
git status
echo.

REM Ask for commit message
echo ------------------------------------------------
echo  Enter commit message (or press Enter for auto)
echo ------------------------------------------------
echo.
set /p COMMIT_MSG="Commit Message: "

REM Generate automatic commit message if empty
if "!COMMIT_MSG!"=="" (
    for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
    for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a:%%b)
    set "COMMIT_MSG=Update: Bull Run Game - !mydate! !mytime!"
)

echo.
echo [2/5] Adding all files to staging...
git add .

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to add files!
    pause
    exit /b 1
)

echo [OK] Files staged successfully!
echo.

echo [3/5] Creating commit...
git commit -m "!COMMIT_MSG!"

if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Nothing to commit (no changes detected)
    echo.
    pause
    exit /b 0
)

echo [OK] Commit created successfully!
echo.

echo [4/5] Checking remote connection...
git remote -v

echo.
echo [5/5] Pushing to GitHub...
echo.

REM Try to push to master/main branch
git push -u origin master 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Master branch push failed, trying main branch...
    git push -u origin main 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Push failed!
        echo.
        echo Possible reasons:
        echo 1. You need to authenticate with GitHub
        echo 2. The remote repository doesn't exist
        echo 3. You don't have push permissions
        echo.
        echo ------------------------------------------------
        echo  FIRST TIME SETUP:
        echo ------------------------------------------------
        echo  1. Make sure you're logged into GitHub
        echo  2. GitHub will prompt for credentials
        echo  3. Use Personal Access Token (not password)
        echo ------------------------------------------------
        echo.
        pause
        exit /b 1
    )
)

echo.
echo ================================================
echo          PUSH SUCCESSFUL!
echo ================================================
echo.
echo [SUCCESS] Changes pushed to GitHub!
echo.
echo Repository: https://github.com/ItsTejasongithub/git-sync-bridge
echo Commit: !COMMIT_MSG!
echo.
echo ------------------------------------------------
echo  NEXT STEPS:
echo ------------------------------------------------
echo  1. Your changes are now on GitHub
echo  2. On remote server, run SYNC_FROM_GITHUB.bat
echo  3. Remote will automatically update
echo ------------------------------------------------
echo.
pause
