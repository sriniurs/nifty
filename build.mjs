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
for (const asset of ['style.css', 'captain-nifty-mumbai.jpg']) cpSync(asset, output + '/' + asset);
const latest = issues[0];
writeFileSync(output + '/index.html', [
  '<!doctype html><html lang="en"><head><meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width,initial-scale=1">',
  '<meta name="description" content="Follow Captain Nifty through illustrated stories about the Indian stock market.">',
  '<title>The Nifty Chronicles | srini.presents</title><link rel="stylesheet" href="./style.css?v=comic-cover-2"></head>',
  '<body><main class="page"><nav aria-label="Site navigation"><a class="brand" href="https://sriniurs.github.io/">← srini.presents</a><a class="nav-link" href="#archive">Issue archive ↓</a></nav>',
  '<header class="cover"><div class="intro"><p class="kicker">An illustrated market series</p>',
  '<h1><span>The Nifty</span> <span>Chronicles</span></h1>',
  '<p class="tagline">Follow Captain Nifty through market rallies, plot twists and the trading day.</p>',
  '<div class="actions">',
  latest ? '<a class="button primary" href="' + latest.url + '">Read the latest comic <span aria-hidden="true">↗</span></a>' : '',
  '<a class="button secondary" href="#archive">Browse the archive <span aria-hidden="true">↓</span></a></div></div>',
  '<figure class="cover-art"><img src="./captain-nifty-mumbai.jpg" width="850" height="850" alt="Captain Nifty leaps over the Mumbai waterfront in a red cape, holding a market newspaper." fetchpriority="high"></figure></header>',
  '<section id="archive" class="archives" aria-labelledby="archive-title"><div class="archive-intro"><p class="kicker">The back issues</p><h2 id="archive-title">Issue archive</h2><p>Browse by upload month, newest first.</p></div>',
  sections || '<p>The first issue will appear here after upload.</p>',
  '</section><footer><a href="https://sriniurs.github.io/">srini.presents</a><span>The Nifty Chronicles</span></footer>',
  '</main></body></html>',
].join('\n'));
