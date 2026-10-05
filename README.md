# Brandon Walker — Portfolio

A personal portfolio built with Astro, with an immersive cosmic ocean, subtle WebGL water refraction, animated wave dividers, and project artwork made in CSS. Typography, photographs, and the résumé are hosted locally.

## Development

```sh
npm install
npm run dev
```

The development server runs at `http://localhost:4321`.

```sh
npm run build    # Production build
npm run check    # Build, TypeScript, and Cloudflare deployment dry run
npm run preview # Preview with the Cloudflare runtime
```

## Editing content

- `src/data/portfolio.ts`: project descriptions, categories, links, and social profiles.
- `src/pages/index.astro`: homepage and selected projects.
- `src/pages/resume.astro`: résumé details, sourced from the supplied updated PDF.
- `public/documents/Brandon-Walker-Resume.pdf`: downloadable résumé.
- `src/pages/about.astro` and `interests.astro`: background and personal interests.
- `src/styles/global.css`: shared structural, responsive, and print styles.
- `src/styles/ocean.css`: cosmic ocean art direction and page composition.
- `src/scripts/ocean.ts`: water refraction with static and reduced-motion fallbacks.
- `docs/cosmic-ocean-art-direction.md`: artwork files, generation method, and final prompt.
- `src/scripts/site.ts`: navigation, project search/filtering, clipboard, and motion controls.

The work page supports shareable filters, for example `/work?category=Worlds`. All content and navigation remain usable without JavaScript. Animation honors reduced-motion preferences, and visitors can pause it using the footer control. The résumé page supports printing.

The support page links to the existing shop, community, and email. It does not collect payment information. The reference site's Stripe backend was not part of this Astro project.

The original Astro example posts are preserved as drafts and excluded from the public blog, generated routes, and RSS. Set `draft: false` when publishing a real article.

## Deployment

The existing Cloudflare Workers adapter and configuration are retained. The canonical production URL is `https://brandonwalkers.com`. Run `npm run deploy` when ready to publish to the configured Worker.
