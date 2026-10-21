/**
 * InboxOps Motion Design Tokens
 * Adheres strictly to enterprise motion guidelines:
 * - Micro-interactions: 150–200ms
 * - Component transitions: 250–400ms
 * - Hero sequences: 400–700ms
 * - Spatial displacement: 4–12px
 */

export const MOTION_DURATIONS = {
  micro: 180,
  component: 320,
  panel: 380,
  hero: 550,
  staggerInterval: 45,
} as const;

export const MOTION_EASINGS = {
  enter: 'outQuad',
  exit: 'inQuad',
  standard: 'inOutQuad',
  subtleDecel: 'outCubic',
} as const;

export const MOTION_DISTANCES = {
  subtle: 6,
  standard: 10,
  panel: 14,
} as const;

export function isReducedMotionPreferred(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
