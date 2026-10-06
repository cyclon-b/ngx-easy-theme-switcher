import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService, THEME_CONFIG } from '../theme.service';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
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

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the toggle button', () => {
    const btn = fixture.nativeElement.querySelector('.ets-toggle-btn');
    expect(btn).toBeTruthy();
  });

  it('should have correct aria-label when theme is light', () => {
    const btn = fixture.nativeElement.querySelector('.ets-toggle-btn');
    expect(btn.getAttribute('aria-label')).toBe('Switch to dark mode');
  });

  it('should update aria-label after toggle', () => {
    const btn = fixture.nativeElement.querySelector('.ets-toggle-btn');
    btn.click();
    fixture.detectChanges();
    expect(btn.getAttribute('aria-label')).toBe('Switch to light mode');
  });

  it('should toggle theme on button click', () => {
    expect(themeService.currentTheme).toBe('light');
    const btn = fixture.nativeElement.querySelector('.ets-toggle-btn');
    btn.click();
    expect(themeService.currentTheme).toBe('dark');
  });

  it('should display fa-moon icon when theme is light (default)', () => {
    const icon = fixture.nativeElement.querySelector('.ets-icon');
    expect(icon.classList.contains('fas')).toBeTrue();
    expect(icon.classList.contains('fa-moon')).toBeTrue();
    expect(icon.textContent).toBe('');
  });

  it('should switch to fa-sun icon when toggled to dark', () => {
    themeService.toggleTheme();
    fixture.detectChanges();
    const icon = fixture.nativeElement.querySelector('.ets-icon');
    expect(icon.classList.contains('fas')).toBeTrue();
    expect(icon.classList.contains('fa-sun')).toBeTrue();
  });

  it('should render custom SVG container when svgIcon is provided', () => {
    fixture.componentRef.setInput('svgIcon', '<svg class="my-svg"></svg>');
    fixture.detectChanges();
    const svgSpan = fixture.nativeElement.querySelector('.ets-icon--svg');
    expect(svgSpan).toBeTruthy();
  });

  it('should insert custom SVG markup as-is (not stripped by sanitizer)', () => {
    fixture.componentRef.setInput(
      'svgIcon',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3v18"/></svg>'
    );
    fixture.detectChanges();
    const svgSpan = fixture.nativeElement.querySelector('.ets-icon--svg');
    expect(svgSpan.querySelector('svg')).toBeTruthy();
    expect(svgSpan.querySelector('path')).toBeTruthy();
  });

  it('should fall back to the icon font when svgIcon is not set', () => {
    fixture.componentRef.setInput('svgIcon', undefined);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ets-icon--svg')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.ets-icon')).toBeTruthy();
  });

  it('should use material icons classes when iconFont starts with material', () => {
    fixture.destroy();
    const newFixture = TestBed.createComponent(ThemeToggleComponent);
    newFixture.componentInstance.iconFont = 'material-symbols-outlined';
    newFixture.componentInstance.lightIcon = 'dark_mode';
    newFixture.componentInstance.darkIcon = 'light_mode';
    newFixture.detectChanges();
    const icon = newFixture.nativeElement.querySelector('.ets-icon');
    expect(icon.classList.contains('material-symbols-outlined')).toBeTrue();
    expect(icon.textContent).toBe('light_mode');
    newFixture.destroy();
  });

  it('should use PrimeIcons defaults (pi-moon / pi-sun) when iconFont is pi', () => {
    fixture.destroy();
    const newFixture = TestBed.createComponent(ThemeToggleComponent);
    newFixture.componentInstance.iconFont = 'pi';
    newFixture.detectChanges();
    let icon = newFixture.nativeElement.querySelector('.ets-icon');
    expect(icon.classList.contains('pi')).toBeTrue();
    expect(icon.classList.contains('pi-moon')).toBeTrue();

    themeService.toggleTheme();
    newFixture.detectChanges();
    icon = newFixture.nativeElement.querySelector('.ets-icon');
    expect(icon.classList.contains('pi')).toBeTrue();
    expect(icon.classList.contains('pi-sun')).toBeTrue();
    newFixture.destroy();
  });

  it('should let custom icon names override PrimeIcons defaults', () => {
    fixture.destroy();
    const newFixture = TestBed.createComponent(ThemeToggleComponent);
    newFixture.componentInstance.iconFont = 'pi';
    newFixture.componentInstance.darkIcon = 'pi-moon-custom';
    newFixture.detectChanges();
    const icon = newFixture.nativeElement.querySelector('.ets-icon');
    expect(icon.classList.contains('pi-moon-custom')).toBeTrue();
    expect(icon.classList.contains('pi-moon')).toBeFalse();
    newFixture.destroy();
  });

  it('should use material defaults (dark_mode / light_mode) for material fonts', () => {
    fixture.destroy();
    const newFixture = TestBed.createComponent(ThemeToggleComponent);
    newFixture.componentInstance.iconFont = 'material-icons';
    newFixture.detectChanges();
    const icon = newFixture.nativeElement.querySelector('.ets-icon');
    expect(icon.classList.contains('material-icons')).toBeTrue();
    expect(icon.textContent).toBe('dark_mode');
    newFixture.destroy();
  });

  it('should update oppositeTheme on theme change', () => {
    expect(component['oppositeTheme']).toBe('dark');
    themeService.toggleTheme();
    expect(component['oppositeTheme']).toBe('light');
  });

  it('should work with custom icon names', () => {
    fixture.destroy();
    const newFixture = TestBed.createComponent(ThemeToggleComponent);
    newFixture.componentInstance.darkIcon = 'fa-moon-custom';
    newFixture.detectChanges();
    const icon = newFixture.nativeElement.querySelector('.ets-icon');
    expect(icon.classList.contains('fa-moon-custom')).toBeTrue();
    newFixture.destroy();
  });

  it('should clean up subscriptions on destroy', () => {
    const nextSpy = spyOn(component['destroy$'], 'next');
    const completeSpy = spyOn(component['destroy$'], 'complete');
    fixture.destroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
