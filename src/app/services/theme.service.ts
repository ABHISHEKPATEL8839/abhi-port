import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AppTheme = 'cyber' | 'light' | 'neon' | 'emerald';
export type AppFontSize = 'sm' | 'md' | 'lg' | 'xl';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio_theme';
  private readonly FONT_SIZE_KEY = 'portfolio_font_size';

  private currentTheme$ = new BehaviorSubject<AppTheme>('cyber');
  private currentFontSize$ = new BehaviorSubject<AppFontSize>('md');

  theme$ = this.currentTheme$.asObservable();
  fontSize$ = this.currentFontSize$.asObservable();

  constructor() {
    this.initSettings();
  }

  private initSettings() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem(this.THEME_KEY) as AppTheme | null;
    if (savedTheme && ['cyber', 'light', 'neon', 'emerald'].includes(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'cyber' : 'light');
    }

    // Load saved font size
    const savedFontSize = localStorage.getItem(this.FONT_SIZE_KEY) as AppFontSize | null;
    if (savedFontSize && ['sm', 'md', 'lg', 'xl'].includes(savedFontSize)) {
      this.setFontSize(savedFontSize);
    } else {
      this.setFontSize('md');
    }
  }

  get theme(): AppTheme {
    return this.currentTheme$.value;
  }

  get fontSize(): AppFontSize {
    return this.currentFontSize$.value;
  }

  get isLightTheme(): boolean {
    return this.currentTheme$.value === 'light';
  }

  setTheme(theme: AppTheme) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem(this.THEME_KEY, theme);
      } catch (e) {
        console.warn('Unable to save theme to localStorage', e);
      }
      this.currentTheme$.next(theme);
    }
  }

  toggleLightDark() {
    const nextTheme: AppTheme = this.isLightTheme ? 'cyber' : 'light';
    this.setTheme(nextTheme);
  }

  setFontSize(size: AppFontSize) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-font-size', size);
      try {
        localStorage.setItem(this.FONT_SIZE_KEY, size);
      } catch (e) {
        console.warn('Unable to save font size to localStorage', e);
      }
      this.currentFontSize$.next(size);
    }
  }

  increaseFontSize() {
    const order: AppFontSize[] = ['sm', 'md', 'lg', 'xl'];
    const index = order.indexOf(this.fontSize);
    if (index < order.length - 1) {
      this.setFontSize(order[index + 1]);
    }
  }

  decreaseFontSize() {
    const order: AppFontSize[] = ['sm', 'md', 'lg', 'xl'];
    const index = order.indexOf(this.fontSize);
    if (index > 0) {
      this.setFontSize(order[index - 1]);
    }
  }
}
