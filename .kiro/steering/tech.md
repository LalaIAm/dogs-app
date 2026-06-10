# Tech Stack

## Build System

- **Vite** — build tool and dev server
- **Node.js / npm** — package management

## Frontend

- **React.js** (^18.x) — JavaScript only, no TypeScript
- **Tailwind CSS v4** — uses `@theme` syntax in CSS (not JS config file)
- **@phosphor-icons/react** — icon library
- **Google Fonts** (CDN) — Fraunces, Space Mono, Reenie Beanie

## Testing

- **Cypress** — end-to-end testing, runs against Vite preview server on port 4173

## CI/CD

- **GitHub Actions** — build and test pipeline
- **cypress-io/github-action@v6** — Cypress integration for CI

## Design Tokens (Tailwind v4 @theme)

| Token | Value                    |
| ----- | ------------------------ |
| paper | #EAE7DC                  |
| ink   | #232323                  |
| rust  | #C8553D                  |
| sage  | #8E9C6D                  |
| sand  | #D8C3A5                  |
| tape  | rgba(255, 255, 235, 0.6) |

## Common Commands

```bash
# Development
npm run dev          # Start Vite dev server

# Build
npm run build        # Production build

# Preview built site
npm run preview      # Serve build on port 4173

# Testing
npm run cypress:open # Open Cypress GUI
npm run cypress:run  # Headless Cypress run
npm run test:e2e     # Build + serve + run Cypress

# Dependencies
npm ci               # Clean install (CI-friendly)
npm install          # Install/update dependencies
```
