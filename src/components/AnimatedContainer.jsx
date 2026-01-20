'use client'

import { motion } from 'framer-motion';
import { staggerContainer, fadeInOnScroll } from '@/utils/animations';

/**
 * AnimatedContainer - Container with stagger animation for children
 */
export default function AnimatedContainer({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={fadeInOnScroll.initial}
      whileInView={fadeInOnScroll.whileInView}
      viewport={fadeInOnScroll.viewport}
      variants={staggerContainer}
      transition={fadeInOnScroll.transition}
    >
      {children}
    </motion.div>
  );
}
