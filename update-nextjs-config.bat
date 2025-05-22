@echo off
echo Updating Next.js configuration for version 15...

echo Backing up current next.config.js to next.config.js.bak
copy next.config.js next.config.js.bak

echo Replacing next.config.js with updated version
copy next.config.updated.js next.config.js

echo Configuration update completed!
echo.
echo Next.js configuration has been updated for compatibility with Next.js 15.3.1.
echo The property "serverComponentsExternalPackages" has been moved to "serverExternalPackages".
echo.
echo A backup of your original configuration has been saved as next.config.js.bak
echo.
pause