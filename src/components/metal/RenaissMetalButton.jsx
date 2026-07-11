import { Link } from 'react-router-dom';

import { Magnet } from './Magnet.jsx';

export function RenaissMetalButton({
  children,
  className = '',
  disabled = false,
  href,
  leading,
  onClick,
  target,
  tone = 'dark',
  to,
  trailing,
  type = 'button',
  ...props
}) {
  const classes = [
    'renaiss-metal-button',
    tone === 'light' ? 'is-light' : '',
    disabled ? 'is-disabled' : '',
    className,
  ].filter(Boolean).join(' ');
  const content = (
    <>
      {leading}
      <span>{children}</span>
      {trailing}
    </>
  );

  let control;
  if (to) {
    control = (
      <Link
        className={classes}
        to={to}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
        {...props}
      >
        {content}
      </Link>
    );
  } else if (href) {
    control = (
      <a
        className={classes}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noreferrer' : undefined}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
        {...props}
      >
        {content}
      </a>
    );
  } else {
    control = (
      <button className={classes} type={type} disabled={disabled} onClick={onClick} {...props}>
        {content}
      </button>
    );
  }

  return <Magnet className="renaiss-metal-button__magnet" motionDisabled={disabled}>{control}</Magnet>;
}
