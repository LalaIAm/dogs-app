# Implementation Plan: RoadDoggs Landing Page

## Overview

Build the RoadDoggs landing page as a React.js SPA using Vite + Tailwind CSS v4. Implementation proceeds from project scaffolding → design system → reusable UI components → section components → parallax system → final integration.

## Tasks

- [x] 1. Scaffold Vite + React + Tailwind v4 project
  - [x] 1.1 Initialize Vite project with React template (JavaScript)
    - Run `npm create vite@latest . -- --template react` in the project root
    - Install dependencies: `react`, `react-dom`, `@phosphor-icons/react`
    - Install dev dependencies: `tailwindcss@4`, `@tailwindcss/vite`
    - Configure `vite.config.js` with the Tailwind v4 Vite plugin
    - _Requirements: 1.1, 1.4_

  - [x] 1.2 Configure Tailwind v4 design tokens and global styles
    - Create `src/index.css` with `@import "tailwindcss"` and `@theme` block
    - Define color tokens: paper (#EAE7DC), ink (#232323), rust (#C8553D), sage (#8E9C6D), sand (#D8C3A5), tape (rgba(255,255,235,0.6))
    - Define font families: serif (Fraunces), mono (Space Mono), hand (Reenie Beanie)
    - Define keyframes: drift animation (15s ease-in-out infinite, translateY + rotate)
    - Add custom utility styles: scribble-underline, tape effect, film-look filter, noise-layer, custom scrollbar
    - Add Google Fonts `<link>` tags with preconnect to `index.html`
    - _Requirements: 1.2, 1.3_

  - [x] 1.3 Set up project structure and static data files
    - Create directory structure: `src/components/`, `src/components/ui/`, `src/pages/`, `src/hooks/`, `src/data/`
    - Create `src/data/landingContent.js` with all static content arrays: manifestoItems, reviews, techFeatures, blogPosts, brands, features
    - _Requirements: 1.1_

- [ ] 2. Implement reusable UI components
  - [x] 2.1 Create NoiseOverlay component
    - Fixed full-viewport div with noise SVG background, 8% opacity, pointer-events-none, z-9999
    - _Requirements: 2.3, 15_

  - [x] 2.2 Create Polaroid component
    - Accept props: src, caption, rotation, tapePosition, className, speed
    - Render white-bordered frame with tape decoration, image with film-look filter, handwritten caption
    - Apply `data-speed` attribute for parallax
    - Image transitions from grayscale/sepia to full color on hover (500ms)
    - _Requirements: 15.1, 4.7_

  - [x] 2.3 Create PostItNote component
    - Accept props: children, rotation, speed
    - Yellow (#fff9c4) background, pin circle decoration, handwritten content
    - Apply `data-speed` attribute for parallax
    - _Requirements: 15.2_

  - [x] 2.4 Create NoteCard component
    - Accept props: children, rotation, speed, cta (optional)
    - Sand background, thumbtack circle, quote text, optional CTA button
    - Apply `data-speed` attribute for parallax
    - _Requirements: 15.3_

  - [~] 2.5 Create ReviewCard component
    - Accept props: variant ('receipt' | 'napkin' | 'polaroid'), quote, author, meta, image, speed
    - Implement three visual variants: receipt (dotted border, thumbtack hole), napkin (tape, handwritten), polaroid (photo frame, sepia)
    - Hover rotation reset to 0deg with transition
    - _Requirements: 15.4, 8.4_

  - [x] 2.6 Create FeatureCard component
    - Accept props: icon, title, description, tag, shadowColor, children
    - Render offset shadow/border layer that reduces offset on hover (4px → 2px transition)
    - _Requirements: 15.5, 9.3_

  - [x] 2.7 Create TechFeature component
    - Accept props: icon, title, description, iconColor
    - Left border separator, Phosphor icon with scale-110 on hover, mono title, description
    - _Requirements: 15.6, 10.3_

  - [ ] 2.8 Create BlogCard component
    - Accept props: variant ('image' | 'quote' | 'guide'), title, image, date, excerpt, items
    - Implement three variants: image (photo + title + date), quote (rust bg, large text), guide (sage tint, bullet list)
    - Tape decoration, rotation, hover-to-level transition
    - _Requirements: 15.7, 12.3, 12.4_

- [ ] 3. Implement the useParallax hook
  - [ ] 3.1 Create src/hooks/useParallax.js
    - On mount: attach scroll event listener
    - On scroll: use requestAnimationFrame for throttled updates
    - Query all elements with `[data-speed]` attribute
    - Calculate translateY: `scrollY * speed`
    - Calculate rotation: `scrollY * 0.01 * speed * 10`
    - Apply via `translate3d(0, ${translateY}px, 0) rotate(${rotation}deg)` for GPU acceleration
    - Only update elements within viewport (top < windowHeight + 100 AND bottom > -100)
    - On unmount: remove scroll listener, cancel any pending animation frame
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ] 3.2 Write property tests for useParallax calculations
    - **Property 1: Parallax Transform Calculation Consistency**
    - For any (scrollY, speed) pair, verify translateY = scrollY _ speed and rotation = scrollY _ 0.01 _ speed _ 10
    - **Property 2: Viewport Culling Correctness**
    - For any (elementTop, elementBottom, windowHeight), verify update condition matches `top < windowHeight + 100 AND bottom > -100`
    - **Validates: Requirements 5.2, 5.3, 5.5**

- [ ] 4. Implement section components (Part 1)
  - [ ] 4.1 Create Navbar component
    - Fixed top, z-50, mix-blend-difference, paper text
    - "RoadDoggs" logo (Fraunces) + "beta vol.3" handwritten tag (rotate on hover)
    - "[ LOG IN ]" button with hover color transition
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ] 4.2 Create HeroSection component
    - Min-height 110vh, centered layout
    - Floating background text at 10% opacity with rotation
    - "/// coordinates_unknown" mono label
    - "GET LOST" headline with text-stroke on "LOST"
    - SVG scribble arrow + "(but like, on purpose)" annotation
    - Parallax collage with 5 elements using Polaroid, PostItNote, NoteCard components
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ] 4.3 Create ManifestoSection component
    - "The Anti-Grid Manifesto." heading (italic rust "Manifesto.")
    - 2-column grid on md, single on mobile
    - Render manifestoItems from data file with numbered labels
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ] 4.4 Create SmartPoiSection component
    - Dark ink background with sage grid overlay (10% opacity)
    - 2-column layout: text (status indicator, heading, feature descriptions) + radar visual
    - Radar: concentric circles, ping animation (3s), "Giant Artichoke" found card with connector
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 5. Checkpoint
  - Ensure all components render correctly, verify parallax hook works with data-speed elements, ask the user if questions arise.

