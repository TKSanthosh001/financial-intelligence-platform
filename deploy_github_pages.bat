@echo off
echo =======================================================
echo Aegis Financial Intelligence Platform - GitHub Deployer
echo =======================================================
echo.

cd frontend

if not exist dist (
    echo [ERROR] Production build directory 'dist' was not found!
    echo Please run 'npm run build' first or ensure build completed successfully.
    pause
    exit /b
)

cd dist

echo Initializing local Git repository in dist...
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy production Financial Intelligence Platform build"

echo.
echo Please enter your GitHub Repository URL (e.g., https://github.com/username/repo-name.git)
set /p REPO_URL="Repo URL: "

if "%REPO_URL%"=="" (
    echo [ERROR] Repository URL cannot be empty!
    pause
    exit /b
)

echo.
echo Adding remote and pushing to gh-pages...
git remote add origin %REPO_URL%
git push -u origin gh-pages --force

echo.
echo =======================================================
echo DEPLOYMENT COMMAND SENT
echo =======================================================
echo If the command succeeded, your site will be live soon at:
echo https://[your-username].github.io/[repo-name]/
echo.
pause
