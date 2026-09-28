// Bouwt docs/index.html (GitHub Pages) uit bron/website/template.html.
// Gebruik: node tools/build-pages.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const md = fs.readFileSync(path.join(root, 'bron/Agent-instructies.md'), 'utf8').replace(/\r/g, '');
const blocks = md.split('```').filter((_, i) => i % 2).map(s => s.replace(/^\n/, '').replace(/\n$/, ''));
const instructions = [blocks[2], blocks[5], blocks[8], blocks[11]];
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let t = fs.readFileSync(path.join(root, 'bron/website/template.html'), 'utf8');
instructions.forEach((s, i) => { t = t.replace('__INSTR_' + i + '__', esc(s)); });

// Word-bestanden kopiëren naar docs/materiaal onder een naam zonder spaties
const sources = {};
for (const dir of ['01 Agents', '02 Fictieve school Horizoncollege', '04 Hand-out']) {
  for (const f of fs.readdirSync(path.join(root, dir))) if (f.endsWith('.docx') && !f.startsWith('~$')) sources[f] = path.join(root, dir, f);
}
fs.mkdirSync(path.join(root, 'docs/materiaal'), { recursive: true });
t = t.replace(/'materiaal\/([^']+\.docx)'/g, (m, f) => {
  if (!sources[f]) throw new Error('Bestand niet gevonden: ' + f);
  const slug = f.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
  fs.copyFileSync(sources[f], path.join(root, 'docs/materiaal', slug));
  return "'materiaal/" + slug + "', '" + f + "'";
});

const replace = (a, b) => { if (!t.includes(a)) throw new Error('Niet gevonden in template: ' + a.slice(0, 60)); t = t.replace(a, b); };
replace('b.textContent = it[1];', 'b.textContent = it[2];');
replace('s.textContent = it[2];', 's.textContent = it[3];');
replace("'Download ' + it[1]", "'Download ' + it[2]");
replace('btn.dataset.path = it[0];', 'btn.dataset.path = it[0]; btn.dataset.name = it[1];');

// Buiten Claude: gewone downloadlinks in plaats van de downloads-capability
const start = t.indexOf("  var downloadsP = ");
const end = t.indexOf('})();', start);
if (start < 0 || end < 0) throw new Error('Downloadblok niet gevonden');
t = t.slice(0, start) + `  buttons.forEach(function(btn){
    var a = document.createElement('a');
    a.className = 'dl';
    a.href = btn.dataset.path;
    a.setAttribute('download', btn.dataset.name);
    a.setAttribute('aria-label', btn.getAttribute('aria-label'));
    a.textContent = 'Download .docx';
    btn.replaceWith(a);
  });
` + t.slice(end);

replace('</style>', 'body{margin:0}\na.dl{display:inline-flex;align-items:center;text-decoration:none}\nimg{max-width:100%}\n</style>');

const cut = t.indexOf('</style>') + '</style>'.length;
const html = `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Deelnemerswebsite voor de navorming over zelfgemaakte Copilot-agents voor schoolleiders.">
${t.slice(0, cut)}
</head>
<body>
${t.slice(cut)}
</body>
</html>
`;
fs.writeFileSync(path.join(root, 'docs/index.html'), html);
console.log('docs/index.html gebouwd met', Object.keys(sources).length, 'Word-bestanden');
