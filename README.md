# Mesigo Eng Fab website

Single-page B2B landing page for Mesigo Eng Fab (Vadodara), built with Next.js 16 (App Router), React 19, TypeScript (strict) and Tailwind CSS 4.

Homepage order: navigation, hero, screw conveyor assembly video, about, featured machinery, industries and applications, workshop story, enquiry, footer.

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npm run build && npm start
npm run assets       # regenerate optimised images from assets-src/
```

## Environment

Copy `.env.example` to `.env.local` and fill in the values.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, default `https://mesigoengfab.com` |
| `SITE_ENV=production` | Off Vercel, marks the live deployment as indexable. On Vercel, `VERCEL_ENV` is used instead. Every other environment sends `noindex` (robots.txt + `X-Robots-Tag`). |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | Enquiry email delivery through the Resend HTTP API |

## Enquiry form status

`POST /api/enquiry/` validates with Zod (`lib/enquiry-schema.ts`, server only), checks the origin, rate-limits (5 per 15 min per IP), traps bots with a honeypot, and sends a plain-text email through Resend. The form gives instant feedback from the same limits, pattern and messages in `lib/enquiry-rules.ts`, without shipping Zod to the browser.

**Until the three Resend variables are set, the endpoint returns 503 and the form tells the visitor their message was not sent**, offering WhatsApp (prefilled with what they typed) and phone instead. It never shows a success message for an undelivered enquiry. Server logs contain only an event name and request id.

To go live: verify the sending domain in Resend, set the three variables, deploy, then submit a test enquiry.

## Assets

| File | Notes |
|---|---|
| `gemini_generated_video_a575d076.mp4` | Original master, untouched |
| `public/videos/mesigo-screw-conveyor-assembly.mp4` | Web copy: same H.264 stream (1280x720, 24 fps, 10 s), audio track removed, `+faststart`. Made with `ffmpeg -i <master> -map 0:v:0 -c:v copy -an -movflags +faststart` |
| `public/images/mesigo-screw-conveyor-poster.webp` | First video frame (initial poster) |
| `public/images/mesigo-screw-conveyor-assembled.webp` | Last frame (reduced-motion poster and playback fallback) |
| `public/images/og-mesigo-screw-conveyor.jpg` | 1200x630 social image from the last frame |
| `public/images/machinery/*` | Company catalogue photos, processed by `scripts/prepare-assets.mjs` |
| `app/icon.png`, `app/apple-icon.png` | Built from the logo mark |

Frames in `assets-src/frames/` were extracted with ffmpeg (`-ss 0` and `-sseof -0.1`).

## Video behaviour (`components/AssemblyVideo.tsx`)

- Nothing is downloaded until the section is within 400px of the viewport; the hero never waits on the video.
- Plays once, muted and inline, when half the video is visible; pauses off-screen and resumes on return.
- Ends on the assembled machine with a Replay control (no loop, which would snap back to the exploded view).
- `prefers-reduced-motion`: no autoplay, assembled still plus a Play button.
- Autoplay blocked: Play button overlay. Playback error: assembled still and a short notice.
- 16:9 box reserved up front (no layout shift), `object-fit: contain` (no distortion).

## Facts

All business details live in `data/` and are sourced in [docs/verified-facts.md](docs/verified-facts.md), together with the open questions for the client.

## Design system (dark industrial)

Tokens live in `app/globals.css` (`@theme`). The palette is sampled from the logo: orange `#F3902D` is the only accent; the gear grey `#525457` sets the hue of the graphite surfaces (`base` `#111214` → `deep` → `panel` → `raised`). Text contrast on the base surface: ink 15.7:1, muted 7.7:1, subtle 5.4:1; form-control edges are at least 3:1.

- Type: Outfit (display), Geist (body), Geist Mono (small technical labels only).
- Shape: media and panels are square-cut; only buttons and inputs take the 2px radius.
- Photos share one desaturated grade (`.photo-grade`) so the full-colour assembly video stays the focal point. White-background catalogue renders get transparent cut-outs (`*-cutout.webp`) from `scripts/prepare-assets.mjs`.
- Motion is CSS plus one IntersectionObserver (`components/RevealOnScroll.tsx`); no animation library.
  - Hero intro on load: headline lines rise through a mask, copy and buttons follow, the photo settles from a slight crop (it is visible from the first frame, so LCP is not delayed).
  - Scroll reveals via `data-reveal`: `up` (fade and rise), `wipe` (photos uncover bottom-up), `frame` (the assembly video settles in before it plays), `rule` (application rows draw their hairline). Stagger with `style={delay(i)}` from `lib/motion.ts`.
  - Workshop stack: earlier cards scale back and darken as the next slides over them (CSS scroll-driven animation; plain sticky stack where unsupported).
  - Interaction: nav underline, arrow nudges on links, hover scale on media, the Featured Machinery accordion (xl and up), the pausable marquee, an animated mobile menu (`inert` while closed).
  - Content is never hidden without JS, and under `prefers-reduced-motion` nothing is hidden or animated.

Sections, in order: navigation, hero, assembly video, about, featured machinery, applications, workshop story, enquiry, footer.
