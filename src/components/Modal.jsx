import { X } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

export function Modal({
  open,
  onClose,
  title,
  children,
  className = '',
  layoutId,
  titleLayoutId,
  transition,
}) {
  const titleId = useId();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const appRoot = document.getElementById('root');
    const previousInert = appRoot?.inert || false;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    if (appRoot) appRoot.inert = true;
    panelRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter((element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true');
      if (!focusable.length) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (appRoot) appRoot.inert = previousInert;
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [onClose, open]);

  if (layoutId) {
    return createPortal(
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            className="modal-backdrop modal-backdrop--linear"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.4, 1] }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
          >
            <motion.section
              ref={panelRef}
              className={`modal-panel modal-panel--linear ${className}`}
              layoutId={layoutId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex="-1"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={transition}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="modal-panel__header">
                <motion.h2 id={titleId} layoutId={titleLayoutId} layout="position" transition={transition}>{title}</motion.h2>
                <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={22} /></button>
              </div>
              {children}
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );
  }

  if (!open) return null;

  return createPortal(
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={panelRef} className={`modal-panel ${className}`} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex="-1">
        <div className="modal-panel__header">
          <h2 id={titleId}>{title}</h2>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={22} /></button>
        </div>
        {children}
      </section>
    </div>,
    document.body,
  );
}
