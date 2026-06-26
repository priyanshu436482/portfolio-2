import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollReveal() {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let delay = 0;
    let timer = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (entry.target) entry.target.classList.add('visible');
            }, delay);
            delay += 250; // Stagger delay of 250ms per element in the batch
            observer.unobserve(entry.target);
          }
        });
        
        // Reset the batch delay if no new elements enter within a short window
        clearTimeout(timer);
        timer = setTimeout(() => { delay = 0; }, 100);
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const observeReveals = (root) => {
      const targets = root.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .reveal-stagger');
      targets.forEach((t) => observer.observe(t));
    };

    observeReveals(el);

    const mutObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1) {
            if (node.matches?.('.reveal, .reveal-scale, .reveal-left, .reveal-right, .reveal-stagger')) {
              observer.observe(node);
            }
            observeReveals(node);
          }
        }
      }
    });

    mutObserver.observe(el, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObserver.disconnect();
    };
  }, [location.pathname]);

  return ref;
}
