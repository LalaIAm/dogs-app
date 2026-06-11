# Implementation Plan: GitHub Actions CI Pipeline

## Overview

Create a single GitHub Actions workflow file at `.github/workflows/ci.yml` that runs build verification, unit/property tests (Vitest), and end-to-end tests (Cypress) on every push and pull request to the `main` branch. The workflow uses a single-job architecture on `ubuntu-latest` with Node.js 20, leveraging caching for npm and Cypress binaries.

## Tasks

- [x] 1. Create CI workflow file with trigger configuration and environment setup
  - [x] 1.1 Create `.github/workflows/ci.yml` with workflow name, trigger config, and job setup
    - Create the workflow file with `name: CI`
    - Configure `on: push` and `on: pull_request` triggers for the `main` branch
    - Define `build-and-test` job with `runs-on: ubuntu-latest`
    - Add `actions/checkout@v4` as the first step
    - Add `actions/setup-node@v4` with `node-version: 20` and `cache: 'npm'`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 9.1_

  - [x] 1.2 Add Cypress binary caching step
    - Add `actions/cache@v4` step to cache `~/.cache/Cypress`
    - Use cache key: `cypress-${{ runner.os }}-${{ hashFiles('package-lock.json') }}`
    - _Requirements: 9.2, 9.3, 9.4_

  - [x] 1.3 Add dependency installation step
    - Add `npm ci` step after caching is configured
    - Ensure this step runs before any build or test steps
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 2. Add build and test execution steps
  - [x] 2.1 Add build verification step
    - Add `npm run build` step after dependency installation
    - Ensure this step completes before E2E tests run
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 2.2 Add Vitest unit and property test step with coverage
    - Add step running `npm run test -- --coverage --coverage.reporter=lcov --coverage.reporter=text`
    - This produces a `coverage/` directory and text summary in the log
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 7.1, 7.2, 7.3, 7.4_

  - [x] 2.3 Add Cypress E2E test step using `cypress-io/github-action@v6`
    - Configure with `install: false` (dependencies already installed)
    - Set `start: npm run preview` to launch Vite preview server
    - Set `wait-on: 'http://localhost:4173'` with `wait-on-timeout: 60`
    - Use default `browser: electron` for headless execution
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 3. Add artifact upload steps with conditional execution
  - [x] 3.1 Add failure artifact upload for Cypress screenshots
    - Add `actions/upload-artifact@v4` step with `if: failure()`
    - Upload `cypress/screenshots` with name `cypress-screenshots`
    - Set `retention-days: 7`
    - _Requirements: 6.1, 6.3, 6.4_

  - [x] 3.2 Add failure artifact upload for Cypress videos
    - Add `actions/upload-artifact@v4` step with `if: failure()`
    - Upload `cypress/videos` with name `cypress-videos`
    - Set `retention-days: 7`
    - _Requirements: 6.2, 6.3, 6.4_

  - [x] 3.3 Add coverage report artifact upload
    - Add `actions/upload-artifact@v4` step with `if: always()`
    - Upload `coverage/` directory with name `coverage-report`
    - Set `retention-days: 14`
    - _Requirements: 8.1, 8.2, 8.3, 8.5_

- [x] 4. Final checkpoint
  - Ensure the workflow YAML is syntactically valid.
  - Verify all steps are ordered correctly: checkout → setup-node → cache → npm ci → build → vitest → cypress → artifacts.
  - Confirm all requirement references are covered.
  - Ask the user if questions arise.

## Notes

- This feature produces a single file: `.github/workflows/ci.yml`
- No property-based tests are applicable — this is declarative infrastructure configuration (YAML)
- Verification is done by pushing the file and observing GitHub Actions behavior
- Each task references specific requirements for traceability
- The checkpoint ensures the complete workflow is wired together correctly before finalizing

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2"] },
    { "id": 2, "tasks": ["1.3"] },
    { "id": 3, "tasks": ["2.1"] },
    { "id": 4, "tasks": ["2.2", "2.3"] },
    { "id": 5, "tasks": ["3.1", "3.2", "3.3"] }
  ]
}
```
