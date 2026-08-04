/**
 * One Day Multimedia — Page Transition Loader
 * Shows an animated printer loader when navigating between pages.
 */
(function () {

  // ─── Build the loader overlay ──────────────────────────────────────────────
  function buildLoader() {
    const style = document.createElement('style');
    style.textContent = `
      /* ── overlay ── */
      #odm-loader {
        position: fixed;
        inset: 0;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #111827;           /* gray-900 */
        transition: opacity 0.4s ease;
      }
      #odm-loader.odm-loader-hide {
        opacity: 0;
        pointer-events: none;
      }

      /* ── printer body ── */
      .odm-printer {
        position: relative;
        width: 110px;
        height: 70px;
        background: #1f2937;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
      }

      /* top lip of the printer */
      .odm-printer::before {
        content: '';
        position: absolute;
        top: -16px;
        left: 14px;
        right: 14px;
        height: 20px;
        background: #374151;
        border-radius: 6px 6px 0 0;
      }

      /* output tray at the bottom */
      .odm-printer::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 20px;
        right: 20px;
        height: 10px;
        background: #1f2937;
        border-radius: 0 0 6px 6px;
      }

      /* paper slot */
      .odm-slot {
        position: absolute;
        top: 50%;
        left: 8px;
        right: 8px;
        height: 6px;
        background: #111827;
        border-radius: 2px;
        transform: translateY(-50%);
        overflow: hidden;
      }

      /* status light */
      .odm-light {
        position: absolute;
        top: 10px;
        right: 14px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #dc2626;
        animation: odm-blink 0.9s ease-in-out infinite;
      }

      @keyframes odm-blink {
        0%, 100% { opacity: 1;   box-shadow: 0 0 6px #dc2626; }
        50%       { opacity: 0.2; box-shadow: none; }
      }

      /* ── paper sheet ── */
      .odm-paper {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 72px;
        background: #f9fafb;
        border-radius: 2px;
        /* starts hidden above slot, ends below printer */
        top: calc(50% - 3px);          /* aligned with slot centre */
        height: 4px;                   /* thin slice visible at start */
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        animation: odm-feed 1.4s ease-in-out infinite;
        transform-origin: top center;
      }

      @keyframes odm-feed {
        0%   { top: calc(50% - 3px); height: 4px;  opacity: 1; }
        60%  { top: calc(50% - 3px); height: 52px; opacity: 1; }
        80%  { top: calc(50% - 3px); height: 52px; opacity: 1; }
        100% { top: calc(50% + 30px);height: 52px; opacity: 0; }
      }

      /* red stripe printed on the paper */
      .odm-paper::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 10px;
        right: 10px;
        height: 3px;
        background: #dc2626;
        border-radius: 2px;
        opacity: 0;
        animation: odm-stripe 1.4s ease-in-out infinite;
      }

      @keyframes odm-stripe {
        0%, 30% { opacity: 0; }
        60%     { opacity: 1; }
        100%    { opacity: 0; }
      }

      /* second stripe */
      .odm-paper::after {
        content: '';
        position: absolute;
        top: 16px;
        left: 10px;
        width: 40%;
        height: 3px;
        background: #6b7280;
        border-radius: 2px;
        opacity: 0;
        animation: odm-stripe 1.4s ease-in-out 0.15s infinite;
      }

      /* ── text label ── */
      .odm-label {
        margin-top: 32px;
        font-family: ui-sans-serif, system-ui, sans-serif;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #9ca3af;
      }

      /* animated ellipsis */
      .odm-dots::after {
        content: '';
        animation: odm-ellipsis 1.4s steps(4, end) infinite;
      }
      @keyframes odm-ellipsis {
        0%   { content: '';   }
        25%  { content: '.';  }
        50%  { content: '..'; }
        75%  { content: '...'; }
        100% { content: '';   }
      }

      /* ── brand mark ── */
      .odm-brand {
        margin-top: 10px;
        font-family: ui-sans-serif, system-ui, sans-serif;
        font-size: 11px;
        color: #374151;
        letter-spacing: 0.08em;
      }
      .odm-brand span { color: #dc2626; font-weight: 700; }
    `;
    document.head.appendChild(style);

    const loader = document.createElement('div');
    loader.id = 'odm-loader';
    loader.innerHTML = `
      <div class="odm-printer">
        <div class="odm-slot"></div>
        <div class="odm-light"></div>
        <div class="odm-paper"></div>
      </div>
      <p class="odm-label">Printing<span class="odm-dots"></span></p>
      <p class="odm-brand"><span>ONE DAY</span> MULTIMEDIA</p>
    `;
    document.body.appendChild(loader);
    return loader;
  }

  // ─── Show / hide helpers ───────────────────────────────────────────────────
  function showLoader(loader) {
    loader.classList.remove('odm-loader-hide');
  }

  function hideLoader(loader) {
    loader.classList.add('odm-loader-hide');
    // Remove from DOM after fade completes
    setTimeout(() => loader.remove(), 450);
  }

  // ─── Main logic ────────────────────────────────────────────────────────────
  const loader = buildLoader();

  // Hide loader once the page has fully painted
  window.addEventListener('load', () => {
    // Small delay so the animation is visible for at least a moment
    setTimeout(() => hideLoader(loader), 350);
  });

  // Safety net: hide after 3 s even if load event is slow
  setTimeout(() => {
    if (document.getElementById('odm-loader')) hideLoader(loader);
  }, 3000);

  // Intercept internal page navigation links
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');

    // Only intercept same-origin internal HTML links (not #, mailto:, tel:, external, javascript:)
    if (!href
      || href.startsWith('#')
      || href.startsWith('mailto:')
      || href.startsWith('tel:')
      || href.startsWith('http')
      || href.startsWith('javascript')
      || anchor.target === '_blank'
    ) return;

    // It's an internal page link — show the loader, let the browser navigate
    e.preventDefault();

    const newLoader = buildLoader();
    showLoader(newLoader);

    // Navigate after one animation frame so the loader paints first
    requestAnimationFrame(() => {
      setTimeout(() => { window.location.href = href; }, 80);
    });
  });

})();
