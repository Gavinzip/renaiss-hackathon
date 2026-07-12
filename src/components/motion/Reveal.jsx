import { useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const DIRECTION_OFFSET = Object.freeze({
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
  up: { y: 1 },
});

export function Reveal({
  as = 'div',
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.64,
  role,
  scale = 0.985,
}) {
  const reduceMotion = useReducedMotion();
  const nodeRef = useRef(null);
  const [revealed, setRevealed] = useState(reduceMotion);
  const offset = DIRECTION_OFFSET[direction] || DIRECTION_OFFSET.up;

  useEffect(() => {
    if (reduceMotion) {
      setRevealed(true);
      return undefined;
    }

    const node = nodeRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setRevealed(true);
      observer.disconnect();
    }, { threshold: 0.18 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const entryProps = {
    ref: nodeRef,
    className: `entry-reveal${revealed ? ' entry-reveal--visible' : ''}${className ? ` ${className}` : ''}`,
    role,
    style: {
      '--entry-delay': `${delay}s`,
      '--entry-duration': `${duration}s`,
      '--entry-scale': scale,
      '--entry-x': `${(offset.x || 0) * distance}px`,
      '--entry-y': `${(offset.y || 0) * distance}px`,
    },
  };

  if (as === 'article') return <article {...entryProps}>{children}</article>;
  if (as === 'p') return <p {...entryProps}>{children}</p>;
  return <div {...entryProps}>{children}</div>;
}
