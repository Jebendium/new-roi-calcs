@echo off
echo Testing MediaStack News Update API...
echo.

REM Test the update-news endpoint locally
curl -X GET "http://localhost:3000/api/update-news?cron_secret=mediastack_cron_2025_secure_key" -H "Content-Type: application/json"

echo.
echo.
echo Test completed. Check the console output above for results.
echo If successful, you should see a JSON response with "News update successful"
pause