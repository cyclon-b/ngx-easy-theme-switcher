import { TestBed } from '@angular/core/testing';
import { ThemeService, THEME_CONFIG } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('with default config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ThemeService],
      });
      service = TestBed.inject(ThemeService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have default theme as "light"', () => {
      expect(service.currentTheme).toBe('light');
    });

    it('should expose current theme as observable', (done) => {
      service.currentTheme$.subscribe((theme) => {
        expect(theme).toBe('light');
        done();
      });
    });

    it('should return configured themes', () => {
      expect(service.themes).toEqual(['light', 'dark']);
    });

    it('should toggle from light to dark', () => {
      service.toggleTheme();
      expect(service.currentTheme).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      service.toggleTheme(); // light -> dark
      service.toggleTheme(); // dark -> light
      expect(service.currentTheme).toBe('light');
    });

    it('should set a specific theme', () => {
      service.setTheme('dark');
      expect(service.currentTheme).toBe('dark');
    });

    it('should not set an invalid theme and keep current', () => {
      service.setTheme('invalid' as any);
      expect(service.currentTheme).toBe('light');
    });

    it('should emit new value on theme change', (done) => {
      const values: string[] = [];
      service.currentTheme$.subscribe((theme) => {
        values.push(theme);
        if (values.length === 2) {
          expect(values).toEqual(['light', 'dark']);
          done();
        }
      });
      service.toggleTheme();
    });

    it('should set data-theme attribute on document element', () => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      service.toggleTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should persist theme to localStorage', () => {
      service.toggleTheme();
      expect(localStorage.getItem('ets-pref-theme')).toBe('dark');
    });

    it('should restore persisted theme', () => {
      localStorage.setItem('ets-pref-theme', 'dark');
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [ThemeService],
      });
      const svc = TestBed.inject(ThemeService);
      expect(svc.currentTheme).toBe('dark');
    });
  });

  describe('with custom config', () => {
    const customConfig = {
      themes: ['day', 'night'] as [string, string],
      attribute: 'data-mode',
      storageKey: 'my-theme-key',
      defaultTheme: 'night',
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: THEME_CONFIG, useValue: customConfig },
          ThemeService,
        ],
      });
      service = TestBed.inject(ThemeService);
    });

    it('should use custom themes', () => {
      expect(service.themes).toEqual(['day', 'night']);
    });

    it('should use custom default theme', () => {
      expect(service.currentTheme).toBe('night');
    });

    it('should use custom attribute name', () => {
      expect(document.documentElement.getAttribute('data-mode')).toBe('night');
    });

    it('should toggle between custom themes', () => {
      service.toggleTheme(); // night -> day
      expect(service.currentTheme).toBe('day');
      service.toggleTheme(); // day -> night
      expect(service.currentTheme).toBe('night');
    });

    it('should use custom storage key', () => {
      service.toggleTheme(); // night -> day
      expect(localStorage.getItem('my-theme-key')).toBe('day');
    });
  });

  describe('localStorage errors', () => {
    let getItemSpy: jasmine.Spy;

    beforeEach(() => {
      getItemSpy = spyOn(localStorage, 'getItem').and.throwError(
        'localStorage unavailable'
      );
    });

    it('should fall back to default theme when localStorage throws', () => {
      TestBed.configureTestingModule({
        providers: [ThemeService],
      });
      service = TestBed.inject(ThemeService);
      expect(service.currentTheme).toBe('light');
    });
  });
});
