# NGX Easy Theme Switcher

[![npm version](https://img.shields.io/npm/v/ngx-easy-theme-switcher)](https://www.npmjs.com/package/ngx-easy-theme-switcher)
[![Angular](https://img.shields.io/badge/Angular-21.2+-red)](https://angular.dev)

Angular library for easy theme switching (light/dark) with customizable toggle icons.

## Features

- **Service-based** — inject `ThemeService` anywhere to programmatically get/set/toggle themes
- **Persistent** — theme preference is saved in `localStorage`
- **Customizable icon** — default FontAwesome, with support for any icon font or custom SVG
- **Standalone** — compatible with Angular standalone components
- **Minimal** — just a service and a toggle component
- **Angular 21** — built and tested with Angular 21.2+
- **Tested** — unit tests (Jasmine + Karma) and e2e tests (Playwright)

## Installation

```bash
npm install ngx-easy-theme-switcher
```

FontAwesome is used by default. For icons to display, install your preferred icon library:

```bash
# For default FontAwesome icons
npm install @fortawesome/fontawesome-free

# Or for Material Icons
npm install material-symbols

# Or for Bootstrap Icons
npm install bootstrap-icons
```

## Quick Start

### 1. Create theme files

Create two SCSS files in `src/themes/`:

**`src/themes/_light.scss`**:
```scss
[data-theme="light"] {
  --bg: #ffffff;
  --text: #1a1a2e;
  --primary: #4361ee;
}
```

**`src/themes/_dark.scss`**:
```scss
[data-theme="dark"] {
  --bg: #0f172a;
  --text: #e2e8f0;
  --primary: #818cf8;
}
```

### 2. Import themes in `styles.scss`

```scss
@use 'themes/light';
@use 'themes/dark';

body {
  background-color: var(--bg);
  color: var(--text);
  transition: background-color 0.3s, color 0.3s;
}
```

### 3. Configure the service

In `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { THEME_CONFIG } from 'ngx-easy-theme-switcher';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: THEME_CONFIG,
      useValue: {
        themes: ['light', 'dark'],         // your theme names
        defaultTheme: 'light',             // initial theme
      },
    },
  ],
};
```

### 4. Add the toggle button

In any component template:

```html
<ets-theme-toggle />
```

## Customization

### Icon Fonts

The toggle component supports various icon fonts via the `iconFont` input:

```html
<!-- Default (FontAwesome Solid) -->
<ets-theme-toggle />

<!-- Material Symbols -->
<ets-theme-toggle
  iconFont="material-symbols-outlined"
  lightIcon="dark_mode"
  darkIcon="light_mode"
/>

<!-- Bootstrap Icons -->
<ets-theme-toggle
  iconFont="bi"
  lightIcon="bi-sun-fill"
  darkIcon="bi-moon-fill"
/>
```

Supported icon fonts: `fas`, `far`, `fal`, `fab`, `material-icons`, `material-icons-outlined`, `material-symbols-outlined`, `bi`, `pi`, `ion-icon`.

### Custom SVG

Pass any SVG markup as the `svgIcon` input:

```html
<ets-theme-toggle [svgIcon]="mySvg" />
```

```typescript
mySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9..."/>
</svg>`;
```

### Custom Icon Names

Override the icon class names for each theme:

```html
<ets-theme-toggle
  lightIcon="fa-sun"
  darkIcon="fa-moon"
/>
```

### Programmatic Control

Inject `ThemeService` anywhere:

```typescript
import { ThemeService } from 'ngx-easy-theme-switcher';

constructor(private themeService: ThemeService) {}

// Toggle theme
this.themeService.toggleTheme();

// Set specific theme
this.themeService.setTheme('dark');

// Get current theme
const current = this.themeService.currentTheme;

// Observe theme changes
this.themeService.currentTheme$.subscribe(theme => {
  console.log('Theme changed to:', theme);
});
```

## API

### `ThemeService`

| Method/Property       | Description                                  |
|-----------------------|----------------------------------------------|
| `currentTheme`        | Get the current theme name                   |
| `currentTheme$`       | Observable that emits on theme change        |
| `themes`              | The configured theme names                   |
| `toggleTheme()`       | Switch between the two themes                |
| `setTheme(name)`      | Set a specific theme                         |

### `ThemeConfig` (InjectionToken)

| Property       | Default             | Description                           |
|----------------|---------------------|---------------------------------------|
| `themes`       | `['light', 'dark']` | Pair of theme names                   |
| `attribute`    | `'data-theme'`      | HTML attribute set on `<html>`        |
| `storageKey`   | `'ets-pref-theme'`  | localStorage key                      |
| `defaultTheme` | `'light'`           | Initial theme before user choice      |

### `ThemeToggleComponent` Inputs

| Input       | Default      | Description                              |
|-------------|--------------|------------------------------------------|
| `iconFont`  | `'fas'`      | Icon font abbreviation                   |
| `svgIcon`   | —            | Custom SVG markup (overrides iconFont)   |
| `lightIcon` | `'fa-sun'`   | Icon name/class for the first theme      |
| `darkIcon`  | `'fa-moon'`  | Icon name/class for the second theme     |

## Testing

```bash
# Unit tests (library)
npm run test:lib

# Unit tests (demo app)
npm run test:app

# All unit tests in CI mode (single run, headless)
npm run test:ci

# E2E tests (Playwright)
npm run e2e
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for the full release history.

## License

Copyright (c) 2026 **Gennady Artamonov**

All use is free. Redistribution or resale of the library itself as a paid product is prohibited. See [LICENSE.md](./LICENSE.md) for full terms.