- [ ] 6. Implement section components (Part 2)
  - [ ] 6.1 Create SocialProofSection component
    - Header: "Word on the street" (hand) + "The Co-Pilot Reports." (serif)
    - Star rating stamp (4.9/5) with rotation that levels on hover
    - 3-column grid of ReviewCard components rendered from reviews data
    - Brand bar with 4 publication names (grayscale, 50% opacity)
    - _Requirements: 8.1, 8.2, 8.3, 8.5_

  - [ ] 6.2 Create FeaturesSection component
    - "Tools for Drift." heading + "Curated Vibes" handwritten accent
    - 2-column grid of FeatureCard components (Route Painter + Pack Planning)
    - Include mock visuals as children content
    - _Requirements: 9.1, 9.2, 9.4_

  - [ ] 6.3 Create TechCapabilitiesSection component
    - Dark ink background, white grid overlay (10% opacity)
    - Header: "Under the Hood" + hand-drawn arrow annotation
    - 3-column grid rendering TechFeature components from techFeatures data
    - _Requirements: 10.1, 10.2, 10.4_

  - [ ] 6.4 Create CtaSection component
    - Rust background with noise overlay and decorative SVG dashed curve
    - "Limited Beta Access // Vol. 3" badge pill (rotation, hover level)
    - "Don't just drive. Roam." headline
    - Primary button with 6px shadow offset that collapses on hover
    - Secondary text link
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [ ] 6.5 Create FieldNotesSection component
    - "Field Notes" heading with handwritten accent
    - CSS columns masonry layout (1 col mobile, 3 col desktop)
    - Render BlogCard components from blogPosts data
    - _Requirements: 12.1, 12.2_

  - [ ] 6.6 Create Footer component
    - Dark ink background, rust top border
    - Left column: giant "GO." text, tagline, download button, handwritten note
    - Right column: nav links grid, social icons, copyright with current year
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [ ] 7. Integrate and finalize
  - [ ] 7.1 Create LandingPage.jsx page component
    - Compose all sections in exact order: Navbar, Hero, Manifesto, SmartPoi, SocialProof, Features, TechCapabilities, CTA, FieldNotes, Footer
    - Apply global container styles: `text-ink antialiased overflow-x-hidden selection:bg-rust selection:text-white`
    - Render NoiseOverlay
    - Call useParallax hook
    - _Requirements: 2.1, 2.2, 14.4_

  - [ ] 7.2 Update App.jsx to render LandingPage
    - Import and render LandingPage component
    - Ensure clean entry point with no extra wrappers
    - _Requirements: 2.1_

  - [ ] 7.3 Responsive design verification and adjustments
    - Verify all grids switch from multi-column to single-column below md (768px)
    - Verify decorative elements hide/resize on mobile
    - Verify hero headline scales from 15vw to 8rem at breakpoint
    - Adjust any overflow or positioning issues
    - _Requirements: 14.1, 14.2, 14.3_

