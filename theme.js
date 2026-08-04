/**
 * One Day Multimedia — Dark / Light Theme
 * Persists preference in localStorage.
 * Apply dark mode by adding class="dark" on <html>.
 * All styles live in the CSS block injected below.
 */
(function () {

  // ─── 1. Inject CSS variables + dark overrides ─────────────────────────────
  const style = document.createElement('style');
  style.textContent = `

    /* ── Light theme (default) ─────────────────────────────── */
    :root {
      --bg-page      : #f9fafb;   /* gray-50  */
      --bg-nav       : #ffffff;
      --bg-card      : #ffffff;
      --bg-input     : #ffffff;
      --text-primary : #111827;   /* gray-900 */
      --text-secondary: #6b7280;  /* gray-500 */
      --text-muted   : #9ca3af;   /* gray-400 */
      --border       : #e5e7eb;   /* gray-200 */
      --shadow-nav   : 0 1px 3px rgba(0,0,0,0.12);
      --footer-bg    : #111827;
      --footer-text  : #d1d5db;
    }

    /* ── Dark theme ────────────────────────────────────────── */
    html.dark {
      --bg-page      : #0f172a;   /* slate-900 */
      --bg-nav       : #1e293b;   /* slate-800 */
      --bg-card      : #1e293b;
      --bg-input     : #1e293b;
      --text-primary : #f1f5f9;   /* slate-100 */
      --text-secondary: #94a3b8;  /* slate-400 */
      --text-muted   : #64748b;   /* slate-500 */
      --border       : #334155;   /* slate-700 */
      --shadow-nav   : 0 1px 3px rgba(0,0,0,0.5);
      --footer-bg    : #020617;
      --footer-text  : #94a3b8;
    }

    /* ── Apply variables across pages ─────────────────────── */
    html.dark body {
      background-color: var(--bg-page);
      color: var(--text-primary);
    }

    /* Nav */
    html.dark nav.bg-white {
      background-color: var(--bg-nav) !important;
      box-shadow: var(--shadow-nav);
    }
    html.dark nav .text-gray-900 { color: var(--text-primary)  !important; }
    html.dark nav .text-gray-500 { color: var(--text-secondary) !important; }
    html.dark nav .text-gray-400 { color: var(--text-muted)     !important; }
    html.dark nav .hover\\:bg-gray-100:hover { background-color: #334155 !important; }

    /* Logo secondary word */
    html.dark .text-gray-800 { color: var(--text-primary) !important; }

    /* Main backgrounds */
    html.dark .bg-white         { background-color: var(--bg-card) !important; }
    html.dark .bg-gray-50       { background-color: #131f32 !important; }
    html.dark .bg-gray-100      { background-color: #1e293b !important; }
    html.dark .paper-texture    { background-color: var(--bg-page) !important; background-image: none !important; }

    /* Typography */
    html.dark .text-gray-900  { color: var(--text-primary)   !important; }
    html.dark .text-gray-800  { color: var(--text-primary)   !important; }
    html.dark .text-gray-700  { color: #cbd5e1               !important; }
    html.dark .text-gray-600  { color: var(--text-secondary) !important; }
    html.dark .text-gray-500  { color: var(--text-secondary) !important; }
    html.dark .text-gray-400  { color: var(--text-muted)     !important; }

    /* Cards & sections */
    html.dark .shadow-lg,
    html.dark .shadow-xl {
      box-shadow: 0 4px 24px rgba(0,0,0,0.5) !important;
    }
    html.dark .bg-gray-50.rounded-lg,
    html.dark .flow-root.bg-gray-50 {
      background-color: #1e293b !important;
    }

    /* Borders */
    html.dark .border-gray-300 { border-color: var(--border) !important; }
    html.dark .border-gray-200 { border-color: var(--border) !important; }
    html.dark .border-gray-800 { border-color: #1e293b !important; }

    /* Inputs */
    html.dark input,
    html.dark textarea,
    html.dark select {
      background-color: var(--bg-input) !important;
      color: var(--text-primary) !important;
      border-color: var(--border) !important;
    }
    html.dark input::placeholder,
    html.dark textarea::placeholder {
      color: var(--text-muted) !important;
    }

    /* Footer */
    html.dark footer.bg-gray-900 {
      background-color: var(--footer-bg) !important;
    }
    html.dark footer .text-gray-300 { color: var(--footer-text) !important; }
    html.dark footer .text-gray-400 { color: #475569             !important; }
    html.dark footer .border-gray-800 { border-color: #1e293b   !important; }

    /* Progress bars track */
    html.dark .bg-gray-200 { background-color: #334155 !important; }

    /* Mobile menu */
    html.dark #mobile-menu {
      background-color: var(--bg-nav) !important;
    }
    html.dark #mobile-menu a { color: var(--text-secondary) !important; }
    html.dark #mobile-menu a:hover { background-color: #334155 !important; }

    /* Timeline cards */
    html.dark .bg-white.p-4.rounded.shadow {
      background-color: var(--bg-card) !important;
    }

    /* Chatbot window */
    html.dark #odm-chat-window {
      background: #1e293b !important;
    }
    html.dark #odm-chat-input-area {
      background: #1e293b !important;
      border-color: #334155 !important;
    }
    html.dark #odm-chat-input {
      background: #0f172a !important;
      color: #f1f5f9 !important;
      border-color: #334155 !important;
    }
    html.dark .odm-msg-bot {
      background: #334155 !important;
      color: #f1f5f9 !important;
    }

    /* ── Toggle button ─────────────────────────────────────── */
    #odm-theme-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 9999px;
      border: none;
      cursor: pointer;
      background: transparent;
      color: #6b7280;
      transition: background 0.2s, color 0.2s, transform 0.3s;
      flex-shrink: 0;
    }
    #odm-theme-btn:hover {
      background: #f3f4f6;
      color: #dc2626;
      transform: rotate(20deg);
    }
    html.dark #odm-theme-btn {
      color: #94a3b8;
    }
    html.dark #odm-theme-btn:hover {
      background: #334155;
      color: #fbbf24;
      transform: rotate(20deg);
    }
    #odm-theme-btn svg {
      width: 20px;
      height: 20px;
      pointer-events: none;
      transition: opacity 0.2s;
    }

    /* smooth colour transitions site-wide */
    *,
    *::before,
    *::after {
      transition:
        background-color 0.25s ease,
        border-color     0.25s ease,
        color            0.15s ease,
        box-shadow       0.25s ease;
    }
    /* but don't transition transforms — interferes with animations */
    img, svg { transition: opacity 0.25s ease; }
  `;
  document.head.appendChild(style);

  // ─── 2. Theme state ────────────────────────────────────────────────────────
  const STORAGE_KEY = 'odm-theme';

  function isDark() {
    return document.documentElement.classList.contains('dark');
  }

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateIcon();
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  }

  // ─── 3. Load saved preference (or system preference) ──────────────────────
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark') {
    applyTheme(true);
  } else if (saved === 'light') {
    applyTheme(false);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme(true);
  }

  // ─── 4. Build toggle button ────────────────────────────────────────────────
  const btn = document.createElement('button');
  btn.id = 'odm-theme-btn';
  btn.setAttribute('aria-label', 'Toggle dark / light mode');
  btn.title = 'Toggle dark / light mode';
  btn.innerHTML = iconHTML();

  btn.addEventListener('click', () => applyTheme(!isDark()));
  document.addEventListener('DOMContentLoaded', insertButton);

  function iconHTML() {
    // Moon icon (shown in light mode → click to go dark)
    const moon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="odm-icon-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    // Sun icon (shown in dark mode → click to go light)
    const sun  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="odm-icon-sun"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    return moon + sun;
  }

  function updateIcon() {
    const moon = btn.querySelector('.odm-icon-moon');
    const sun  = btn.querySelector('.odm-icon-sun');
    if (!moon || !sun) return;
    if (isDark()) {
      moon.style.display = 'none';
      sun.style.display  = 'block';
      btn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      moon.style.display = 'block';
      sun.style.display  = 'none';
      btn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  function insertButton() {
    updateIcon();

    // Desktop nav: insert before the mobile-menu toggle wrapper
    const mobileWrapper = document.querySelector('nav .flex.justify-between > div.-mr-2') ||
                          document.querySelector('nav .-mr-2.flex.items-center');

    if (mobileWrapper) {
      // Add the button to the right side of the desktop nav links section
      const desktopLinks = document.querySelector('nav .hidden.md\\:flex');
      if (desktopLinks) {
        // Wrap in a flex container that sits beside the nav links
        const wrapper = document.createElement('div');
        wrapper.className = 'hidden md:flex md:items-center md:ml-4';
        wrapper.appendChild(btn.cloneNode(true));
        wrapper.querySelector('#odm-theme-btn').addEventListener('click', () => applyTheme(!isDark()));
        desktopLinks.insertAdjacentElement('afterend', wrapper);
      }

      // Mobile nav: add a smaller version inside the mobile-menu toggle wrapper
      const mobileBtn = btn.cloneNode(true);
      mobileBtn.id = 'odm-theme-btn-mobile';
      mobileBtn.addEventListener('click', () => applyTheme(!isDark()));
      mobileWrapper.insertAdjacentElement('beforebegin', mobileBtn);
    }

    updateAllIcons();
  }

  function updateAllIcons() {
    document.querySelectorAll('#odm-theme-btn, #odm-theme-btn-mobile').forEach(b => {
      const moon = b.querySelector('.odm-icon-moon');
      const sun  = b.querySelector('.odm-icon-sun');
      if (!moon || !sun) return;
      if (isDark()) {
        moon.style.display = 'none';
        sun.style.display  = 'block';
      } else {
        moon.style.display = 'block';
        sun.style.display  = 'none';
      }
    });
  }

  // Keep all icon copies in sync whenever theme changes
  const _orig = applyTheme;
  window.__odmApplyTheme = function(dark) {
    _orig(dark);
    updateAllIcons();
  };

})();
