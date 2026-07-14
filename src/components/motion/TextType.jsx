import { useEffect, useMemo, useRef, useState } from 'react';

function segmentText(value, locale) {
  if (typeof Intl.Segmenter === 'function') {
    return Array.from(new Intl.Segmenter(locale, { granularity: 'grapheme' }).segment(value), ({ segment }) => segment);
  }

  return Array.from(value);
}

export function TextType({
  as: Element = 'span',
  className,
  completionDelay = 0,
  cursorClassName,
  initialDelay = 120,
  locale,
  onComplete,
  showCursor = true,
  text,
  typingSpeed = 72,
}) {
  const characters = useMemo(() => segmentText(text, locale), [locale, text]);
  const completeRef = useRef(onComplete);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    let interval = 0;
    let completionTimer = 0;
    let completed = false;

    setCharacterCount(reducedMotion ? characters.length : 0);

    const finish = () => {
      if (cancelled || completed) return;
      completed = true;
      if (completionDelay > 0) {
        completionTimer = window.setTimeout(() => {
          if (!cancelled) completeRef.current?.();
        }, completionDelay);
        return;
      }
      completeRef.current?.();
    };

    if (reducedMotion || !characters.length) {
      finish();
    } else {
      const startedAt = window.performance.now();
      const revealCharacters = () => {
        if (cancelled) return;
        const elapsed = window.performance.now() - startedAt;
        if (elapsed < initialDelay) return;

        const count = Math.min(
          characters.length,
          Math.floor((elapsed - initialDelay) / typingSpeed) + 1,
        );
        setCharacterCount((current) => (current === count ? current : count));
        if (count >= characters.length) finish();
      };

      interval = window.setInterval(revealCharacters, Math.min(Math.max(typingSpeed, 16), 50));
      revealCharacters();
    }

    return () => {
      cancelled = true;
      if (interval) window.clearInterval(interval);
      if (completionTimer) window.clearTimeout(completionTimer);
    };
  }, [characters, completionDelay, initialDelay, typingSpeed]);

  return (
    <Element className={`text-type${className ? ` ${className}` : ''}`} aria-label={text}>
      <span className="text-type__placeholder" aria-hidden="true">{text}</span>
      <span className="text-type__typed" aria-hidden="true">
        {characters.slice(0, characterCount).map((character, index) => (
          <span className="text-type__character" key={`${index}-${character}`}>{character}</span>
        ))}
        {showCursor && characterCount < characters.length ? <span className={`text-type__caret${cursorClassName ? ` ${cursorClassName}` : ''}`} /> : null}
      </span>
    </Element>
  );
}
