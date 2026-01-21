'use client'

import { useEffect, useRef } from 'react';

/**
 * AnimatedContainer - Container with stagger animation for children
 */
export default function AnimatedContainer({ children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.stagger-item');
    if (items.length === 0) return;

    const checkInitialVisibility = () => {
      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const isInView = rect.top < windowHeight + 200 && rect.bottom > -100;
        
        if (isInView) {
          items.forEach((item) => {
            if (!item.classList.contains('is-visible')) {
              item.classList.add('is-visible');
            }
          });
        }
      });
    };

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
    checkInitialVisibility();
    setTimeout(checkInitialVisibility, 50);
    setTimeout(checkInitialVisibility, 200);
    setTimeout(checkInitialVisibility, 500);

    return () => {
      observer.unobserve(container);
    };
  }, []);
  
  return (
    <div ref={containerRef} className={`stagger-container ${className}`}>
      {children}
    </div>
  );
}
