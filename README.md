# American Friends for Ukraine: website

A one-page site for taking donations and showing the projects we fund.

## Run it on your computer

```bash
npm install     # first time only
npm run dev
```

Then open http://localhost:3000.

---

## ✅ Information we still need

Everything below is a placeholder on the site right now. Each item lists **what we need**, **where it shows up**, and **the line to edit** in [`content/site.ts`](content/site.ts).

### 🔴 Needed before launch

| # | What we need | Where it shows on the site | Edit in `content/site.ts` |
| --- | --- | --- | --- |
| 1 | **Donation page link** (Zeffy, Givebutter, Donorbox, PayPal Giving Fund, etc.) | "Donate now", the $25–$500 buttons, "Other amount" | `donate.primaryUrl` and `donate.options` → "Give online" `url` |
| 2 | **Monthly giving link** (often the same platform) | "Start monthly gift" button | `donate.options` → "Give monthly" `url` |
| 3 | **501(c)(3) status**: pending or approved | Donate section + footer legal line | `legal.taxStatus` (`"pending"` or `"approved"`) |
| 4 | **EIN** (federal tax ID, format XX-XXXXXXX) | Donate section + footer | `legal.ein` |
| 5 | **Board-approved mission statement** | "Our mission" section | `mission.statement` (currently a draft) |
| 6 | **Contact email** | Footer, "Email us" button | `EMAIL` near the top |
| 7 | **Mailing address** for checks | Donate section + footer | `mailingAddress` |
| 8 | **Partner organization name** (Luke's organization) | Project cards + "Our partner on the ground" | `partner.name` and each project's `partner` |
| 9 | **Partner description**: who they are, how long they've worked, what they do | "Our partner on the ground" | `partner.body` |
| 10 | **Board members**: names and roles | "Our board" | `team` |
| 11 | **Confirm the tax-deductible FAQ answer** with your accountant | FAQ | `faq` → first answer (remove "[Confirm before launch]") |

### 🟡 Medical Supply Caravan details

| # | What we need | Edit in `content/site.ts` |
| --- | --- | --- |
| 12 | Fundraising goal (e.g. "$25,000 goal") | `projects` → caravan `goal` |
| 13 | Dates and route (where it starts and which cities it reaches) | `projects` → caravan `body` |
| 14 | A caravan photo (a photo from an earlier aid delivery is shown for now) | Put it in `public/actual/`, then set the caravan's `image: "/actual/photo-name.jpg"` |
| 15 | Status once it starts: `"Upcoming"`, `"Active"` or `"Completed"` | `projects` → caravan `status` |

### 🟢 Nice to have

| # | What we need | Edit in `content/site.ts` |
| --- | --- | --- |
| 16 | Domain name (e.g. americanfriendsforukraine.org) | `siteUrl` |
| 17 | Second project: title, one or two sentences, goal | `projects` → "[Next project]" (or delete that block) |
| 18 | Partner's website | `partner.url` |
| 19 | Share of donations that goes to projects (e.g. "volunteer-run, 95% to projects") | `faq` → last answer |
| 20 | Social media links (Instagram, Facebook, X, LinkedIn) | `social` |
| 21 | Board photos (optional; the site shows initials until then) | ask your web person to add |
| 22 | Final logo, if it changes | replace `public/images/logo.webp` (same file name) |
| 23 | Google Search Console verification code (see "Google & link sharing" below) | `seo.googleVerification` |
| 24 | X / Twitter handle, if you make one | `seo.twitterHandle` |

**At launch:** set `showPreviewBanner: false` to remove the "Preview site" bar at the top.

---

## How to change things

**All text and links live in [`content/site.ts`](content/site.ts).** You don't need to edit any other file.

- Text in `[square brackets]` is a placeholder that still needs real info.
- Any link left as `""` shows a "Coming soon" button instead of a broken link.
- To add a project, FAQ or board member: copy one `{ ... }` block, paste it below, and change the text. Mind the commas.

**To swap a picture:** replace the file in `public/images/` with a new one, **keeping the same file name**.

| File | Used for |
| --- | --- |
| `public/images/hero.webp` | Big illustration at the top |
| `public/images/logo.webp` | Logo next to the mission statement |
| `public/images/volunteers.webp` | "How it works" picture |
| `app/opengraph-image.jpg` | Preview card when the link is shared in texts, Facebook, LinkedIn, WhatsApp, etc. (1200×630) |
| `app/twitter-image.jpg` | Same preview card for X / Twitter |
| `app/opengraph-image.alt.txt` | Description of the preview card for screen readers |

The original full-size artwork is kept in `public/` with its original file names, as `.webp` (about 10× smaller than the PNGs). To add a new photo, convert it to WebP first (e.g. at squoosh.app), or drop in a JPG/PNG and it still works.

**Real photos** are picked by file name in `content/site.ts`. To swap one, change the name there.

| Section | Edit in `content/site.ts` | Files |
| --- | --- | --- |
| "Why it matters" (4 photos of war damage) | `impact.photos` | `public/actual/damage-*.jpg` |
| "From the field" (video + 6 photos) | `field.video`, `field.photos` | `public/actual/`, `public/videos/aid-loading-van.mp4` |
| Medical Supply Caravan card | `projects` → `image` | `public/actual/aid-semi-truck-loaded-with-supplies.jpg` |
| Picture under the partner name | `partner.image` | `public/stock/us-and-ukraine-flags-on-poles.jpg` |
| Faint flag background in the Donate section | `app/page.tsx` | `public/stock/us-and-ukraine-flags-blended.jpg` |

### Photo library (`public/actual/` and `public/stock/`)

**`public/actual/`**: real photos from Ukraine, named for what they show. The first word groups them:

| Starts with | What's in it |
| --- | --- |
| `aid-` | Trucks, vans and boxes of supplies being loaded and delivered |
| `team-` | Volunteers with supplies, at dinner, in safety gear |
| `training-` | First-aid training |
| `cleanup-` | Clearing old mattresses and furniture out of a building in the snow |
| `damage-` | Burned shopping centers, offices, apartment blocks, homes and cars |
| `kyiv-` | The display of destroyed Russian vehicles on St. Michael's Square |
| `mosque-` | A mosque with strike damage (craters, broken ceiling) |
| `memorial-`, `city-`, `misc-` | A street memorial, street views, a power-cut schedule screenshot |

Before using these on the site:

- `team-building-wooden-frames-WATERMARKED.jpg` has a photographer's watermark. Get permission, or don't use it.
- `mosque-people-praying.jpg` shows people at prayer, and `memorial-toys-and-candles-on-rubble.jpg` is a memorial with children's toys. Both are sensitive; ask before using them.
- Faces are recognizable in the `team-`, `aid-` and `training-` photos. Check that the people shown are OK with being on the site.

The raw videos are in `public/actual/videos/` and are **not** in git (about 26 MB). The site uses a 10-second cut, `public/videos/aid-loading-van.mp4`. Don't publish the two files named `DO-NOT-USE-…`: one shows a strike, and one is TV news footage with a channel's watermark.

**`public/stock/`**: stock images. They're tiny (240 pixels tall), so they look blurry at any real size. Only two are used, in places where that doesn't show. To use others, download the full-size versions from the stock site and check the license. The two camouflage-net images (`*-camouflage-net.jpg`) show military support, which doesn't fit a humanitarian charity.

The original WhatsApp zips and exact duplicates are in `originals/` (not in git). `originals/rename-log.tsv` lists each file's old and new name.

**Stays PNG/JPG on purpose:** `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.jpg` and `app/twitter-image.jpg`. Browser tabs, iPhones and link previews in texts and social apps need those formats.

### Brand SVGs (`public/brand/`)

Crisp vector versions of the logo that look sharp at any size. Use these for print, social profiles, email signatures, etc.

| File | What it is | Used on the site |
| --- | --- | --- |
| `mark.svg` | Heart of the U.S. and Ukrainian flags with gold stars | Header logo |
| `logo-horizontal.svg` | Heart + "American Friends for Ukraine", for light backgrounds | — (for print, email, partners) |
| `logo-horizontal-white.svg` | Same, for dark backgrounds | Footer |
| `aid-box.svg` | Aid box with a heart | Project cards with no photo yet |
| `flag-wave.svg` | Blue and yellow wave | Bottom of the donate section |
| `mark.webp`, `mark-192.webp`, `mark-maskable.webp` | WebP copies of the heart | Google logo, phone home-screen icon |
| `app/icon.svg`, `app/icon.png`, `app/apple-icon.png` | Heart without stars | Browser tab, iPhone home screen |

The original Next.js starter file names in `public/` are kept, now with brand artwork:

| File | Was | Now |
| --- | --- | --- |
| `public/next.svg` | Next.js wordmark | "American Friends for Ukraine" wordmark |
| `public/vercel.svg` | Vercel triangle | Heart logo |
| `public/file.svg` | File icon | Aid box |
| `public/globe.svg` | Globe icon | Globe in Ukraine colors with a heart pin |
| `public/window.svg` | Browser window icon | Browser window showing the heart logo |

## Google & link sharing

Already set up, nothing to install:

- **Google:** page title and description, a sitemap (`/sitemap.xml`), `robots.txt`, a canonical link, and structured data that tells Google this is a nonprofit (name, logo, contact, donate link, FAQ). Placeholder values in `[brackets]` are left out of the structured data automatically.
- **Link previews:** sharing the link in iMessage, WhatsApp, Facebook, LinkedIn, Slack or X shows the preview card, title and description.
- **Phones:** "Add to Home Screen" uses the heart icon and brand colors.

Edit the Google title and description in `content/site.ts` under `seo`.

**After launch (10 minutes):**
1. Set `siteUrl` in `content/site.ts` to your real domain. On Vercel, preview links already work before you have a domain.
2. Go to [Google Search Console](https://search.google.com/search-console), add your domain, and verify it: copy the code from the "HTML tag" option into `seo.googleVerification`, redeploy, then click Verify.
3. In Search Console, open **Sitemaps** and submit `sitemap.xml`.
4. Check the preview card with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/). They also clear old cached previews.
5. Check the structured data with Google's [Rich Results Test](https://search.google.com/test/rich-results).
6. Create a free [Google Business Profile](https://business.google.com) for the organization. It helps people find you when they search your name.

**Colors** live at the top of `app/globals.css`.

## Donations

Every Donate button on the site opens the **donation pop-up**: a centered card on computers and a slide-up sheet on phones.

**Connecting your donation platform** (in `content/site.ts` → `donate`). Fill in **one** of these:

| Option | What to paste | Works with |
| --- | --- | --- |
| A. `embedCode` | The full "embed" / "widget" code your platform gives you (`<script>` + `<div>` or `<iframe>`) | Givebutter widgets, Donorbox, Classy, Zeffy, Every.org, PayPal Donate SDK, Fundraise Up, most others |
| B. `embedUrl` | Just the address inside the platform's `<iframe src="...">` | Zeffy, Donorbox, Givebutter, Every.org, GoFundMe Pro |
| C. `primaryUrl` | A plain checkout link | Anything, including PayPal, Stripe Payment Links, Venmo, Cash App |

- With **A or B**, the platform's own form shows inside the pop-up. It only loads when someone opens the pop-up, so the page stays fast.
- With **C**, the pop-up shows amount buttons and a "Donate $100 →" button that opens your link in a new tab. Add `monthlyUrl` for a One-time / Monthly switch, and `amountParam` if your platform can pre-fill the amount.
- With **nothing filled in** (right now), the pop-up shows "Online giving opens soon" with mail-a-check and email options.
- Edit the **"What a gift can do"** lines under `impact`. They're marked [Example] until the board confirms real figures.

**Sharing the donation form:**

| Link | What it does |
| --- | --- |
| `yoursite.org/donate` | A standalone donation page. Best for social media posts, Instagram "link in bio", QR codes and emails. |
| `yoursite.org/#give` | Opens the site with the donation pop-up already open. |
| ⧉ button in the pop-up | Opens the donation form in its own small window. |

The pop-up and `/donate` page also have share buttons: copy link, the phone's share menu, WhatsApp, Facebook, X, text message and email.

**Making any new button open the pop-up:** give the link `href="/donate"` and a `data-donate` attribute. `data-donate="Medical Supply Caravan"` shows what the gift supports, and `data-amount="50"` pre-selects $50.

## Animations and speed

- **On load:** the headline appears word by word, then the text, buttons and illustration follow.
- **On scroll:** every section has an entrance and an exit. Headings slide up with a small accent line drawing in, images open up from a rounded window, cards stagger in one after another, flag stripes draw across, and items gently fade out as they leave the top of the screen.
- **Extras:** a blue and yellow progress bar runs along the top, a floating ♥ Donate button appears once you scroll past the top, and cards lift on hover.
- **Speed:** it's all CSS with no animation library. The page is about 390 KB, and on a slow 4G phone the main image shows in under 2 seconds.
- **Reduced motion:** people who turn on "reduce motion" in their phone or computer settings see no animation.
- **Firefox:** it gets the same entrances and exits through a small backup script (`app/ScrollFx.tsx`).

## Put it online

Easiest: push this folder to GitHub, import it at vercel.com (free), then connect your domain in Vercel's settings.
