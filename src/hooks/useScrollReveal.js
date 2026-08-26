import { useEffect, useRef } from 'react';

/**
 * Hook Intersection Observer — ajoute/retire des classes CSS au scroll
 * Usage: const ref = useScrollReveal();  <div ref={ref} className="reveal" />
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Ne re-observe pas — l'animation joue une fois
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Initialise l'Intersection Observer sur tous les éléments .reveal-* du DOM
 * Appeler une fois dans App.jsx après le montage
 */
export function initGlobalScrollReveal() {
  const selectors = [
    '.reveal',
    '.reveal-up',
    '.reveal-left',
    '.reveal-right',
    '.reveal-scale',
    '.reveal-fade',
    '.stagger-children',
  ];

  const elements = document.querySelectorAll(selectors.join(', '));

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}
