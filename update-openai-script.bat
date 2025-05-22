@echo off
echo Updating install-openai.js script to use legacy-peer-deps...

echo // Script to install OpenAI package with legacy-peer-deps flag > install-openai-fixed.js
echo const { execSync } = require('child_process'); >> install-openai-fixed.js
echo const path = require('path'); >> install-openai-fixed.js
echo const fs = require('fs'); >> install-openai-fixed.js
echo. >> install-openai-fixed.js
echo // Get project directory >> install-openai-fixed.js
echo const projectDir = path.resolve(__dirname); >> install-openai-fixed.js
echo console.log(`Project directory: ${projectDir}`); >> install-openai-fixed.js
echo. >> install-openai-fixed.js
echo // Check if package.json exists >> install-openai-fixed.js
echo if (!fs.existsSync(path.join(projectDir, 'package.json'))) { >> install-openai-fixed.js
echo   console.error('Error: package.json not found in the project directory.'); >> install-openai-fixed.js
echo   process.exit(1); >> install-openai-fixed.js
echo } >> install-openai-fixed.js
echo. >> install-openai-fixed.js
echo try { >> install-openai-fixed.js
echo   // Install OpenAI package with legacy-peer-deps flag >> install-openai-fixed.js
echo   console.log('Installing OpenAI package...'); >> install-openai-fixed.js
echo   execSync('npm install openai --legacy-peer-deps', { >> install-openai-fixed.js
echo     cwd: projectDir, >> install-openai-fixed.js
echo     stdio: 'inherit' // Show output in console >> install-openai-fixed.js
echo   }); >> install-openai-fixed.js
echo   >> install-openai-fixed.js
echo   console.log('OpenAI package installed successfully!'); >> install-openai-fixed.js
echo } catch (error) { >> install-openai-fixed.js
echo   console.error('Error installing OpenAI package:'); >> install-openai-fixed.js
echo   console.error(error.message); >> install-openai-fixed.js
echo   process.exit(1); >> install-openai-fixed.js
echo } >> install-openai-fixed.js

echo Updating OpenAI installation script completed.
echo.
echo Updated script file: install-openai-fixed.js
echo.
echo You can run it with:
echo node install-openai-fixed.js
echo.
echo Or run the provided batch file:
echo install-openai-fixed.bat
echo.
pause