- [ ] 8. Final checkpoint
  - Ensure all sections render correctly, parallax effects work smoothly, responsive layout adapts properly, and no console errors. Ask the user if questions arise.

- [ ] 9. Set up Cypress testing
  - [ ] 9.1 Install and configure Cypress
    - Install cypress as dev dependency: `npm install -D cypress`
    - Create `cypress.config.js` with baseUrl pointing to Vite preview server (`http://localhost:4173`)
    - Create `cypress/support/e2e.js` and `cypress/support/commands.js`
    - Add npm scripts: `"cypress:open": "cypress open"`, `"cypress:run": "cypress run"`, `"test:e2e": "npm run build && npx start-server-and-test preview http://localhost:4173 cypress:run"`
    - _Requirements: 16.1_

  - [ ] 9.2 Write section rendering tests
    - Create `cypress/e2e/sections.cy.js`
    - Test that all 10 sections are present in the DOM in correct order
    - Test Navbar is fixed and visible
    - Test Hero section headline text content
    - Test each section has expected key content
    - _Requirements: 16.2_

  - [ ] 9.3 Write parallax and interaction tests
    - Create `cypress/e2e/interactions.cy.js`
    - Test that `data-speed` elements exist
    - Test scroll triggers transform changes on parallax elements
    - Test hover on film-look images changes filter
    - Test hover on review cards resets rotation
    - Test hover on feature cards changes shadow offset
    - _Requirements: 16.3, 16.4_

  - [ ] 9.4 Write responsive layout tests
    - Create `cypress/e2e/responsive.cy.js`
    - Test mobile viewport (375px): grids are single column
    - Test desktop viewport (1280px): grids are multi-column
    - Test hero headline size changes between viewports
    - Test no horizontal overflow on mobile
    - _Requirements: 16.5_

  - [ ] 9.5 Write smoke test
    - Create `cypress/e2e/smoke.cy.js`
    - Test page loads without uncaught exceptions
    - Test no console errors
    - Test all images have valid src attributes
    - Test noise overlay is present with correct z-index
    - _Requirements: 16.6_

- [ ] 10. Set up GitHub Actions CI pipeline
  - [ ] 10.1 Create GitHub Actions workflow
    - Create `.github/workflows/ci.yml`
    - Trigger on push to `main` and pull requests targeting `main`
    - Node.js setup with dependency caching
    - Install dependencies with `npm ci`, build project with `npm run build`
    - Start Vite preview server, run Cypress in headless mode
    - Use `cypress-io/github-action@v6` for running tests
    - _Requirements: 17.1, 17.2, 17.3, 17.4_

## Task Dependency Graph

```json
{
  "waves": [
    {
      "name": "Foundation",
      "tasks": ["1.1", "1.2", "1.3"]
    },
    {
      "name": "Components & Hook",
      "tasks": [
        "2.1",
        "2.2",
        "2.3",
        "2.4",
        "2.5",
        "2.6",
        "2.7",
        "2.8",
        "3.1",
        "3.2"
      ],
      "dependsOn": ["1.1", "1.2", "1.3"]
    },
    {
      "name": "Sections Part 1",
      "tasks": ["4.1", "4.2", "4.3", "4.4"],
      "dependsOn": [
        "2.1",
        "2.2",
        "2.3",
        "2.4",
        "2.5",
        "2.6",
        "2.7",
        "2.8",
        "3.1"
      ]
    },
    {
      "name": "Checkpoint 1",
      "tasks": ["5"],
      "dependsOn": ["4.1", "4.2", "4.3", "4.4"]
    },
    {
      "name": "Sections Part 2",
      "tasks": ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6"],
      "dependsOn": ["5"]
    },
    {
      "name": "Integration",
      "tasks": ["7.1", "7.2", "7.3"],
      "dependsOn": ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6"]
    },
    {
      "name": "Final Checkpoint",
      "tasks": ["8"],
      "dependsOn": ["7.1", "7.2", "7.3"]
    },
    {
      "name": "Testing",
      "tasks": ["9.1", "9.2", "9.3", "9.4", "9.5"],
      "dependsOn": ["7.1", "7.2", "7.3"]
    },
    {
      "name": "CI/CD",
      "tasks": ["10.1"],
      "dependsOn": ["9.1"]
    }
  ]
}
```

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The project uses React.js with JavaScript (no TypeScript)
- Tailwind CSS v4 uses the new `@theme` syntax in CSS rather than a JS config file
- All images use Unsplash URLs with `w=800&q=80` params from the prototype
- Property tests cover the parallax calculation logic which is the only pure-function domain in this UI-focused project
- Cypress E2E tests run against the Vite preview server (`http://localhost:4173`) after `npm run build`
- The CI pipeline uses `cypress-io/github-action@v6` which handles starting the server and running tests
