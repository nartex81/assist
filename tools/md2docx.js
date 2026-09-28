// Minimal markdown -> docx converter. Usage: node md2docx.js in.md out.docx "footer text"
const fs = require('fs');
const d = require('docx');
const [, , inFile, outFile, footerText = ''] = process.argv;
const lines = fs.readFileSync(inFile, 'utf8').replace(/\r/g, '').split('\n');

const ACCENT = '1F4E79', LIGHT = 'DEEAF6', BOX = 'F2F2F2';
const FONT = 'Calibri', MONO = 'Consolas';
const PAGE_W = 11906 - 2 * 1134; // A4 minus 2cm margins

function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new d.TextRun({ text: text.slice(last, m.index), ...base }));
    const t = m[0];
    if (t.startsWith('**')) out.push(new d.TextRun({ text: t.slice(2, -2), bold: true, ...base }));
    else if (t.startsWith('`')) out.push(new d.TextRun({ text: t.slice(1, -1), font: MONO, ...base }));
    else out.push(new d.TextRun({ text: t.slice(1, -1), italics: true, ...base }));
    last = m.index + t.length;
  }
  if (last < text.length) out.push(new d.TextRun({ text: text.slice(last), ...base }));
  return out;
}

const border = { style: d.BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const borders = { top: border, bottom: border, left: border, right: border };

function table(rows) {
  const cells = rows.map(r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
  const header = cells[0];
  const body = cells.slice(2);
  const n = header.length;
  // column widths proportional to max content length (clamped)
  const lens = header.map((_, i) => Math.min(60, Math.max(8, ...cells.filter((_, k) => k !== 1).map(r => (r[i] || '').length))));
  const sum = lens.reduce((a, b) => a + b, 0);
  const widths = lens.map(l => Math.floor(PAGE_W * l / sum));
  widths[n - 1] += PAGE_W - widths.reduce((a, b) => a + b, 0);
  const mk = (r, isHead) => new d.TableRow({
    tableHeader: isHead,
    children: widths.map((w, i) => new d.TableCell({
      width: { size: w, type: d.WidthType.DXA }, borders,
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      shading: isHead ? { fill: ACCENT, type: d.ShadingType.CLEAR, color: 'auto' } : undefined,
      children: (r[i] || '').split('<br>').map(t => new d.Paragraph({ spacing: { after: 40 }, children: runs(t, isHead ? { bold: true, color: 'FFFFFF' } : {}) })),
    })),
  });
  return new d.Table({ width: { size: PAGE_W, type: d.WidthType.DXA }, columnWidths: widths, rows: [mk(header, true), ...body.map(r => mk(r, false))] });
}

function boxPara(text, opts = {}) {
  return new d.Paragraph({
    shading: { fill: opts.fill || BOX, type: d.ShadingType.CLEAR, color: 'auto' },
    border: { left: { style: d.BorderStyle.SINGLE, size: 18, color: opts.bar || ACCENT, space: 8 } },
    indent: { left: 170, right: 170 }, spacing: { after: 0, line: 276 },
    children: runs(text, opts.mono ? { font: MONO, size: 19 } : {}),
  });
}

const children = [];
let numInstance = 0, i = 0, inNumbered = false;
while (i < lines.length) {
  const l = lines[i];
  if (!/^\s*\d+\.\s/.test(l) && l.trim() !== '') inNumbered = false;
  if (l.startsWith('```')) {
    i++;
    const block = [];
    while (i < lines.length && !lines[i].startsWith('```')) block.push(lines[i++]);
    i++;
    block.forEach(b => children.push(boxPara(b === '' ? ' ' : b, { mono: true })));
    children.push(new d.Paragraph({ spacing: { after: 120 }, children: [] }));
    continue;
  }
  if (l.startsWith('|')) {
    const rows = [];
    while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
    children.push(table(rows));
    children.push(new d.Paragraph({ spacing: { after: 120 }, children: [] }));
    continue;
  }
  if (l.startsWith('>')) {
    const block = [];
    while (i < lines.length && lines[i].startsWith('>')) block.push(lines[i++].replace(/^>\s?/, ''));
    block.forEach(b => children.push(boxPara(b === '' ? ' ' : b, { fill: LIGHT })));
    children.push(new d.Paragraph({ spacing: { after: 120 }, children: [] }));
    continue;
  }
  i++;
  if (l.trim() === '') continue;
  if (l.trim() === '---') { children.push(new d.Paragraph({ children: [new d.PageBreak()] })); continue; }
  let m;
  if ((m = l.match(/^(#{1,3})\s+(.*)/))) {
    const lvl = [d.HeadingLevel.HEADING_1, d.HeadingLevel.HEADING_2, d.HeadingLevel.HEADING_3][m[1].length - 1];
    children.push(new d.Paragraph({ heading: lvl, children: runs(m[2]) }));
    continue;
  }
  if ((m = l.match(/^(\s*)[-*]\s+(.*)/))) {
    children.push(new d.Paragraph({ numbering: { reference: 'bul', level: m[1].length >= 2 ? 1 : 0 }, spacing: { after: 60 }, children: runs(m[2]) }));
    continue;
  }
  if ((m = l.match(/^(\s*)\d+\.\s+(.*)/))) {
    if (!inNumbered) { numInstance++; inNumbered = true; }
    children.push(new d.Paragraph({ numbering: { reference: 'num', level: 0, instance: numInstance }, spacing: { after: 60 }, children: runs(m[2]) }));
    continue;
  }
  children.push(new d.Paragraph({ spacing: { after: 120 }, children: runs(l) }));
}

const doc = new d.Document({
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 36, bold: true, color: ACCENT }, paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 28, bold: true, color: ACCENT }, paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1, border: { bottom: { style: d.BorderStyle.SINGLE, size: 6, color: LIGHT, space: 2 } } } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, color: '404040' }, paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: 'bul', levels: [
        { level: 0, format: d.LevelFormat.BULLET, text: '•', alignment: d.AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
        { level: 1, format: d.LevelFormat.BULLET, text: '–', alignment: d.AlignmentType.LEFT, style: { paragraph: { indent: { left: 1080, hanging: 270 } } } },
      ] },
      { reference: 'num', levels: [
        { level: 0, format: d.LevelFormat.DECIMAL, text: '%1.', alignment: d.AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } },
      ] },
    ],
  },
  sections: [{
    properties: { page: { margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    footers: { default: new d.Footer({ children: [new d.Paragraph({ alignment: d.AlignmentType.CENTER, children: [
      new d.TextRun({ text: footerText ? footerText + '  |  p. ' : 'p. ', size: 16, color: '808080' }),
      new d.TextRun({ children: [d.PageNumber.CURRENT], size: 16, color: '808080' }),
    ] })] }) },
    children,
  }],
});
d.Packer.toBuffer(doc).then(b => { fs.writeFileSync(outFile, b); console.log('wrote', outFile); });
