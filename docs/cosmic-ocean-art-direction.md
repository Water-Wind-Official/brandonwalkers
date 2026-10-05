# Cosmic ocean art direction

The visual revision follows the requested direction: huge fluid waves, atmospheric color, and surreal horizons. The opening is a single immersive landscape, with the same blue light, sans serif typography, flowing dividers, and ocean imagery carried through the rest of the site. The existing small icon system is retained.

## Generated artwork

Generated using the built-in `image_gen` tool. The final artwork is optimized and stored inside the project:

- `public/images/cosmic-ocean.webp` — main landscape, 1672 × 941.
- `public/images/cosmic-ocean-mobile.webp` — smaller responsive version, 1200 × 675.
- `public/images/social-cover.png` — a browser-rendered social preview of the new design.

The original generation remains at `/home/brandonwalker/.codex/generated_images/01a10e49-f361-7721-b8af-a229de2f00b8/exec-37cab19b-3526-46de-95a2-0a529d8a3ffc.png`.

## Final generation prompt

> Use case: stylized-concept. Asset type: full-bleed cinematic website hero background for a personal creative developer portfolio. Create a breathtaking COSMIC OCEAN in an ultra-wide 16:9 landscape composition, high resolution. Viewpoint very low above a vast, sculptural, fluid extraterrestrial ocean. Huge translucent waves sweep from the lower left and lower right foreground toward a distant glowing central horizon, forming graceful flowing S curves. The waves look like real water infused with flowing luminous silver, electric cyan and icy turquoise caustics, pearlescent deep cobalt depths and subtle violet reflections. Far on the horizon a monumental pale blue luminous celestial crescent is partially submerged in the ocean, rising behind soft atmospheric haze. The upper half is a deep almost-black navy cosmic sky with fine sparse stars, soft blue atmospheric dust, and generous dark negative space in the upper center for live white website typography. The visual drama comes from intricate fluid detail and light along the lower half, not clutter. Elegant, otherworldly, immersive and tactile, a premium surreal CGI art direction with physically convincing reflective liquid, extreme depth, soft volumetric glow and controlled contrast. Composition: horizon around 55 percent down, bright flowing water in the bottom 40 percent, sky upper 50 percent quiet and dark; waves frame the center rather than obscure it. No planets with Saturn rings, no isolated floating balls, no spaceships, no people, no buildings, no chains, no logos, no words, no text, no UI, no borders, no watermark. This is a finished atmospheric landscape artwork, not a website mockup.

## Motion and fallbacks

`src/scripts/ocean.ts` adds a WebGL refraction layer to the original image. Movement is restricted to the water, with a small response to pointer movement and the “Ride the wave” control. Rendering stops when the scene is outside the viewport, the tab is hidden, or motion is paused. Reduced-motion preferences show the original still artwork. Unsupported WebGL and context loss also fall back to the image.

`src/styles/ocean.css` defines the shared art direction. The existing structural styles remain in `global.css`. `WaveDivider.astro` provides animated layers and flowing lines between sections.
