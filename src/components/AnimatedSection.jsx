'use client'

import { useScrollAnimation } from '@/utils/useScrollAnimation';

/**
 * AnimatedSection - Wrapper component for sections with scroll-triggered animations
 */
export default function AnimatedSection({ children, className = '', delay = 0, animationType = 'fade-in-up' }) {
  const ref = useScrollAnimation({ animationType, once: true });
  
  return (
    <section
      ref={ref}
      className={className}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </section>
  );
}
