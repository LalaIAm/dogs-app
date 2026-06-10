---
inclusion: always
---

# Project Structure & Conventions

## Directory Layout

```
dogs-app/
├── .kiro/
│   ├── specs/                    # Feature specs (requirements, design, tasks)
│   └── steering/                 # AI steering rules
├── design/                       # Reference HTML prototypes and mockup images
│   ├── *.html                    # Interactive HTML prototypes per screen
│   └── *.jpg                     # Visual mockup screenshots
├── src/
│   ├── components/               # Page-specific section components
│   │   └── ui/                   # Reusable UI primitives (Polaroid, PostItNote, etc.)
│   ├── pages/                    # Page-level components (LandingPage.jsx)
│   ├── hooks/                    # Custom React hooks
│   ├── data/                     # Static content/data files
│   ├── App.jsx                   # Root component
│   └── index.css                 # Tailwind v4 entry with @theme tokens
├── cypress/
│   ├── e2e/                      # E2E test specs
│   ├── support/                  # Cypress support files
│   └── fixtures/                 # Test data
├── .github/
│   └── workflows/ci.yml          # GitHub Actions pipeline
├── index.html                    # Vite HTML entry point
├── vite.config.js                # Vite config
├── cypress.config.js             # Cypress config
└── package.json
```

## File & Component Conventions

- One React component per file, PascalCase filenames (e.g., `HeroSection.jsx`)
- All files are `.jsx` — no TypeScript in this project
- Export components as named exports; one default export per page component

## Component Organization

| Location             | Purpose                                                            | Example                                  |
| -------------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| `src/components/ui/` | Generic, reusable UI primitives                                    | `Polaroid.jsx`, `PostItNote.jsx`         |
| `src/components/`    | Page-specific full-width sections                                  | `HeroSection.jsx`, `FeaturesSection.jsx` |
| `src/pages/`         | Top-level page components that compose sections                    | `LandingPage.jsx`                        |
| `src/hooks/`         | Custom hooks, prefixed with `use`                                  | `useParallax.js`                         |
| `src/data/`          | Static content arrays/objects, keep components free of inline copy | `landingContent.js`                      |

## Architecture Rules

- Keep components presentational — extract static text/content into `src/data/` files
- Parallax-enabled elements use a `data-speed` attribute for scroll-rate configuration
- Prefer composition over prop drilling; break large sections into sub-components in `ui/`
- No external state management library — use React state and context only

## Design Prototypes

The `design/` folder is the visual source of truth. When implementing a screen:

1. Reference the corresponding `.html` prototype for layout, structure, and interactions
2. Reference the `.jpg` mockup for visual fidelity (colors, spacing, typography)
3. Match the prototype's DOM structure closely, translating to React components and Tailwind classes

## Testing Conventions

- E2E tests go in `cypress/e2e/`, one spec file per feature or page
- Test filenames use kebab-case matching the feature (e.g., `landing-page.cy.js`)
- Tests run against the Vite preview server on port 4173
