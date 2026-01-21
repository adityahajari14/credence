'use client'

import { useEffect, useRef } from 'react';

/**
 * Hook to add scroll-triggered animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {string} options.animationType - Type of animation: 'fade-in', 'fade-in-up', 'fade-in-down', 'slide-in-right', 'slide-in-left', 'scale-in'
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Root margin for intersection observer
 * @param {boolean} options.once - Whether to animate only once
 */
export function useScrollAnimation(options = {}) {
  const {
    animationType = 'fade-in-up',
    threshold = 0.1,
    rootMargin = '-50px',
    once = true
  } = options;

  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add initial animation classes
    element.classList.add('animate-on-scroll', animationType);

    // Check if element is already in view on mount
    const checkInitialVisibility = () => {
      // Use requestAnimationFrame to ensure layout is complete
      requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        // Check if element is in viewport (with some margin)
        const isInView = rect.top < windowHeight + 100 && rect.bottom > -100;
        if (isInView) {
          // Add visible class immediately
          element.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);
    
    // Check initial visibility - run multiple times to catch different states
    checkInitialVisibility();
    setTimeout(checkInitialVisibility, 50);
    setTimeout(checkInitialVisibility, 200);
    setTimeout(checkInitialVisibility, 500);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [animationType, threshold, rootMargin, once]);

  return elementRef;
}

/**
 * Hook to initialize scroll animations for multiple elements
 * Call this in a useEffect to set up animations for elements with .animate-on-scroll class
 */
export function useScrollAnimations() {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check initial visibility for elements already in view
    const checkInitialVisibility = () => {
      requestAnimationFrame(() => {
        animatedElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          // Check if element is in viewport (with some margin)
          const isInView = rect.top < windowHeight + 100 && rect.bottom > -100;
          if (isInView && !el.classList.contains('is-visible')) {
            el.classList.add('is-visible');
          }
        });
      });
    };
    
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
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
    
    // Check initial visibility - run multiple times to catch different states
    checkInitialVisibility();
    setTimeout(checkInitialVisibility, 50);
    setTimeout(checkInitialVisibility, 200);
    setTimeout(checkInitialVisibility, 500);

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

/**
 * Hook for stagger animations
 */
export function useStaggerAnimation() {
  useEffect(() => {
    const containers = document.querySelectorAll('.stagger-container');
    if (containers.length === 0) return;

    const checkInitialVisibility = (container) => {
      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const isInView = rect.top < windowHeight + 200 && rect.bottom > -100;
        
        if (isInView) {
          const items = container.querySelectorAll('.stagger-item');
          items.forEach((item) => {
            if (!item.classList.contains('is-visible')) {
              item.classList.add('is-visible');
            }
          });
        }
      });
    };

    containers.forEach((container) => {
      const items = container.querySelectorAll('.stagger-item');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              items.forEach((item) => {
                item.classList.add('is-visible');
              });
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '-50px'
        }
      );

      observer.observe(container);
      
      // Check initial visibility - run multiple times
      checkInitialVisibility(container);
      setTimeout(() => checkInitialVisibility(container), 50);
      setTimeout(() => checkInitialVisibility(container), 200);
      setTimeout(() => checkInitialVisibility(container), 500);

      return () => {
        observer.unobserve(container);
      };
    });
  }, []);
}
