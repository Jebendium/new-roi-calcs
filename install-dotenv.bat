@echo off
echo Running installation for dotenv package...
echo Project directory: %CD%

echo Installing dotenv package with legacy-peer-deps flag...
call npm install dotenv --legacy-peer-deps

echo Installation complete!
echo.
echo Now you can run the DeepSeek test with:
echo run-deepseek-test.bat
echo.
pause