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

// Same Back / Home bar as the main site, added to every issue page at build time.
const siteBar = `<!-- sitenav:auto --><style>
.sp-bar{position:sticky;top:0;z-index:9999;display:flex;gap:8px;align-items:center;padding:8px 12px;background:rgba(255,253,244,.94);border-bottom:2px solid #09283f;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);font:700 14px/1 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.sp-bar a{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;border:2px solid #09283f;background:#fff;color:#09283f;text-decoration:none;box-shadow:2px 2px 0 #09283f}
.sp-bar a:hover,.sp-bar a:focus-visible{background:#ffe53a}
.sp-bar a:active{transform:translate(1px,1px);box-shadow:1px 1px 0 #09283f}
.sp-bar .sp-brand{margin-left:auto;border:0;box-shadow:none;background:none;padding:0 2px}.sp-bar .sp-brand img{display:block;height:36px;width:auto}.sp-bar .sp-brand:hover{background:none}
.sp-brandtile{display:inline-flex;flex-direction:column;align-items:flex-start;gap:6px;margin:0 0 12px}.sp-brandtile img{display:block;width:200px;max-width:62vw;height:auto;background:#ebeae0;border:3px solid #151515;border-radius:14px;padding:6px 10px;box-shadow:4px 4px 0 #151515}.sp-brandtile span{font:700 15px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;letter-spacing:.02em}
@media print{.sp-bar{display:none}}
</style>
<nav class="sp-bar" aria-label="Site"><a href="/nifty/" id="sp-back" aria-label="Go back">&larr; Back</a><a href="/" aria-label="Home page">&#8962; Home</a><a class="sp-brand" href="/" aria-label="srini.presents home"><img src="/assets/brand/logo.png" alt="srini.presents" width="420" height="192"></a></nav>
<script>(function(){var b=document.getElementById('sp-back');if(!b)return;b.addEventListener('click',function(e){var r=document.referrer;if(r&&r.indexOf(location.origin)===0&&history.length>1){e.preventDefault();history.back();}});})();</script>
<!-- /sitenav:auto -->`;
// Logo on every issue cover: the yellow "srini.presents · for curious grown-ups" chip becomes the logo tile.
const brandChip = /<span style="background:var\(--yellow\)">\s*srini\.presents\s*·\s*for curious grown-ups\s*<\/span>/i;
const brandTile = '<div class="sp-brandtile"><img src="/assets/brand/logo.png" alt="srini.presents" width="420" height="192"><span>for curious grown-ups</span></div>';
const addLogo = html => {
  if (html.includes('sp-brandtile"><img') || !brandChip.test(html)) return html;
  html = html.replace(brandChip, '');
  return html.replace(/(<header class="cover[^"]*">\s*<div[^>]*>)/i, '$1' + brandTile);
};
const addBar = html => addLogo(html.includes('<!-- sitenav:auto -->') ? html
  : html.replace(/<body\b[^>]*>/i, tag => tag + '\n' + siteBar + '\n'));

mkdirSync(output, { recursive: true });
cpSync(source, output + '/' + source, { recursive: true });
for (const entry of readdirSync(output + '/' + source, { withFileTypes: true })) {
  if (!entry.isFile() || !/\.html$/i.test(entry.name)) continue;
  const file = output + '/' + source + '/' + entry.name;
  writeFileSync(file, addBar(readFileSync(file, 'utf8')));
}
for (const asset of ['style.css', 'captain-nifty-marine-drive.jpg']) cpSync(asset, output + '/' + asset);
const latest = issues[0];
writeFileSync(output + '/index.html', [
  '<!doctype html><html lang="en"><head><meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width,initial-scale=1">',
  '<meta name="description" content="Follow Captain Nifty through illustrated stories about the Indian stock market.">',
  '<title>The Nifty Chronicles | srini.presents</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&amp;display=swap"><link rel="stylesheet" href="./style.css?v=retro-title"></head>',
  '<body><main class="page"><nav aria-label="Site navigation"><a class="brand" href="/" aria-label="srini.presents home"><img src="/assets/brand/logo.png" alt="srini.presents" width="420" height="192" style="display:block;height:56px;width:auto;background:#ebeae0;border:3px solid #151515;border-radius:12px;padding:4px 8px;box-shadow:3px 3px 0 #151515"></a><a class="nav-link" href="#archive">Issue archive ↓</a></nav>',
  '<header class="cover"><div class="intro"><p class="kicker">An illustrated market series</p>',
  '<h1><span>The Nifty</span> <span>Chronicles</span></h1>',
  '<p class="tagline">Follow Captain Nifty through market rallies, plot twists and the trading day.</p>',
  '<div class="actions">',
  latest ? '<a class="button primary" href="' + latest.url + '">Read the latest article <span aria-hidden="true">↗</span></a>' : '',
  '<a class="button secondary" href="#archive">Browse the archive <span aria-hidden="true">↓</span></a></div></div>',
  '<figure class="cover-art"><img src="./captain-nifty-marine-drive.jpg" width="1254" height="1254" alt="Captain Nifty, a green candlestick superhero with a red cape, swoops over the lights of Marine Drive in Mumbai." fetchpriority="high"></figure></header>',
  '<section id="archive" class="archives" aria-labelledby="archive-title"><div class="archive-intro"><p class="kicker">The back issues</p><h2 id="archive-title">Issue archive</h2><p>Browse by upload month, newest first.</p></div>',
  sections || '<p>The first issue will appear here after upload.</p>',
  '</section><footer><a href="/">srini.presents</a><span>The Nifty Chronicles</span></footer>',
  '</main></body></html>',
].join('\n'));
