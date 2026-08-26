import { useEffect, useRef, useState } from 'react';

/**
 * Hook Parallaxe haute performance (Scroll + Souris)
 * Usage: const { scrollOffset, mouseOffset, heroRef } = useHeroParallax();
 */
export function useHeroParallax() {
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (rect.width / 2); // -1 to +1
      const y = (e.clientY - centerY) / (rect.height / 2); // -1 to +1

      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { scrollY, mousePos, heroRef };
}

/**
 * Hook individuel pour observer un élément
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
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold ?? 0.08,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}

/**
 * Système d'observation global ultra-robuste avec MutationObserver
 * Détecte automatiquement tous les éléments .reveal-* dans tout le site
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

  const observedSet = new WeakSet();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  const scanAndObserve = () => {
    const elements = document.querySelectorAll(selectors.join(', '));
    elements.forEach((el) => {
      if (!observedSet.has(el)) {
        observedSet.add(el);
        observer.observe(el);
      }
    });
  };

  // Premier scan
  scanAndObserve();

  // Observer les changements DOM pour les nouvelles routes ou lazy-loading
  const mutationObserver = new MutationObserver(() => {
    scanAndObserve();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    observer.disconnect();
    mutationObserver.disconnect();
  };
}
