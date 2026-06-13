import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ThemeConfig {
  /** Names of the two themes, e.g. ['light', 'dark'] */
  themes?: [string, string];
  /** CSS attribute/class to set on the document element */
  attribute?: string;
  /** Storage key for persisting theme preference */
  storageKey?: string;
  /** Default theme (index 0 or 1 from themes array) */
  defaultTheme?: string;
}

export const THEME_CONFIG = new InjectionToken<ThemeConfig>('THEME_CONFIG');

const DEFAULT_CONFIG: ThemeConfig = {
  themes: ['light', 'dark'],
  attribute: 'data-theme',
  storageKey: 'ets-pref-theme',
  defaultTheme: 'light',
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private config: ThemeConfig;
  private currentThemeSubject: BehaviorSubject<string>;
  public currentTheme$: Observable<string>;

  constructor(@Optional() @Inject(THEME_CONFIG) config?: ThemeConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.currentThemeSubject = new BehaviorSubject<string>(
      this.getStoredTheme()
    );
    this.currentTheme$ = this.currentThemeSubject.asObservable();
    this.applyTheme(this.currentThemeSubject.value);
  }

  /** Get the current theme name */
  get currentTheme(): string {
    return this.currentThemeSubject.value;
  }

  /** Get all available theme names */
  get themes(): [string, string] {
    return this.config.themes!;
  }

  /** Toggle between the two configured themes */
  toggleTheme(): void {
    const [themeA, themeB] = this.config.themes!;
    const next = this.currentTheme === themeA ? themeB : themeA;
    this.setTheme(next);
  }

  /** Set a specific theme by name */
  setTheme(theme: string): void {
    if (!this.config.themes!.includes(theme)) {
      console.warn(
        `[EasyThemeSwitcher] Theme "${theme}" is not in configured themes:`,
        this.config.themes
      );
      return;
    }
    this.currentThemeSubject.next(theme);
    this.applyTheme(theme);
    this.storeTheme(theme);
  }

  private applyTheme(theme: string): void {
    const attr = this.config.attribute!;
    document.documentElement.setAttribute(attr, theme);
  }

  private getStoredTheme(): string {
    try {
      const stored = localStorage.getItem(this.config.storageKey!);
      if (stored && this.config.themes!.includes(stored)) {
        return stored;
      }
    } catch {
      // localStorage not available
    }
    return this.config.defaultTheme!;
  }

  private storeTheme(theme: string): void {
    try {
      localStorage.setItem(this.config.storageKey!, theme);
    } catch {
      // localStorage not available
    }
  }
}
