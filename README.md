# Bromsgrove Carpets & Flooring Co — Website

Static website hosted on GitHub Pages.

## Project Structure

```
bromsgrove-carpets/
├── index.html              ← Page shell — don't edit content here
├── css/
│   └── styles.css          ← All styling (colours, fonts, layout)
├── js/
│   └── main.js             ← Slider, nav toggle, partial loader
├── partials/               ← Edit individual page sections here
│   ├── topbar.html         ← Top info bar
│   ├── header.html         ← Logo + Book button
│   ├── nav.html            ← Navigation menu
│   ├── hero.html           ← Sliding hero banner
│   ├── banner.html         ← Yellow feature strip
│   ├── intro.html          ← About us + quote box
│   ├── panels.html         ← Flooring range grid
│   ├── gallery.html        ← Photo gallery
│   ├── why-us.html         ← Why choose us
│   ├── cta.html            ← Bottom call to action
│   └── footer.html         ← Footer
└── images/                 ← Drop photos in here
```

## Making Edits

| What to change | Which file |
|---|---|
| Text / wording in any section | The matching file in `partials/` |
| Colours | `css/styles.css` — edit the CSS variables at the top |
| Fonts | `css/styles.css` — change the Google Fonts link in `index.html` too |
| Nav links | `partials/nav.html` |
| WhatsApp number | Find & replace `447700000000` across all partials |
| Add a gallery photo | See instructions below |

## Deploying Updates

```bash
cd /Users/mattowen/projects/bromsgrove-carpets
git add .
git commit -m "describe what you changed"
git push
```

GitHub Pages auto-publishes within ~60 seconds.

## Adding a Photo to the Gallery

1. Save the photo into `images/` (e.g. `lounge-install.jpg`)
2. Open `partials/gallery.html`
3. Replace a placeholder tile:

**Before:**
```html
<div class="gallery-item"><span>🛋️</span><span class="lbl">Lounge</span></div>
```

**After:**
```html
<div class="gallery-item"><img src="images/lounge-install.jpg" alt="Lounge carpet installation Bromsgrove"></div>
```

## Changing the WhatsApp Number

Open each file in `partials/` and find/replace `447700000000` with your number
in international format without the `+` (e.g. `447712345678`).
