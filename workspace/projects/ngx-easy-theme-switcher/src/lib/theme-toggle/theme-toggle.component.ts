import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
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
      @if (svgIcon) {
        <span class="ets-icon ets-icon--svg" [innerHTML]="svgIcon"></span>
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
  /** Icon font abbreviation (e.g. 'fas', 'material-icons', 'bi') */
  @Input() iconFont?: IconFont;

  /** Custom SVG markup (overrides iconFont if provided) */
  @Input() svgIcon?: string;

  /** Icon name for the first theme (default light) */
  @Input() lightIcon?: string;

  /** Icon name for the second theme (default dark) */
  @Input() darkIcon?: string;

  protected oppositeTheme = '';
  protected iconClasses: Record<string, boolean> = {};
  protected displayIconText = '';

  private destroy$ = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef,
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

    const iconName = isLight
      ? (this.darkIcon ?? 'fa-moon')
      : (this.lightIcon ?? 'fa-sun');

    const font = this.iconFont ?? 'fas';

    if (font.startsWith('material')) {
      this.iconClasses = { [font]: true };
      this.displayIconText = iconName;
    } else {
      this.iconClasses = { [font]: true, [iconName]: true };
      this.displayIconText = '';
    }
  }
}
