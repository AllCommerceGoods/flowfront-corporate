# FlowFront Global, corporate site

A single-page B2B site for a growth partner that buys brands' inventory at wholesale and grows it on Amazon. React + TypeScript + Vite, Tailwind, shadcn/ui primitives, Framer Motion. Same stack as the pet emporium site.

## Run

```bash
npm install
npm run dev      # http://localhost:8080
npm run build
```

## Design system

Generated with the ui-ux-pro-max skill: **Before-After Transformation** pattern, **Trust & Authority** style. Navy `#0F172A` + blue CTA `#0369A1` on near-white. Lexend headings, Source Sans 3 body, JetBrains Mono for the proof figures. Tokens live in `src/index.css`.

## Placeholders to fill in

- **Hero slider** (`src/pages/Index.tsx`, `Hero`): pass `beforeSrc` / `afterSrc` to `<BeforeAfterSlider>` with the real rebuilt listing screenshots.
- **Proof, Horse Amour** (`Proof`): swap the placeholder figures in the `proofStats` array (Best Sellers Rank, units per month, price recovery on the Apple variation), and pass real images to the listing `<BeforeAfterSlider>` plus the dated screenshot slots.
- **CTA** (`CTA`): replace the calendar embed placeholder with your scheduling embed (Calendly, Cal.com, or similar).

Drop image assets in `src/assets/` and import them, or in `public/` and reference by path.
