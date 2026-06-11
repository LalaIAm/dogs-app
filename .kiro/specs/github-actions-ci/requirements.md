# Requirements Document

## Introduction

This feature establishes a GitHub Actions CI pipeline for the RoadDoggs project that automatically runs the test suite on every push and pull request. The pipeline ensures code quality by running both unit/property tests (Vitest) and end-to-end tests (Cypress) in a headless environment, providing fast feedback to contributors before changes are merged.

## Glossary

- **CI_Pipeline**: The GitHub Actions workflow defined in `.github/workflows/ci.yml` that orchestrates automated build and test steps.
- **Vitest_Runner**: The test runner that executes unit and property-based tests via `npm run test`.
- **Cypress_Runner**: The end-to-end test runner that executes Cypress tests in headless mode against the built application using the `cypress-io/github-action@v6` action.
- **Trigger_Event**: A GitHub event (push or pull request) that initiates the CI_Pipeline.
- **Build_Step**: The step that installs dependencies and builds the production bundle via `npm run build`.
- **Artifact**: A CI output (screenshots, videos, reports) produced by the CI_Pipeline for debugging or review purposes.
- **Coverage_Report**: A code coverage report generated during test execution that measures which lines, branches, and functions were exercised by the test suite.

## Requirements

### Requirement 1: Pipeline Trigger Configuration

**User Story:** As a developer, I want the CI pipeline to run automatically on pushes and pull requests to the main branch, so that every change is validated before merging.

#### Acceptance Criteria

1. WHEN a push event occurs on the main branch, THE CI_Pipeline SHALL execute the full test workflow.
2. WHEN a pull request is opened, synchronized, or reopened targeting the main branch, THE CI_Pipeline SHALL execute the full test workflow regardless of Node.js version configuration.
3. THE CI_Pipeline SHALL use the latest available Ubuntu runner operating system.
4. THE CI_Pipeline SHALL use Node.js version 20 for all steps.

### Requirement 2: Dependency Installation

**User Story:** As a developer, I want the pipeline to install dependencies reliably, so that builds are reproducible across CI runs.

#### Acceptance Criteria

1. THE CI_Pipeline SHALL install dependencies using `npm ci` to ensure a clean, reproducible install from the lockfile.
2. THE CI_Pipeline SHALL complete dependency installation before executing build or test steps.
3. WHEN `npm ci` fails, THE CI_Pipeline SHALL fail the workflow and surface the error output in the workflow run log.
4. IF the `package-lock.json` file is missing or out of sync with `package.json`, THEN THE CI_Pipeline SHALL fail the dependency installation step. IF `package-lock.json` is absent but `npm install` succeeds, THEN THE CI_Pipeline SHALL allow the build to proceed.

### Requirement 3: Build Verification

**User Story:** As a developer, I want the pipeline to build the application, so that build-breaking changes are caught before merge.

#### Acceptance Criteria

1. THE Build_Step SHALL execute `npm run build` to produce the production bundle.
2. WHEN the build fails, THE CI_Pipeline SHALL fail the workflow and report the error, regardless of whether error reporting itself succeeds.
3. THE Build_Step SHALL complete before any end-to-end tests execute.

### Requirement 4: Unit and Property Test Execution

**User Story:** As a developer, I want the pipeline to run unit and property-based tests, so that logic regressions are detected automatically.

#### Acceptance Criteria

1. THE Vitest_Runner SHALL execute all unit and property-based tests via `npm run test`.
2. WHEN any unit or property test fails, THE CI_Pipeline SHALL fail the workflow and display the failing test names and error details in the workflow step log. THE CI_Pipeline SHALL only display error details when actual test failures are detected.
3. THE Vitest_Runner SHALL run in single-execution mode (not watch mode) using the `--run` flag.
4. THE Vitest_Runner SHALL execute after dependency installation completes successfully.

### Requirement 5: End-to-End Test Execution

