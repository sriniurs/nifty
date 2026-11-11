# Nifty Chronicles — Master Reference v3.0

Two daily editions, written so they never repeat each other.

Version 3.0 · 11 November 2026 · replaces the Daily Nifty Chronicles Master Reference v2.2
Brand: **srini.presents** · Tagline: **for curious grown-ups** · Handle: `@srini.presents`
Live archive: **https://srinipresents.com/nifty/** (GitHub repo `sriniurs/nifty`, formerly `nifty-comics`)

---

## 1. The two editions at a glance

| | **Post Market** | **Pre Open** |
|---|---|---|
| Runs | Every NSE trading day, **4:00 pm IST** | Every NSE trading day, **3:00 am IST** (after the US close) |
| Job | **Today's match report**: what happened in India today | **While India slept**: what the world did overnight, today's map and our call |
| Looks like | Blue halftone page, **yellow cover**, red **POST MARKET** tag | **Navy night page**, navy cover with yellow title, cyan **PRE OPEN** tag |
| Narrator | Professor Earnings explains the day to Captain Nifty | Wall Street Wipeout and the Crude Kraken bring the night's news; the Captain wakes at the end |
| Ends with | "Tonight's homework": three questions for Pre Open to answer | **The one call** for the day, with a "we are wrong if" line |
| Filename | `issues/YYYY-MM-DD-post-market.html` | `issues/YYYY-MM-DD-pre-open.html` |
| `<title>` | `Nifty Chronicles Post Market \| <Weekday D Mon YYYY>` | `Nifty Chronicles Pre Open \| <Weekday D Mon YYYY>` |
| Approved sample | `examples/Nifty-Chronicles-Post-Market-SAMPLE-2026-11-11.html` | `examples/Nifty-Chronicles-Pre-Open-SAMPLE-2026-11-11.html` |

**Rule of no repetition:** each fact has one home. If it belongs to Pre Open, Post Market only teases it, and the reverse.

| Content | Post Market | Pre Open |
|---|---|---|
| Today's Indian close, range, sectors, stocks, breadth | ✅ full | one-row recap only |
| The day told as a story (open → high → slide → close) | ✅ four frames | — |
| Heroes and laggards (sectors and stocks) | ✅ | — |
| Five-session bar chart | ✅ | — |
| Momentum health check (RSI, distance from averages, VIX) in plain words | ✅ | — |
| Money trail: FII/DII, rupee, oil as they hit India | ✅ | final FII/DII only if newly released |
| Word of the day (one market term explained) | ✅ | — |
| US, Europe and Asia moves, yields, dollar, Fed | teaser only | ✅ full, as a night timeline |
| Oil and gold overnight | — | ✅ |
| GIFT Nifty | — | ✅ |
| Tower of levels (pivots, observed highs and lows) | — | ✅ "Today's map" |
| Calendar (data, results, events) | — | ✅ |
| **The call** | — (homework questions instead) | ✅ one call plus "we are wrong if" |
| Check of yesterday's call | — | ✅ "How did the call do?" |

---

## 2. Easy reading rules (both editions)

1. **No decimals anywhere a reader sees a number.**
   - Index levels, points, ₹ crore, $ prices: round to whole numbers (25,255.05 → **25,255**; +210.40 → **+210 pts**; $91.88 → **$92**).
   - Percentages: write **≈ 3%**, **≈ 1%**, **under 1%**, or words such as "a notch hotter than forecast". Never "0.84%".
   - Yields: **"about 19 basis points"** or **"near 5%"**.
   - Currency: **"about 94 per dollar"**, or words such as "one of its best levels in months".
   - Keep exact figures for your own arithmetic. Round only at the end.
