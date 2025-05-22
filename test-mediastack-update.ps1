# Test MediaStack News Update API
Write-Host "Testing MediaStack News Update API..." -ForegroundColor Green
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/update-news?cron_secret=mediastack_cron_2025_secure_key" -Method GET -ContentType "application/json"
    
    Write-Host "Response received:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 5 | Write-Host
    
    if ($response.message -eq "News update successful") {
        Write-Host ""
        Write-Host "SUCCESS: News update completed successfully!" -ForegroundColor Green
        Write-Host "Articles processed: $($response.articlesProcessed)" -ForegroundColor Yellow
        Write-Host "Categories: $($response.categories)" -ForegroundColor Yellow
        Write-Host "Duration: $($response.duration)" -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "WARNING: Unexpected response" -ForegroundColor Yellow
    }
} catch {
    Write-Host "ERROR: Failed to call API" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "Test completed. Press any key to exit..." -ForegroundColor Cyan
Read-Host