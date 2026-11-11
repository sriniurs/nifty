#!/usr/bin/env python3
"""Make a 1200x675 share card (PNG) for a Nifty Chronicles issue.

Usage:
  python3 make-share-card.py ISSUE.html OUT.png "Stat 1 label|25,255" "Stat 2 label|+210 pts"

Reads the edition tag, sub-headline and cover SVG from the issue and lays them out
as a card for X and LinkedIn. Needs playwright plus Chrome (/usr/bin/google-chrome)
or playwright's bundled Chromium.
"""
import html, os, re, sys

src, out = sys.argv[1], sys.argv[2]
stats = [s.split('|', 1) for s in sys.argv[3:5]]
page = open(src, encoding='utf-8').read()

def grab(pattern, default=''):
    m = re.search(pattern, page, re.S)
    return re.sub(r'<[^>]+>', '', m.group(1)).strip() if m else default

tag = grab(r'class="special-tag[^"]*">(.*?)</span>', 'Nifty Chronicles')
sub = grab(r'class="sub">(.*?)</div>')
svg = re.search(r'<figure class="cover-art">(.*?)</figure>', page, re.S)
svg = svg.group(1) if svg else ''
body_class = re.search(r'<body class="([^"]*)"', page)
ground = {'night': '#101a4a', 'hol': '#3b1f6b', 'wtw': '#f4ecd8', 'wa': '#0f6b73'}.get(body_class.group(1) if body_class else '', '#2a6fdb')
tag_bg = {'Pre Open': '#3cc3ee', 'Post Market': '#e8382b', 'Holiday Special': '#e8382b',
          'The Week That Was': '#19a058', 'The Week Ahead': '#7b3fb8'}.get(tag, '#e8382b')
tag_fg = '#141414' if tag == 'Pre Open' else '#fff'

tiles = ''.join(f'<div class="t"><div class="n">{html.escape(v)}</div><div class="l">{html.escape(l)}</div></div>' for l, v in stats)
card = f'''<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@700&display=swap">
<style>
*{{box-sizing:border-box}}body{{margin:0;width:1200px;height:675px;background:{ground};background-image:radial-gradient(rgba(255,255,255,.18) 1.6px,transparent 1.7px);background-size:12px 12px;font-family:"Comic Neue","Comic Sans MS",sans-serif;color:#141414}}
.c{{position:absolute;inset:28px;background:#ffd83a;border:6px solid #141414;box-shadow:10px 10px 0 #141414;display:grid;grid-template-columns:1fr 540px;gap:26px;padding:28px;align-items:center}}
.tag{{display:inline-block;background:{tag_bg};color:{tag_fg};border:4px solid #141414;font-family:Bangers,Impact,sans-serif;font-size:30px;letter-spacing:2px;padding:4px 14px 0;transform:rotate(-2deg)}}
h1{{font-family:Bangers,Impact,sans-serif;font-weight:400;font-size:78px;line-height:.95;margin:16px 0 8px;letter-spacing:2px}}
.s{{font-family:Bangers,Impact,sans-serif;font-size:34px;line-height:1.1;margin-bottom:18px}}
.ts{{display:flex;gap:14px}}.t{{background:#fff;border:4px solid #141414;padding:8px 14px;min-width:200px}}
.n{{font-family:Bangers,Impact,sans-serif;font-size:46px;line-height:1}}.l{{font-size:17px;font-weight:700;text-transform:uppercase}}
.f{{margin-top:18px;font-weight:700;font-size:20px}}.km{{background:#141414;color:#fff;border:4px solid #141414;padding:8px 12px;font-size:21px;font-weight:800;display:inline-block}}.km b{{color:#ffd83a}}.cm{{margin-top:10px;font-size:20px;font-weight:800}}.art svg{{width:540px;height:540px;display:block;border:5px solid #141414}}
</style></head><body><div class="c"><div><span class="tag">{html.escape(tag)}</span><h1>NIFTY<br>CHRONICLES</h1><div class="s">{html.escape(sub)}</div><div class="ts">{tiles}</div><div class="f"><div class="km">To know more: <b>srinipresents.com/nifty</b></div><div class="cm">💬 Check the comments for the full article</div></div></div><div class="art">{svg}</div></div></body></html>'''

tmp = os.path.splitext(out)[0] + '.card.html'
open(tmp, 'w', encoding='utf-8').write(card)
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    exe = '/usr/bin/google-chrome' if os.path.exists('/usr/bin/google-chrome') else None
    b = p.chromium.launch(executable_path=exe, args=['--no-sandbox'])
    pg = b.new_page(viewport={'width': 1200, 'height': 675})
    pg.goto('file://' + os.path.abspath(tmp))
    pg.wait_for_timeout(800)
    pg.screenshot(path=out)
    b.close()
os.remove(tmp)
print(out)