2. Lead with points over percentages. "Up 210 points" reads faster than "up 0.84%".
3. One clear story per edition. Short sentences, plain English, light relevant humour.
4. Never more than about 6 numbers per panel. Use tiles (`.facts` / `.fact-tile`) for numbers and words for meaning.
5. Explain jargon the first time: RSI = "momentum score", India VIX = "fear gauge", GIFT Nifty = "a futures price that shows the mood, not the exact open".
6. Reading time target: **3–4 minutes** per edition.

---

## 3. Shared identity

- **Fonts:** Bangers for display lettering (Impact or Arial Black fallback); Comic Neue for body text (Comic Sans MS or Trebuchet fallback).
- **Panels:** white with 4px black borders and hard black offset shadows. Section titles are yellow (`#ffd83a`) and tilted.
- **Badges:** **FACT** (cyan, confirmed from a cited source) · **ESTIMATE** (yellow, calculated or inferred) · **OPINION** (pink, our judgement).
- **Cast:** Captain Nifty (hero, a candlestick), Professor Earnings (wise guide), the Wall of Resistance, the Crude Kraken (oil), Wall Street Wipeout (global markets), the Safety Net (supports). Characters appear **in action inside the story**. There is no separate "Meet the cast" section any more.
- **Captain Nifty's colours,** set by the latest completed session's close against the one before it:
  - Higher or unchanged close: **green body, red cape**.
  - Lower close: **red body, green cape**.
  - Post Market uses today's close; Pre Open uses the last completed session.
- **Captain's design:** upright rectangular candlestick body, black wick above and below, black eye mask, grin, and a yellow N50 shield when there is room.
- **Light theme only.** No dashboards, checklists, localStorage or tracking scripts. Everything sits in one self-contained HTML file and must read well on a phone.

---

## 4. A new picture every time

- Every edition gets a **new cover scene** chosen after the facts are verified. **Never repeat the scene used in the previous issue of the same edition.** Before choosing, check the last three issues in `issues/`.
- Use image generation when it is available, with `capt-nifty-reference-image.png` as the character reference. When it isn't, draw an **original inline SVG poster** in the series style (bold black ink, flat red, yellow, blue and green, halftone dots) and say so in the fine print.
- **Post Market scene ideas** (daytime, about what happened): hot-air balloon that rose and sank, high jump, rocket with few passengers, tug-of-war, swaying bridge, staircase, traffic jam, cricket scoreboard, surfing a wave, lift stuck between floors, kite string, marathon finish.
- **Pre Open scene ideas** (night or dawn, about what is coming): Captain asleep while messengers knock, moonlit watchtower, alarm clock at 9:15, sunrise over the Gateway, night train arriving, lighthouse in a storm, weather map, rooster crowing.
- Keep the poster to one focal idea and at most **two numbers**, in whole numbers. Label scene elements with SVG `textLength` so fallback fonts don't overflow.

---

## 5. Post Market: section order

1. **Cover:** title "Nifty Chronicles", red POST MARKET tag, a hook line, the date, the data cutoff, the brand, and the new scene.
2. **Strip:** one line saying what this edition covers and pointing to Pre Open, plus the badge legend.
3. **Today's scoreboard:** tiles for Nifty, Sensex, best sector, Smallcap 100, Midcap 100 (plus Bank Nifty and India VIX closes when published).
4. **The day in four frames** (`.strip`): 9:15 open → peak or trough → turn → 3:30 close. One sentence each, plus one speech bubble on two of the frames.
5. **Heroes and laggards:** a green panel for who carried the Nifty and a red panel for who sat it out (sectors, top closing gainers and losers, small and mid caps).
6. **The last five sessions:** bar chart of five completed closes in whole numbers. Green bar = higher than the previous close, red = lower. Say where the axis starts. Mention Muhurat or holidays. Give the five-session change in points.
7. **The Captain's health check:** a temperature meter (RSI as "momentum score", distance from the 50-day average), a nerves panel (India VIX as "fear gauge"), and a one-line **Verdict! (OPINION)**.
8. **The money trail:** FII/DII cash flows (the latest dated figures, ₹ crore), plus oil and rupee as they affect India.
9. **Prof. Earnings' word of the day:** one term tied to today's action (gap-up, profit-taking, breadth, short covering, VIX…). Never repeat a word within 30 issues.
10. **Tonight's homework:** three questions Pre Open will answer, plus the Captain's sign-off bubble.
11. **Fine print:** cutoff, anything unavailable, numbered dated sources, disclaimer.

