import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { THEME_CONFIG } from 'ngx-easy-theme-switcher';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: THEME_CONFIG,
      useValue: {
        themes: ['light', 'dark'] as [string, string],
        defaultTheme: 'light',
      },
    },
  ],
};
