const fs = require('fs');
const { execSync } = require('child_process');

// Read package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const current = pkg.version.split('.').map(Number);

// Bump patch version
current[2] += 1;
const newVersion = current.join('.');
pkg.version = newVersion;

// Update package.json
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

// Update version in index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/V\.\d+\.\d+\.\d+/, `V.${newVersion}`);
fs.writeFileSync('index.html', html);

console.log(`\n Version bumped to ${newVersion}\n`);
console.log(' Building...\n');

// Run build
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log(`\n Done! Upload these 3 files from the release folder to GitHub as v${newVersion}:`);
  console.log(`   - It's Just Logic Setup ${newVersion}.exe`);
  console.log(`   - It's Just Logic Setup ${newVersion}.exe.blockmap`);
  console.log(`   - latest.yml`);
  console.log(`\n GitHub releases: https://github.com/DrPineapp1e/its-just-logic/releases/new\n`);
} catch(e) {
  console.error('\n Build failed. Make sure you ran this as Administrator.\n');
}
