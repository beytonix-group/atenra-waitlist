const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist', 'index.html');
const outPath = path.join(__dirname, '..', 'src', 'worker-embed.js');

if (!fs.existsSync(distPath)) {
  console.error('dist/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

const html = fs.readFileSync(distPath, 'utf8');
const content = `export const html = ${JSON.stringify(html)};\n`;
fs.writeFileSync(outPath, content, 'utf8');
console.log('Wrote', outPath);
