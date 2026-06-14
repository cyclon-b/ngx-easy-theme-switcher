# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] — 2026-06-14

### Added
- **Angular 21 support** — updated peer dependencies to `@angular/common: ^21.2.0` and `@angular/core: ^21.2.0`.
- **Unit tests** — comprehensive test suite for `ThemeService` (19 tests) and `ThemeToggleComponent` (11 tests) using Jasmine + Karma.
- **E2E tests** — Playwright test suite (11 tests) covering theme toggle, localStorage persistence, ARIA labels, SVG icons, and Material/Bootstrap icon variants.
- `npm run test:lib`, `npm run test:app`, `npm run test:ci`, `npm run e2e`, `npm run e2e:ui` scripts in workspace `package.json`.

### Changed
- Upgraded workspace dependencies to Angular 21.2.17, Angular CLI 21.2.15, TypeScript 5.9.3, `ng-packagr` 21.2.5.

### Technical
- Internal: dependency bumps only, no public API changes.