## 6. Pre Open: section order

1. **Cover:** navy, cyan PRE OPEN tag, a hook question, the session date and time, the data cutoff in IST, the brand, and the new night or dawn scene.
2. **How did the call do?** Yesterday's call against what actually happened, in one or two lines. **Put it first in real editions**; the sample shows it at the end.
3. **Where we left the Captain:** one row of tiles with the last close, its range, and any holiday notes.
4. **The night shift:** 5–7 chapters, each with a time stamp in IST: Europe → US data and Fed speakers → bonds → US close → oil and gold → Asia and GIFT Nifty. Each chapter gets a short headline, 1–3 sentences and at most one bubble. The Captain wakes in the last chapter and asks "So what's waiting for me at 9:15?"
5. **The overnight scoreboard:** tiles for S&P 500, US 10-year yield, Brent, gold, rupee, GIFT Nifty (with the time of the quote). Green tiles help the Captain, red tiles hurt him.
6. **Today's map:** tower of levels from high to low. Classic pivots from the last session's official high, low and close (R2, R1, pivot, S1, S2), plus the observed high, low and close and any analyst zones. Whole numbers, with plain names ("First ceiling", "Balance point", "First floor").
7. **Today's calendar:** three cards (the bell, the all-day watch, the big event).
8. **Our call for today (OPINION):** a headline, the most-probable path, "Why", "What pushes against it", and "**We are wrong if**" with exact whole-number levels. One path only: never three equal scenarios, no probabilities, no buy or sell advice. If the evidence changed since the previous evening, say so.
9. **Fine print:** cutoff, anything unavailable, numbered dated sources, disclaimer.

Pivots: `P = (H+L+C)/3 · R1 = 2P−L · S1 = 2P−H · R2 = P+(H−L) · S2 = P−(H−L)`. Compute them only from official H/L/C, and round only for display.

---

## 7. Research and verification

**Never invent a figure.** Every number needs a value, units, a timestamp and a source URL. If an important reading isn't published by the cutoff, write "not yet available at cutoff". Don't estimate it.

**Post Market checklist:**
- Nifty 50: open, high, low, close and change.
- Sensex, Bank Nifty, Midcap 100, Smallcap 100.
- Best and worst sectors; top Nifty gainers and losers at the close.
- Breadth, stating which universe it covers.
- India VIX close.
- FII/DII provisional cash flows.
- USD/INR close; Brent with its timestamp.
- Dated provider technicals (RSI, 50-day average).
- The five closes plus a baseline.
- The day's material Indian news.
- If key closing data is missing, re-check every 10–15 minutes for up to 60 minutes before publishing.

**Pre Open checklist:**
- The last NSE close and its high, low and close.
- Final FII/DII figures.
- US index closes, dated in US time.
- US 2-year and 10-year yields, the dollar index, Fed speakers and overnight US data.
- Brent and WTI, with contract and timestamp.
- Spot gold.
- Rupee: last close or offshore rate.
- GIFT Nifty, with the time of the quote.
- Early Asia moves.
- Overnight Indian company results and news; RBI or government announcements.
- Today's Indian calendar.
- Convert every time to IST, allowing for US daylight saving: the US cash close is 2:30 am IST in winter and 1:30 am IST in summer.

**Trading day check:** both editions read the NSE holiday list first. If NSE equities don't trade that day, publish nothing. A holiday special in the Storm Watch format (`examples/Storm-Watch-holiday-special-2026-11-10.html`) is made only on request.

