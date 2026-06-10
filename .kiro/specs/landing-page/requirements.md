# Requirements Document

## Introduction

This document defines the requirements for the RoadDoggs landing page — a single-page marketing site with a scrapbook/analog aesthetic built as a React.js SPA. The page communicates the brand's adventure-first identity through parallax effects, film-grain filters, paper textures, and handwritten visual metaphors across 10 distinct sections.

## Glossary

- **Landing_Page**: The single-page React application comprising all marketing sections
- **Parallax_System**: The scroll-driven animation system that translates elements at varying speeds based on `data-speed` attributes
- **Noise_Overlay**: A fixed full-viewport SVG texture layer providing analog grain effect
- **Film_Look_Filter**: A CSS filter combination (contrast, brightness, sepia, grayscale) applied to images for analog appearance
- **Design_Tokens**: The Tailwind CSS v4 theme values (colors, fonts, animations) defining the visual system
- **Section_Component**: A top-level React component representing one full-width page section
- **Parallax_Element**: Any DOM element with a `data-speed` attribute that moves at a scroll-relative rate
- **Collage_Item**: A positioned element within the hero section (polaroid, post-it, or note card)

## Requirements

### Requirement 1: Project Foundation

**User Story:** As a developer, I want a properly scaffolded Vite + React + Tailwind v4 project with the design system configured, so that I can build components against a consistent visual foundation.

#### Acceptance Criteria

1. THE Landing_Page SHALL be built using Vite as the build tool with React.js (JavaScript, no TypeScript)
2. THE Landing_Page SHALL use Tailwind CSS v4 with design tokens for colors (paper, ink, rust, sage, sand, tape), font families (serif: Fraunces, mono: Space Mono, hand: Reenie Beanie), and keyframe animations (drift)
3. THE Landing_Page SHALL load Google Fonts (Fraunces, Space Mono, Reenie Beanie) with preconnect hints for fonts.googleapis.com and fonts.gstatic.com
4. THE Landing_Page SHALL use @phosphor-icons/react for all iconography

### Requirement 2: Page Structure and Section Ordering

**User Story:** As a visitor, I want to experience a coherent narrative flow through the landing page sections, so that I understand the product's value proposition progressively.

#### Acceptance Criteria

1. THE Landing_Page SHALL render a minimum of 10 core sections in this order: Navbar, HeroSection, ManifestoSection, SmartPoiSection, SocialProofSection, FeaturesSection, TechCapabilitiesSection, CtaSection, FieldNotesSection, Footer; additional promotional sections (e.g., announcement banners, A/B test variants) MAY be inserted above or between core sections
2. THE Landing_Page SHALL apply the global styles: `text-ink antialiased overflow-x-hidden selection:bg-rust selection:text-white` to the page container
3. THE Noise_Overlay SHALL render as a fixed full-viewport element with noise SVG background at 8% opacity, pointer-events none, and z-index 9999

### Requirement 3: Navigation Bar

**User Story:** As a visitor, I want a persistent navigation bar visible over all content, so that I can always access the logo and login action.

#### Acceptance Criteria

1. THE Navbar SHALL be fixed to the top of the viewport with z-index 50
2. THE Navbar SHALL use `mix-blend-difference` with paper-colored text to remain visible over varied section backgrounds
3. THE Navbar SHALL display the "RoadDoggs" logo in Fraunces serif font with a "beta vol.3" handwritten tag that rotates to 0deg on hover
4. THE Navbar SHALL display a "[ LOG IN ]" button styled with mono font, uppercase, that transitions to rust background with white text on hover

### Requirement 4: Hero Section

**User Story:** As a visitor, I want to see an impactful hero section with a collage of parallax elements, so that I immediately understand the brand's adventurous, analog identity.

#### Acceptance Criteria

1. THE HeroSection SHALL have a minimum height of 110vh with top padding of 32 units
2. THE HeroSection SHALL display floating background text ("Are we there yet?" and "No Signal. Good.") at 10% ink opacity with rotation
3. THE HeroSection SHALL display the "/// coordinates_unknown" label in mono font, rust color, with 0.3em letter-spacing
4. THE HeroSection SHALL render "GET LOST" as the main headline where "LOST" uses a 2px text-stroke outline with transparent fill
5. THE HeroSection SHALL include a hand-drawn SVG arrow with the annotation "(but like, on purpose)" in handwritten font
6. THE HeroSection SHALL render a parallax collage containing 5 elements: center polaroid (speed 0.02), left polaroid (speed 0.06), dog polaroid (speed 0.09), post-it note (speed 0.04), and note card (speed 0.08)
7. WHEN a user hovers over a film-look image THEN THE HeroSection SHALL transition the image from grayscale/sepia filters to full color over 500ms

### Requirement 5: Parallax Scroll System