**User Story:** As a developer, I want the pipeline to run Cypress end-to-end tests in headless mode, so that user-facing functionality is verified automatically.

#### Acceptance Criteria

1. THE Cypress_Runner SHALL use the `cypress-io/github-action@v6` action to execute end-to-end tests.
2. THE Cypress_Runner SHALL start the built application using `npm run preview` and run tests against `http://localhost:4173`.
3. THE Cypress_Runner SHALL wait for `http://localhost:4173` to respond before executing tests, with a maximum wait timeout of 60 seconds.
4. WHEN any end-to-end test actually executes and fails, THE CI_Pipeline SHALL fail the workflow and report the failing tests in the workflow log output. THE CI_Pipeline SHALL only report failures when tests actually execute and fail.
5. THE Cypress_Runner SHALL skip the install step within the action since dependencies are already installed by the CI_Pipeline.
6. THE Cypress_Runner SHALL execute tests in headless mode using the default Electron browser.

### Requirement 6: Test Failure Artifacts

**User Story:** As a developer, I want Cypress screenshots and videos to be uploaded as artifacts on failure, so that I can debug failing end-to-end tests without reproducing locally.

#### Acceptance Criteria

1. WHEN an end-to-end test fails, THE CI_Pipeline SHALL upload the contents of the `cypress/screenshots` directory as workflow artifacts.
2. WHEN an end-to-end test fails, THE CI_Pipeline SHALL upload the contents of the `cypress/videos` directory as workflow artifacts.
3. THE CI_Pipeline SHALL retain failure artifacts for 7 days.
4. IF the end-to-end test step fails, THEN THE CI_Pipeline SHALL still execute the artifact upload steps regardless of the prior step failure.

### Requirement 7: Code Coverage Instrumentation

**User Story:** As a developer, I want code coverage to be collected during test runs, so that I can see how much of the codebase is exercised by the test suite.

#### Acceptance Criteria

1. THE Vitest_Runner SHALL generate a code coverage report when executing unit and property-based tests.
2. THE CI_Pipeline SHALL produce coverage output in both LCOV and text summary formats.
3. THE CI_Pipeline SHALL display a text coverage summary in the workflow step log for quick visibility.
4. THE Vitest_Runner SHALL use V8 or Istanbul as the coverage provider.

### Requirement 8: Coverage and Test Report Artifacts

**User Story:** As a developer, I want coverage reports and test results uploaded as CI artifacts, so that I can review detailed coverage data and test outcomes from any workflow run.

#### Acceptance Criteria

1. THE CI_Pipeline SHALL upload the code coverage report directory as a workflow artifact on every successful run.
2. THE CI_Pipeline SHALL upload the coverage report artifact with the name "coverage-report".
3. THE CI_Pipeline SHALL retain coverage report artifacts for 14 days.
4. THE CI_Pipeline SHALL upload Cypress test result reports (if generated) as workflow artifacts.
5. IF the Vitest_Runner step fails, THEN THE CI_Pipeline SHALL still attempt to upload any partial coverage report that was generated.

### Requirement 9: Dependency Caching

**User Story:** As a developer, I want dependencies to be cached between runs, so that CI execution time is minimized.

#### Acceptance Criteria

1. THE CI_Pipeline SHALL cache the npm dependency cache directory between workflow runs.
2. THE CI_Pipeline SHALL cache the Cypress binary between workflow runs.
3. WHEN the `package-lock.json` file changes, THE CI_Pipeline SHALL invalidate both the npm dependency cache and the Cypress binary cache by using a cache key derived from the hash of the `package-lock.json` file. THE CI_Pipeline SHALL only invalidate caches when `package-lock.json` changes.
4. IF no cache entry exists for the current cache key, THEN THE CI_Pipeline SHALL ensure a fresh dependency install always executes and the workflow SHALL still complete successfully, with workflow success dependent on the fresh install step succeeding.
