# NGX Easy Theme Switcher — workspace

Angular workspace containing the library and its demo application.

## Projects

| Project                  | Path                                 | Description                                              |
|--------------------------|--------------------------------------|----------------------------------------------------------|
| `ngx-easy-theme-switcher`| `projects/ngx-easy-theme-switcher`   | The published library (service + toggle component)        |
| `test-app`               | `projects/test-app`                  | Demo application used for manual checks and e2e tests     |

Library documentation: [projects/ngx-easy-theme-switcher/README.md](projects/ngx-easy-theme-switcher/README.md).

## Requirements

- Node.js 22.22.3+, 24.15+ or 26+ (required by Angular 22 tooling)
- Angular 22.2+

## Development server

Run `npm start` (or `ng serve test-app`) for the demo app and open `http://localhost:4200/`. The application reloads automatically when source files change.

The demo app shows every supported icon font variant (FontAwesome, Material Icons, Bootstrap Icons, PrimeIcons) and a custom SVG icon. PrimeIcons is installed as a dependency and its stylesheet is wired up in `angular.json`, so that card renders real glyphs.

## Building

```bash
# Build the library into dist/ngx-easy-theme-switcher
npm run build:lib

# Build the demo app
npm run build:app

# Build both (library first, then the app)
npm run build
```

The demo app resolves `ngx-easy-theme-switcher` from `dist/`, so build the library before serving or testing the app.

## Running unit tests

Unit tests run with [Karma](https://karma-runner.github.io):

```bash
npm run test:lib   # library tests
npm run test:app   # demo app tests
npm run test:ci    # both, single run, headless Chrome
```

## Running end-to-end tests

E2E tests use [Playwright](https://playwright.dev); the config starts the demo app automatically:

```bash
npm run e2e
npm run e2e:ui
```

## Code scaffolding

```bash
ng generate component component-name
ng generate --help
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
