'use client'

import { motion } from 'framer-motion';
import { staggerItem } from '@/utils/animations';

/**
 * AnimatedItem - Individual item with stagger animation
 */
export default function AnimatedItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={staggerItem}
    >
      {children}
    </motion.div>
  );
}
