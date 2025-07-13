// Animation variants for weather effects
import type { Variants } from 'framer-motion';

export const cloudFloatAnimation: Variants = {
  initial: { y: 0, x: 0 },
  animate: {
    y: [0, -10, 0],
    x: [0, 5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut'
    }
  }
};

export const sunFloatAnimation: Variants = {
  initial: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.05, 1],
    rotate: [0, 5, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut'
    }
  }
};

export const rainDropAnimation: Variants = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 100,
    opacity: [0, 0.8, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'linear',
      delay: Math.random() * 2
    }
  }
};

export const snowflakeAnimation: Variants = {
  initial: { y: -20, x: 0, opacity: 0, rotate: 0 },
  animate: {
    y: 100,
    x: [0, 15, -15, 0],
    opacity: [0, 0.8, 0.8, 0],
    rotate: 360,
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'linear',
      delay: Math.random() * 5
    }
  }
};

export const lightningAnimation: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 0.9, 0],
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatDelay: 5 + Math.random() * 10,
      ease: 'easeOut'
    }
  }
};

export const fogAnimation: Variants = {
  initial: { opacity: 0, x: -100 },
  animate: {
    opacity: [0, 0.5, 0],
    x: 200,
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
      delay: Math.random() * 5
    }
  }
};

export const pulseAnimation: Variants = {
  initial: { scale: 0.95, opacity: 0.8 },
  animate: {
    scale: [0.95, 1, 0.95],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const hourglassCardAnimation: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const generateRaindrops = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    height: 10 + Math.random() * 15,
    delay: Math.random() * 2,
    duration: 0.7 + Math.random() * 0.5
  }));
};

export const generateSnowflakes = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * -50,
    size: 1 + Math.random() * 3,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 8
  }));
};

export const generateFogPatches = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    width: 50 + Math.random() * 100,
    height: 20 + Math.random() * 30,
    y: 10 + (i * 20),
    delay: Math.random() * 8,
    duration: 20 + Math.random() * 15
  }));
}; 