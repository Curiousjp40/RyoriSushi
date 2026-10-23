# Ryori Sushi · Zion House website

Static site (plain HTML/CSS/JS, no build step) for Ryori Sushi Zion House, a sushi restaurant in Colombia. Hosted on Cloudflare Pages with a custom domain bought through Cloudflare Registrar. Same setup as Ryora (ryoracreators.com).

## Files
- `index.html`: page layout
- `assets/menu.js`: **all content**. CONFIG (WhatsApp number, address, hours, socials, map), COMBOS, MENU. Every item has `es` and `en` text. Prices are plain COP numbers.
- `assets/app.js`: rendering, ES/EN toggle, cart + WhatsApp order flow, UI strings (`T`)
- `assets/style.css`: styles. Brand colors: black `#0b0909`, red `#c8102e`, gold `#d6b98c`
- `assets/img/`: photos cropped from the printed menu (`MENU ENGLISH.pdf` / `MENU ESPAÑOL.pdf`)

## Ordering (v1)
Customers build a cart, fill name / phone / delivery or pickup / address / payment / notes, and the site opens `wa.me/<CONFIG.whatsapp>` with the full order typed out. No backend. Cart and form are saved in localStorage.

## Before going live (TODO)
- [x] WhatsApp number (+57 314 7196115, from Google Maps listing; confirm it takes WhatsApp)
- [x] Address + map (Cra. 86 #45B-16, La América)
- [x] Hours (from Google Maps): Mon-Thu 3-10:30 PM, Fri-Sat 1-11 PM, Sun 1-10 PM
- [x] Rappi link added (CONFIG.rappi).
- [ ] Confirm Facebook/TikTok URLs (assumed `ryorisushi.co` handle everywhere)
- [ ] Owner confirms prices and the Spanish text for Pastas/Postres (translated from the English menu)

## Deploy
1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick this repo
2. Framework preset: None. Build command: empty. Output directory: `/`
3. Domain: Domain Registration → Register Domains → search `ryorisushi.co` (matches the @ryorisushi.co socials), fallback `ryorisushi.com`
4. Pages project → Custom domains → add the domain (DNS is automatic since it's on Cloudflare)

## Possible v2
- Online payments (Wompi, Bold, or Mercado Pago) via a Cloudflare Pages Function
- Orders saved to Cloudflare D1 with a simple kitchen dashboard
- Menu editor so the owner can change prices without touching code
