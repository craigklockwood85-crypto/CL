# CL Home Services — Landing Page

A fast, mobile-friendly landing page for a local service business. Plain HTML, CSS, and JavaScript — no build step.

## Files

- `index.html` — page content and structure
- `styles.css` — all styling (colors live in the `:root` block at the top)
- `script.js` — mobile menu, "open now" indicator, scroll animations, contact form

## Preview locally

Open `index.html` in a browser, or run a small server:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customizing

The page ships with sample content for "CL Home Services". To make it yours, search `index.html` for and replace:

| What | Placeholder |
| --- | --- |
| Business name | `CL Home Services` / `Home Services` |
| Phone | `(555) 123-4567` and `tel:+15551234567` |
| Email | `hello@clhomeservices.com` |
| Address | `123 Main Street, Springfield` |
| Service area towns | the `.tag-list` items |
| License number | `License #000000` |
| Services, reviews, stats | the cards in each section |

- **Colors:** edit `--brand`, `--brand-dark`, `--brand-light`, and `--accent` in `styles.css`.
- **Hours:** update both the hours list in `index.html` and the `HOURS` object in `script.js` (it drives the "Open now" badge).

## Contact form

The form posts to [Formspree](https://formspree.io) (free tier available):

1. Create a form on Formspree and copy its ID.
2. In `index.html`, replace `YOUR_FORM_ID` in the form's `action` URL.

Until then, submitting shows a "not connected yet" notice.

## Deploying

Any static host works. For GitHub Pages: repo **Settings → Pages → Deploy from a branch**, pick your branch and `/ (root)`.
