// Simplified, professional animation variants

// Simple fade in on scroll - most common animation
export const fadeInOnScroll = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Fade in with subtle upward movement
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Stagger container for lists - simplified
export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  viewport: { once: true, margin: "-50px" }
};

// Stagger item - simple fade in
export const staggerItem = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Simple hover effect - subtle lift
export const hoverLift = {
  whileHover: { y: -2 },
  transition: { duration: 0.2, ease: "easeOut" }
};

// Scroll reveal - simplified
export const scrollReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};
