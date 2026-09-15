/**
 * Theme Toggle - Manages light/dark mode switching
 * Persists user preference to localStorage
 */

const THEME_KEY = 'pixelmoji-theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

class ThemeToggle {
  constructor() {
    this.rootElement = document.documentElement;
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.init();
  }

  init() {
    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem(THEME_KEY);
    const theme = savedTheme || this.getSystemTheme();
    this.setTheme(theme);

    // Listen for system theme changes
    this.prefersDark.addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        this.setTheme(e.matches ? THEME_DARK : THEME_LIGHT);
      }
    });

    // Setup toggle button if it exists
    this.setupToggleButton();
  }

  getSystemTheme() {
    return this.prefersDark.matches ? THEME_DARK : THEME_LIGHT;
  }

  setTheme(theme) {
    const isLight = theme === THEME_LIGHT;
    
    // Remove both theme classes
    this.rootElement.classList.remove(THEME_LIGHT, THEME_DARK);
    
    // Add the new theme class
    this.rootElement.classList.add(theme);

    // Update toggle button state if it exists
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', isLight ? 'false' : 'true');
      toggleBtn.innerHTML = isLight 
        ? '🌙 Dark' 
        : '☀️ Light';
    }
  }

  toggle() {
    const currentTheme = this.rootElement.classList.contains(THEME_LIGHT) 
      ? THEME_LIGHT 
      : THEME_DARK;
    const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    
    this.setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  }

  setupToggleButton() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
  }

  getCurrentTheme() {
    return this.rootElement.classList.contains(THEME_LIGHT) 
      ? THEME_LIGHT 
      : THEME_DARK;
  }

  resetToSystemPreference() {
    localStorage.removeItem(THEME_KEY);
    this.setTheme(this.getSystemTheme());
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.themeToggle = new ThemeToggle();
  });
} else {
  window.themeToggle = new ThemeToggle();
}