**User Story:** As a visitor, I want smooth parallax scrolling effects on collage elements, so that the page feels dynamic and layered like a physical scrapbook.

#### Acceptance Criteria

1. THE Parallax_System SHALL use requestAnimationFrame to throttle scroll-based transform updates to a maximum of 60fps
2. THE Parallax_System SHALL calculate translateY as `scrollY * speed` for each Parallax_Element where speed comes from the element's `data-speed` attribute
3. THE Parallax_System SHALL apply a subtle rotation of `scrollY * 0.01 * speed * 10` degrees to each Parallax_Element
4. THE Parallax_System SHALL use translate3d for GPU-accelerated compositing on all Parallax_Elements
5. THE Parallax_System SHALL only update transforms for elements whose bounding rect satisfies `top < windowHeight + 100` AND `bottom > -100`, including elements with zero height (where top equals bottom)
6. WHEN the component unmounts THEN THE Parallax_System SHALL remove the scroll event listener

### Requirement 6: Manifesto Section

**User Story:** As a visitor, I want to read the brand manifesto, so that I understand how RoadDoggs differs from conventional navigation apps.

#### Acceptance Criteria

1. THE ManifestoSection SHALL display "The Anti-Grid Manifesto." as heading with the word "Manifesto." in italic rust color
2. THE ManifestoSection SHALL render manifesto items in a 2-column grid on desktop (md breakpoint) and single column on mobile
3. THE ManifestoSection SHALL display each item with a numbered label (mono font) and description text (gray-600 color)

### Requirement 7: Smart POI Section

**User Story:** As a visitor, I want to see the Smart POI discovery feature visualized, so that I understand the app's unique ability to find off-the-beaten-path locations.

#### Acceptance Criteria

1. THE SmartPoiSection SHALL use a dark (ink-colored) background with a sage-colored grid overlay at 10% opacity
2. THE SmartPoiSection SHALL display a 2-column layout on desktop: text content on left, radar visual on right
3. THE SmartPoiSection SHALL show an algorithm status indicator with a pulsing rust-colored dot and "Algorithm v2.4 Active" label
4. THE SmartPoiSection SHALL render a radar visual with concentric circles and a ping animation (3-second duration) on the inner ring
5. THE SmartPoiSection SHALL display a "found" card (paper-colored with "Giant Artichoke" title) connected to the radar center by a vertical rust line and dot

### Requirement 8: Social Proof Section

**User Story:** As a visitor, I want to see authentic-looking user testimonials, so that I trust the product through social proof.

#### Acceptance Criteria

1. THE SocialProofSection SHALL display a header with "Word on the street" in handwritten font and "The Co-Pilot Reports." in serif font
2. THE SocialProofSection SHALL show a 4.9/5 star rating stamp with rust color and rotation that levels on hover
3. THE SocialProofSection SHALL render 3 review cards in a 3-column grid on desktop: receipt style, napkin style, and polaroid style
4. WHEN a user hovers over a review card THEN THE SocialProofSection SHALL transition the card rotation to 0deg independently for each hovered card; cards SHALL also change rotation automatically without user interaction
5. THE SocialProofSection SHALL display a brand bar with 4 publication names styled in grayscale at 50% opacity

### Requirement 9: Features Section

**User Story:** As a visitor, I want to see the key product features, so that I understand what tools are available.

#### Acceptance Criteria

1. THE FeaturesSection SHALL display "Tools for Drift." as heading with "Curated Vibes" handwritten accent
2. THE FeaturesSection SHALL render 2 feature cards in a 2-column grid on desktop
3. WHEN a user hovers over a feature card THEN THE FeatureCard SHALL reduce its shadow/border offset from 4px to 2px with a CSS transition
4. THE FeatureCard SHALL display a Phosphor icon, a release tag badge, title, description, and optional child content

### Requirement 10: Tech Capabilities Section

**User Story:** As a visitor, I want to understand the technical capabilities, so that I appreciate the engineering behind the product.

#### Acceptance Criteria

1. THE TechCapabilitiesSection SHALL use a dark (ink-colored) background with a white grid overlay at 10% opacity
2. THE TechCapabilitiesSection SHALL display 3 tech features in a 3-column grid on desktop with left border separators
3. WHEN a user hovers over a tech feature icon THEN THE TechFeature SHALL scale the icon to 110% with a CSS transition
4. THE TechFeature SHALL display a Phosphor icon, mono-styled title, and description text in paper/60 opacity

### Requirement 11: Call-to-Action Section

**User Story:** As a visitor, I want a compelling call-to-action, so that I'm motivated to sign up for the beta.

#### Acceptance Criteria

