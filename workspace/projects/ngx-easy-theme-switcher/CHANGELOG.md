# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] — 2026-10-06

### Added
- **PrimeIcons support** — `iconFont="pi"` now works out of the box and defaults to `pi-sun` / `pi-moon`, rendering the `pi pi-moon` class pair PrimeIcons expects.
- **Per-font default icons** — when `lightIcon` / `darkIcon` are omitted, the toggle picks icon names matching the selected font: FontAwesome (`fa-sun` / `fa-moon`), Material Icons and Material Symbols (`light_mode` / `dark_mode`), Bootstrap Icons (`bi-sun-fill` / `bi-moon-fill`), PrimeIcons (`pi-sun` / `pi-moon`), Ionicons (`sunny` / `moon`).
- PrimeIcons demo card in the demo application, plus PrimeIcons unit and e2e tests.

### Fixed
- **Custom SVG icons were stripped by Angular's HTML sanitizer** — `svgIcon` markup is now inserted as trusted HTML, so inline `<svg>` renders instead of being removed. Never bind untrusted user input to `svgIcon`.
- Material icon fonts previously fell back to FontAwesome names (`fa-moon` / `fa-sun`); they now use valid Material ligatures (`dark_mode` / `light_mode`).

### Changed
- **Angular 22 support** — updated peer dependencies to `@angular/common`, `@angular/core` and `@angular/platform-browser` `^22.2.0`.
- Upgraded workspace dependencies to Angular 22.2.1, Angular CLI 22.2.1, TypeScript 6.0.3, `ng-packagr` 22.2.4, `zone.js` 0.16.3; removed the deprecated `@angular/platform-browser-dynamic`.
- Documentation: Angular 22 badge, Node.js requirements, PrimeIcons setup and per-font default icon table.

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
