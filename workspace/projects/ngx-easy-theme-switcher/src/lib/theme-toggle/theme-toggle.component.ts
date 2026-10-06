import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../theme.service';

export type IconFont =
  | 'fas'       // FontAwesome Solid
  | 'far'       // FontAwesome Regular
  | 'fal'       // FontAwesome Light
  | 'fab'       // FontAwesome Brands
  | 'material-icons'
  | 'material-icons-outlined'
  | 'material-symbols-outlined'
  | 'bi'        // Bootstrap Icons
  | 'pi'        // PrimeIcons
  | 'ion-icon'; // Ionicons

/** Icon names used when `lightIcon` / `darkIcon` are not provided, per icon font. */
const DEFAULT_ICONS: Record<IconFont, { light: string; dark: string }> = {
  fas: { light: 'fa-sun', dark: 'fa-moon' },
  far: { light: 'fa-sun', dark: 'fa-moon' },
  fal: { light: 'fa-sun', dark: 'fa-moon' },
  fab: { light: 'fa-sun', dark: 'fa-moon' },
  'material-icons': { light: 'light_mode', dark: 'dark_mode' },
  'material-icons-outlined': { light: 'light_mode', dark: 'dark_mode' },
  'material-symbols-outlined': { light: 'light_mode', dark: 'dark_mode' },
  bi: { light: 'bi-sun-fill', dark: 'bi-moon-fill' },
  pi: { light: 'pi-sun', dark: 'pi-moon' },
  'ion-icon': { light: 'sunny', dark: 'moon' },
};

@Component({
  selector: 'ets-theme-toggle',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      class="ets-toggle-btn"
      (click)="toggle()"
      [attr.aria-label]="'Switch to ' + oppositeTheme + ' mode'"
      type="button"
    >
      @if (trustedSvg) {
        <span class="ets-icon ets-icon--svg" [innerHTML]="trustedSvg"></span>
      } @else {
        <span
          class="ets-icon"
          [ngClass]="iconClasses"
        >{{ displayIconText }}</span>
      }
    </button>
  `,
  styles: `
    .ets-toggle-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: background-color 0.3s, color 0.3s;
      color: inherit;
      font-size: 1.25rem;
      line-height: 1;
    }
    .ets-toggle-btn:hover {
      background-color: rgba(128, 128, 128, 0.15);
    }
    .ets-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .ets-icon--svg {
      line-height: 0;
    }
    .ets-icon--svg ::ng-deep svg {
      width: 1.25rem;
      height: 1.25rem;
      fill: currentColor;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  /** Icon font abbreviation (e.g. 'fas', 'material-icons', 'bi', 'pi') */
  @Input() iconFont?: IconFont;

  /**
   * Custom SVG markup (overrides iconFont if provided).
   *
   * The markup is inserted as-is, without HTML sanitization, so that inline
   * `<svg>` elements are preserved. Never bind untrusted/user-provided markup here.
   */
  @Input()
  set svgIcon(value: string | undefined) {
    this.rawSvgIcon = value;
    this.trustedSvg = value
      ? this.sanitizer.bypassSecurityTrustHtml(value)
      : null;
  }
  get svgIcon(): string | undefined {
    return this.rawSvgIcon;
  }

  /** Icon name for the first theme (default light), e.g. 'fa-sun' or 'pi-sun' */
  @Input() lightIcon?: string;

  /** Icon name for the second theme (default dark), e.g. 'fa-moon' or 'pi-moon' */
  @Input() darkIcon?: string;

  protected oppositeTheme = '';
  protected iconClasses: Record<string, boolean> = {};
  protected displayIconText = '';
  protected trustedSvg: SafeHtml | null = null;

  private rawSvgIcon?: string;
  private destroy$ = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.updateState(this.themeService.currentTheme);
    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => {
        this.updateState(theme);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggle(): void {
    this.themeService.toggleTheme();
  }

  private updateState(currentTheme: string): void {
    const [lightTheme, darkTheme] = this.themeService.themes;
    const isLight = currentTheme === lightTheme;

    this.oppositeTheme = currentTheme === lightTheme ? darkTheme : lightTheme;

    const font = this.iconFont ?? 'fas';
    const defaults = DEFAULT_ICONS[font] ?? DEFAULT_ICONS.fas;

    const iconName = isLight
      ? (this.darkIcon ?? defaults.dark)
      : (this.lightIcon ?? defaults.light);

    if (font.startsWith('material')) {
      this.iconClasses = { [font]: true };
      this.displayIconText = iconName;
    } else {
      this.iconClasses = { [font]: true, [iconName]: true };
      this.displayIconText = '';
    }
  }
}
