const fs = require('fs');
// Get the environment variable or use a default value
const publicUrl = process.env.REACT_APP_PUBLIC_URL;
// Path to the package.json file
const packageJsonPath = './package.json';
// Read the current package.json file
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
// Update the homepage property
packageJson.homepage = publicUrl;
// Write the updated package.json file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Updated homepage to: ${publicUrl}`);