**Sources:** prefer, in order: NSE/BSE and NSE Indices files, exchange notices, RBI/FBIL, official data agencies (MoSPI, BLS), central banks, then credible dated financial reporting. Cross-check key closes.

---

## 8. Publishing (automatic, no approval needed)

1. Clone `sriniurs/nifty` (shallow).
2. Add the single HTML file under `issues/` using the filename and `<title>` from §1. Never edit `build.mjs`, `style.css` or existing issues.
3. Commit `Add Nifty Chronicles <Post Market|Pre Open> <date>` to `main`. Fetch and rebase, then push.
4. GitHub Actions ("Publish series archives") rebuilds the archive. The `<title>` becomes the archive entry.
5. Confirm the Actions run succeeded and that `https://srinipresents.com/nifty/issues/<filename>` loads.
6. Send Srini the live link, the headline figures, and the one-line call (Pre Open) or the three homework questions (Post Market).

If a push is refused, the Claude GitHub App needs access to `sriniurs/nifty` (GitHub → Settings → Applications → Claude → Repository access). In that case, send the HTML file instead.

---

## 9. Quality checks before publishing

- Recheck all arithmetic from the exact figures: changes, pivots, five-session change, chart bar heights.
- Run a **decimal scan** on visible text: no `\d+\.\d+` outside links. Fix any hit.
- Captain's colours match the close comparison.
- The cover scene differs from the previous issue of the same edition.
- Render at **1100, 390 and 320px** wide: no horizontal overflow, no clipped lettering, readable tiles.
- Exactly one call (Pre Open), with a "we are wrong if" line.
- The fine print ends with exactly: **For information and education only. Not personal financial advice, a recommendation to buy or sell, or a trading signal.**
- Copyright: original art only, no copied article passages.

---

## 10. Files in this package

| File | Use |
|---|---|
| `01-nifty-comic/Nifty-Chronicles-Master-Reference-v3.0.md` | This rulebook |
| `01-nifty-comic/examples/Nifty-Chronicles-Post-Market-SAMPLE-2026-11-11.html` | **Approved Post Market template.** Edit in place: CSS, components and section order |
| `01-nifty-comic/examples/Nifty-Chronicles-Pre-Open-SAMPLE-2026-11-11.html` | **Approved Pre Open template** |
| `01-nifty-comic/examples/Nifty-Chronicles-2026-11-11-v2.2.html` | The last single-edition daily in the v2.2 format (reference only) |
| `01-nifty-comic/examples/Nifty-Chronicles-2026-11-09.html`, `Storm-Watch-holiday-special-2026-11-10.html` | Earlier approved looks; Storm Watch is the holiday special |
| `01-nifty-comic/capt-nifty-reference-image.png` | Captain Nifty character reference |
| `01-nifty-comic/srini-presents-badge.png` | Brand badge |
| `01-nifty-comic/archive/Daily-Nifty-Chronicles-Master-Reference-v2.2.md` | Previous rulebook, superseded |
| `02-nifty-video/` | Nifty video rules and reference video (unchanged) |
| `04-srini-presents-comic-master/` | General Zappy and Prof. Bolt explainer-comic master (unchanged; separate series) |

---

## 11. What changed from v2.2

- One daily edition became **two**: Post Market (India today) and Pre Open (overnight world, map and call). Content is split so nothing repeats.
- **No decimals** in visible numbers; plain-English names for indicators.
- **Removed:** "Meet the cast", the four-panel technical-indicator section and the three-door endings. The tower of levels and the call moved to Pre Open only.
- **Added:** day-in-four-frames strip, heroes and laggards, health check, money trail, word of the day, tonight's homework, night-shift timeline, overnight scoreboard, "How did the call do?".
- **A new cover scene every issue**, never repeating the previous one.
- **Automatic publishing** to `sriniurs/nifty` and srinipresents.com/nifty/ through two scheduled tasks.
