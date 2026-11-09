import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const source = 'issues';
const output = '_site';
const escapeHtml = text => text.replace(/[<>"']/g, character => ({
  '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const format = (date, options) => new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata', ...options,
}).format(date);

const issues = readdirSync(source, { withFileTypes: true })
  .filter(entry => entry.isFile() && /\.html$/i.test(entry.name))
  .map(({ name }) => {
    const path = source + '/' + name;
    const added = execFileSync('git', ['log', '--follow', '--diff-filter=A', '--format=%cI', '--', path],
      { encoding: 'utf8' }).trim().split('\n').at(-1);
    const date = new Date(added);
    if (Number.isNaN(date.getTime())) throw new Error('No upload commit found for ' + path);
    const html = readFileSync(path, 'utf8');
    const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim() || name;
    return { date, url: './issues/' + encodeURIComponent(name), title: escapeHtml(title) };
  })
  .sort((a, b) => b.date - a.date || a.url.localeCompare(b.url));

const months = new Map();
for (const issue of issues) {
  const month = format(issue.date, { month: 'long', year: 'numeric' });
  if (!months.has(month)) months.set(month, []);
  months.get(month).push(issue);
}

const sections = [...months].map(([month, posts]) =>
  '<section class="month"><h2>' + month + '</h2><ul>' +
  posts.map(({ url, title, date }) => '<li><a href="' + url + '"><span>' + title +
    '</span><small>' + format(date, { day: 'numeric', month: 'short' }) +
    ' upload <span aria-hidden="true">↗</span></small></a></li>').join('\n') +
  '</ul></section>'
).join('\n');

mkdirSync(output, { recursive: true });
cpSync(source, output + '/' + source, { recursive: true });
for (const asset of ['style.css', 'captain-nifty.svg']) cpSync(asset, output + '/' + asset);
writeFileSync(output + '/index.html', [
  '<!doctype html><html lang="en"><head><meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width,initial-scale=1">',
  '<title>The Nifty Chronicles</title><link rel="stylesheet" href="./style.css"></head>',
  '<body><main><nav><a href="https://sriniurs.github.io/">← srini.presents</a></nav>',
  '<header class="nifty-chronicles"><p class="label">MARKET COMICS</p>',
  '<h1>The Nifty Chronicles</h1><p>Follow the Nifty and the trading day, one comic at a time.</p>',
  '<div class="cast"><span><img src="./captain-nifty.svg" alt="" width="52" height="52">Captain Nifty</span></div></header>',
  '<div class="archives"><p class="label">UPLOAD ARCHIVE · NEWEST FIRST</p>',
  sections || '<p>The first issue will appear here after upload.</p>',
  '</div></main></body></html>',
].join('\n'));
