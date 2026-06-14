import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  ThemeService,
  THEME_CONFIG,
} from 'ngx-easy-theme-switcher';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        ThemeService,
        {
          provide: THEME_CONFIG,
          useValue: {
            themes: ['light', 'dark'] as [string, string],
            defaultTheme: 'light',
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Easy Theme Switcher'
    );
  });

  it('should render four demo cards', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.demo-card');
    expect(cards.length).toBe(4);
  });

  it('should contain theme-toggle components', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const toggles = fixture.nativeElement.querySelectorAll('ets-theme-toggle');
    expect(toggles.length).toBeGreaterThanOrEqual(4);
  });
});
