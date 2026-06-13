import { Component } from '@angular/core';
import { ThemeToggleComponent } from 'ngx-easy-theme-switcher';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemeToggleComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Easy Theme Switcher</h1>
        <ets-theme-toggle />
      </header>

      <main class="app-main">
        <section class="demo-card">
          <h2>Default (FontAwesome)</h2>
          <p>Uses <code>fas</code> with <code>fa-sun</code> / <code>fa-moon</code></p>
          <ets-theme-toggle />
        </section>

        <section class="demo-card">
          <h2>Material Icons</h2>
          <p>Uses Material Symbols</p>
          <ets-theme-toggle
            iconFont="material-symbols-outlined"
            lightIcon="dark_mode"
            darkIcon="light_mode"
          />
        </section>

        <section class="demo-card">
          <h2>Custom SVG</h2>
          <p>Custom SVG icon instead of font icon</p>
          <ets-theme-toggle
            [svgIcon]="customSvg"
          />
        </section>

        <section class="demo-card">
          <h2>Bootstrap Icons</h2>
          <p>Uses Bootstrap Icons (<code>bi</code>)</p>
          <ets-theme-toggle
            iconFont="bi"
            lightIcon="bi-sun-fill"
            darkIcon="bi-moon-fill"
          />
        </section>
      </main>
    </div>
  `,
  styles: `
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background: var(--ets-surface);
      border-bottom: 1px solid var(--ets-border);
    }

    .app-header h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    .app-main {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      padding: 2rem;
      align-content: flex-start;
    }

    .demo-card {
      background: var(--ets-surface);
      border: 1px solid var(--ets-border);
      border-radius: 12px;
      padding: 1.5rem;
      min-width: 250px;
      flex: 1;
    }

    .demo-card h2 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
    }

    .demo-card p {
      margin: 0 0 1rem;
      font-size: 0.85rem;
      opacity: 0.7;
    }

    .demo-card code {
      background: rgba(128, 128, 128, 0.1);
      padding: 0.1em 0.4em;
      border-radius: 4px;
    }
  `,
})
export class AppComponent {
  customSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
  </svg>`;
}