1. THE CtaSection SHALL use a rust-colored background with noise overlay and a decorative SVG dashed curve
2. THE CtaSection SHALL display a "Limited Beta Access // Vol. 3" badge pill with rotation that levels on hover
3. THE CtaSection SHALL display "Don't just drive. Roam." as the main headline
4. THE CtaSection SHALL render a primary button with a 6px solid shadow offset that collapses on hover (translate + shadow removal)

### Requirement 12: Field Notes Section

**User Story:** As a visitor, I want to browse blog-style field notes, so that I see ongoing content and community engagement.

#### Acceptance Criteria

1. THE FieldNotesSection SHALL display "Field Notes" heading with handwritten accent
2. THE FieldNotesSection SHALL render blog cards in a CSS columns-based masonry layout (1 column mobile, 3 columns desktop)
3. THE BlogCard SHALL support three variants: image (photo + title + date), quote (rust background, large text), and guide (sage-tinted, bullet list)
4. WHEN a user hovers over a blog card THEN THE BlogCard SHALL transition its rotation to 0deg

### Requirement 13: Footer

**User Story:** As a visitor, I want a footer with navigation and download options, so that I can explore further or take action.

#### Acceptance Criteria

1. THE Footer SHALL use a dark (ink-colored) background with a rust top border
2. THE Footer SHALL display a large "GO." text in the left column with a tagline and download button
3. THE Footer SHALL display navigation links in a grid and social icon links in the right column
4. THE Footer SHALL include copyright text with the current year

### Requirement 14: Responsive Design

**User Story:** As a visitor on any device, I want the page to adapt to my viewport, so that I have a good experience on both mobile and desktop.

#### Acceptance Criteria

1. THE Landing_Page SHALL use Tailwind's `md:` (768px) breakpoint to switch layouts from single-column mobile to multi-column desktop
2. THE Landing_Page SHALL hide or resize decorative elements (scribble arrows, hand-drawn annotations) on viewports below 768px
3. THE Landing_Page SHALL scale the hero headline from 15vw on mobile to 8rem on desktop
4. THE Landing_Page SHALL set `overflow-x: hidden` on the page container to prevent horizontal scroll from positioned elements

### Requirement 15: Reusable UI Components

**User Story:** As a developer, I want reusable UI primitives (Polaroid, PostItNote, NoteCard, ReviewCard, FeatureCard, TechFeature, BlogCard), so that I can compose sections from consistent building blocks.

#### Acceptance Criteria

1. THE Polaroid component SHALL accept props for src, caption, rotation, tapePosition, className, and speed
2. THE PostItNote component SHALL render a yellow (#fff9c4) background with a pin decoration and accept children and rotation/speed props
3. THE NoteCard component SHALL render a sand-colored background with a thumbtack decoration and accept children, rotation, speed, and optional CTA props
4. THE ReviewCard component SHALL accept a variant prop ('receipt', 'napkin', or 'polaroid') and render the corresponding scrapbook style
5. THE FeatureCard component SHALL render an offset shadow layer that animates on hover and accept icon, title, description, tag, shadowColor, and children props
6. THE TechFeature component SHALL accept icon, title, description, and iconColor props with icon scale animation on hover
7. THE BlogCard component SHALL accept a variant prop ('image', 'quote', or 'guide') and render the corresponding field notes style

### Requirement 16: End-to-End Testing with Cypress

**User Story:** As a developer, I want automated end-to-end tests using Cypress, so that I can verify the landing page renders and behaves correctly across all sections and interactions.

#### Acceptance Criteria

1. THE project SHALL have Cypress installed and configured with `baseUrl` pointing to the Vite preview server (port 4173)
2. THE Cypress test suite SHALL verify that all 10 sections render correctly in the DOM in the correct order
3. THE Cypress test suite SHALL verify parallax scroll behavior by confirming elements with `data-speed` attributes exist and that their transforms update on scroll
4. THE Cypress test suite SHALL verify hover interactions including filter transitions on film-look images, rotation resets on review cards, and shadow offset changes on feature cards
5. THE Cypress test suite SHALL verify responsive layout by switching viewports between mobile (375px) and desktop (1280px) and confirming grid column changes
6. THE Cypress test suite SHALL include a visual smoke test verifying the page loads without uncaught exceptions or console errors

### Requirement 17: CI/CD Pipeline

**User Story:** As a developer, I want a GitHub Actions CI pipeline that automatically builds and tests the project, so that regressions are caught before code is merged.

#### Acceptance Criteria

1. THE GitHub Actions workflow SHALL trigger on push to the `main` branch and on pull requests targeting `main`
2. THE GitHub Actions workflow SHALL install dependencies, build the project, and run the Cypress E2E test suite
3. THE Cypress tests SHALL run in headless mode against the built Vite preview server within the CI environment
4. THE GitHub Actions workflow SHALL always report test results when tests are running and SHALL fail the pipeline on any test failure
