'use client'

import { motion } from 'framer-motion';
import { scrollReveal } from '@/utils/animations';

/**
 * AnimatedSection - Wrapper component for sections with scroll-triggered animations
 */
export default function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.section
      className={className}
      initial={scrollReveal.initial}
      whileInView={scrollReveal.whileInView}
      viewport={scrollReveal.viewport}
      transition={{ ...scrollReveal.transition, delay }}
    >
      {children}
    </motion.section>
  );
}
