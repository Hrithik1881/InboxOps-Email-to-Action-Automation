import { animate, createScope, createTimeline, stagger } from 'animejs';
import { isReducedMotionPreferred, MOTION_DURATIONS, MOTION_EASINGS } from './tokens.js';

export interface ScopeCleanup {
  revert: () => void;
}

/**
 * Creates an Anime.js v4 animation scope bounded to a DOM container.
 * Automatically handles cleanup and respects reduced motion.
 */
export function createScopedMotion(
  root: HTMLElement,
  initFn: (scope: ReturnType<typeof createScope>) => void
): ScopeCleanup {
  if (isReducedMotionPreferred()) {
    return { revert: () => {} };
  }

  const scope = createScope({ root });
  try {
    initFn(scope);
  } catch (err) {
    console.error('[InboxOps Motion] Scope initialization error:', err);
  }

  return {
    revert: () => {
      try {
        scope.revert();
      } catch {
        // Safe disposal
      }
    },
  };
}

/**
 * Smooth KPI Number Count-up using Anime.js v4.
 */
export function animateCountUp(
  targetEl: HTMLElement,
  finalValue: number,
  options: {
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  } = {}
) {
  if (isReducedMotionPreferred()) {
    const decimals = options.decimals ?? 0;
    targetEl.textContent = `${options.prefix ?? ''}${finalValue.toFixed(decimals)}${options.suffix ?? ''}`;
    return;
  }

  const holder = { val: 0 };
  const decimals = options.decimals ?? 0;
  const prefix = options.prefix ?? '';
  const suffix = options.suffix ?? '';

  animate(holder, {
    val: finalValue,
    duration: options.duration ?? MOTION_DURATIONS.hero,
    ease: MOTION_EASINGS.subtleDecel,
    onRender: () => {
      targetEl.textContent = `${prefix}${holder.val.toFixed(decimals)}${suffix}`;
    },
  });
}

/**
 * Staggered Entrance for lists, table rows, and card grids.
 */
export function animateStaggerEntrance(
  targets: HTMLElement[] | string,
  options: {
    displacement?: number;
    staggerMs?: number;
    duration?: number;
  } = {}
) {
  if (isReducedMotionPreferred()) return;

  const dy = options.displacement ?? 8;
  animate(targets, {
    opacity: [0, 1],
    translateY: [dy, 0],
    delay: stagger(options.staggerMs ?? MOTION_DURATIONS.staggerInterval),
    duration: options.duration ?? MOTION_DURATIONS.component,
    ease: MOTION_EASINGS.enter,
  });
}

/**
 * Coordinated Proposal Verification Sequence (Split-Pane Transition)
 */
export function animateProposalVerification(
  cardEl: HTMLElement,
  badgeEl: HTMLElement,
  onComplete?: () => void
) {
  if (isReducedMotionPreferred()) {
    onComplete?.();
    return;
  }

  const tl = createTimeline({
    defaults: { ease: MOTION_EASINGS.enter },
    onComplete,
  });

  tl.add(badgeEl, {
    scale: [1, 1.12, 1],
    duration: MOTION_DURATIONS.micro,
  })
  .add(cardEl, {
    opacity: [1, 0.95, 1],
    duration: MOTION_DURATIONS.component,
  }, '-=80');
}
