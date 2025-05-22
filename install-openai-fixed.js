// Script to install OpenAI package with legacy-peer-deps flag
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get project directory
const projectDir = path.resolve(__dirname);
console.log(`Project directory: ${projectDir}`);

// Check if package.json exists
if (!fs.existsSync(path.join(projectDir, 'package.json'))) {
  console.error('Error: package.json not found in the project directory.');
  process.exit(1);
}

try {
  // Install OpenAI package with legacy-peer-deps flag
  console.log('Installing OpenAI package...');
  execSync('npm install openai --legacy-peer-deps', { 
    cwd: projectDir,
    stdio: 'inherit' // Show output in console
  });
  
  console.log('OpenAI package installed successfully!');
} catch (error) {
  console.error('Error installing OpenAI package:');
  console.error(error.message);
  process.exit(1);
}