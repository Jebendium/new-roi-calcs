@echo off
echo Cleaning up redundant files and backups...

echo Removing redundant Next.js config files...
del "C:\Users\danie\Documents\New-ROI-Calculators\next.config.ts"
del "C:\Users\danie\Documents\New-ROI-Calculators\next.config.updated.js"

echo Cleaning up route.ts backups in enhanced-rss...
del "C:\Users\danie\Documents\New-ROI-Calculators\src\app\api\enhanced-rss\route.ts.new"

echo Creating backups folder...
mkdir "C:\Users\danie\Documents\New-ROI-Calculators\backups"

echo Moving backup files to backups folder...
move "C:\Users\danie\Documents\New-ROI-Calculators\next.config.js.bak" "C:\Users\danie\Documents\New-ROI-Calculators\backups\next.config.js.bak"
move "C:\Users\danie\Documents\New-ROI-Calculators\src\app\api\rss\route.ts.bak" "C:\Users\danie\Documents\New-ROI-Calculators\backups\rss-route.ts.bak"

echo Cleanup completed successfully!
echo.
pause