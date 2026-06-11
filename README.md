# RoadDoggs 🐾

**The Un-Map** — A road trip companion app for adventurous travelers who prefer off-the-beaten-path exploration over conventional navigation.

> "Get Lost (but like, on purpose)"

## About

RoadDoggs surfaces hidden gems, builds routes focused on the journey (not just the destination), and supports pack/community features for group road trips. The brand is anti-corporate, analog-inspired, and community-driven.

Currently in **beta vol.3** — building the marketing landing page as a single-page React app.

## Tech Stack

- **React 18** (JavaScript, no TypeScript)
- **Vite** — build tool and dev server
- **Tailwind CSS v4** — using `@theme` syntax
- **@phosphor-icons/react** — icon library
- **Google Fonts** — Fraunces, Space Mono, Reenie Beanie

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
git clone <repo-url>
cd dogs-app
npm install
```

### Development

```bash
npm run dev
```

Opens the app at [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

Serves the built app at [http://localhost:4173](http://localhost:4173).

## Testing

### End-to-End (Cypress)

Cypress tests run against the Vite preview server on port 4173.

```bash
# Open Cypress GUI
npm run cypress:open

# Headless run
npm run cypress:run

# Full pipeline: build → preview → run tests
npm run test:e2e
```

### Unit / Property Tests (Vitest)

```bash
npm run test
```

## Project Structure

```
dogs-app/
├── design/              # Reference HTML prototypes and mockup images
├── src/
│   ├── components/      # Page-specific section components
│   │   └── ui/          # Reusable UI primitives (Polaroid, PostItNote, etc.)
│   ├── pages/           # Page-level components
│   ├── hooks/           # Custom React hooks
│   ├── data/            # Static content/data files
│   ├── App.jsx          # Root component
│   └── index.css        # Tailwind v4 entry with @theme tokens
├── cypress/             # Cypress E2E tests
│   ├── e2e/             # Test specs
│   └── support/         # Support files
├── cypress.config.js    # Cypress config (baseUrl: localhost:4173)
├── index.html           # Vite HTML entry point
├── vite.config.js       # Vite config
└── package.json
```

## Design Tokens

| Token | Value                      |
| ----- | -------------------------- |
| paper | `#EAE7DC`                  |
| ink   | `#232323`                  |
| rust  | `#C8553D`                  |
| sage  | `#8E9C6D`                  |
| sand  | `#D8C3A5`                  |
| tape  | `rgba(255, 255, 235, 0.6)` |

## License

Private — not for redistribution.
