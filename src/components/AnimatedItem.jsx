'use client'

/**
 * AnimatedItem - Individual item with stagger animation
 */
export default function AnimatedItem({ children, className = '' }) {
  return (
    <div className={`stagger-item ${className}`}>
      {children}
    </div>
  );
}
