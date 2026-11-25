/**
 * Veloce Web — Minimal Studio Portfolio Scripts
 * - Sticky header scroll shadow
 * - Native <dialog> mobile navigation drawer with closedby="any" fallback
 * - One-click email copy with accessible feedback
 */

(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const mobileNavDialog = document.getElementById('mobile-nav-dialog');
  const openMobileNavBtn = document.getElementById('open-mobile-nav');
  const closeMobileNavBtn = document.getElementById('close-mobile-nav');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  // Sticky header elevation
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Light-dismiss fallback for <dialog closedby="any">
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    const isOutside = (e, dialog) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };
    let pressedOutside = false;
    mobileNavDialog.addEventListener('pointerdown', (e) => {
      pressedOutside = isOutside(e, mobileNavDialog);
    });
    mobileNavDialog.addEventListener('pointerup', (e) => {
      if (pressedOutside && isOutside(e, mobileNavDialog)) {
        mobileNavDialog.close();
      }
    });
  }

  // Mobile navigation drawer
  openMobileNavBtn.addEventListener('click', () => {
    if (!mobileNavDialog.open) mobileNavDialog.showModal();
  });

  closeMobileNavBtn.addEventListener('click', () => mobileNavDialog.close());

  mobileNavDialog.querySelectorAll('[data-close-drawer]').forEach((link) => {
    link.addEventListener('click', () => mobileNavDialog.close());
  });

  // One-click copy email
  if (copyEmailBtn) {
    let resetTimer;
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.dataset.email || '';
      try {
        await navigator.clipboard.writeText(email);
        copyEmailBtn.textContent = 'Copied!';
      } catch {
        copyEmailBtn.textContent = email;
      }
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        copyEmailBtn.textContent = 'Copy Email';
      }, 2000);
    });
  }
})();
