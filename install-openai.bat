@echo off
cd C:\Users\danie\Documents\New-ROI-Calculators
echo Installing OpenAI package...
npm install openai
echo.
IF %ERRORLEVEL% NEQ 0 (
  echo Error installing OpenAI package. Error code: %ERRORLEVEL%
  echo Please check the error message above.
) ELSE (
  echo Installation complete!
)
echo.
echo Press any key to close this window...
pause > nul
