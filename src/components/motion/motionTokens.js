export const MOTION_EASE = [0.22, 1, 0.36, 1];
export const MOTION_EXIT_EASE = [0.4, 0, 1, 1];

export const SURFACE_HIDDEN = Object.freeze({
  opacity: 0.42,
  y: 14,
  scale: 0.985,
  filter: 'blur(6px)',
});

export const SURFACE_VISIBLE = Object.freeze({
  opacity: 1,
  y: 0,
  scale: 1,
  filter: 'blur(0px)',
});

export function staggerDelay(index, step = 0.055, cap = 0.3) {
  return Math.min(index * step, cap);
}
