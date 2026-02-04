const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');
const outPath = path.join(__dirname, '..', 'src', 'worker-embed.js');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf8');

function walk(dir, base) {
  const files = {};
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = base ? path.join(base, entry.name) : entry.name;
    if (entry.isDirectory()) {
      Object.assign(files, walk(full, rel));
    } else {
      files[rel] = full;
    }
  }
  return files;
}

const found = walk(assetsDir, 'assets');
const assets = {};
for (const [rel, full] of Object.entries(found)) {
  const buf = fs.readFileSync(full);
  const ext = path.extname(full).slice(1).toLowerCase();
  let type = 'application/octet-stream';
  if (ext === 'js') type = 'application/javascript';
  else if (ext === 'css') type = 'text/css';
  else if (ext === 'svg') type = 'image/svg+xml';
  else if (ext === 'png') type = 'image/png';
  else if (ext === 'jpg' || ext === 'jpeg') type = 'image/jpeg';
  else if (ext === 'json' || ext === 'map') type = 'application/json';
  else if (ext === 'ico') type = 'image/x-icon';
  else if (ext === 'woff2') type = 'font/woff2';

  assets['/' + rel.replace(/\\\\/g, '/')] = {
    type,
    base64: buf.toString('base64'),
  };
}

const out = [];
out.push(`export const html = ${JSON.stringify(html)};`);
out.push(`export const assets = ${JSON.stringify(assets)};`);
fs.writeFileSync(outPath, out.join('\n'), 'utf8');
console.log('Wrote', outPath);
