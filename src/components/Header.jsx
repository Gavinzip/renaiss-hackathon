import { List, SignOut, X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { BrandLockup } from './BrandLockup.jsx';

const NAV_ITEMS = [
  ['Home', '/'],
  ['Vote', '/vote'],
  ['Rules', '/rules'],
];

export function Header({ session, onSignIn, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userLabel = session.user?.name || session.user?.twitterUsername || 'Renaiss member';

  useEffect(() => {
    const updateHeader = () => {
      const next = window.scrollY > 24;
      setScrolled((current) => (current === next ? current : next));
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled || menuOpen || profileOpen ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__inner page-shell">
        <BrandLockup compact />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map(([label, href]) => (
            <NavLink key={href} to={href} end={href === '/'}>{label}</NavLink>
          ))}
        </nav>
        <div className="site-header__actions">
          {session.authenticated ? (
            <div className="profile-menu">
              <button
                className="profile-button"
                type="button"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((value) => !value)}
              >
                {session.user?.picture ? <img src={session.user.picture} alt="" /> : <span>{userLabel.slice(0, 1).toUpperCase()}</span>}
                <strong>{userLabel}</strong>
              </button>
              {profileOpen ? (
                <div className="profile-menu__popover">
                  <p>Signed in with Renaiss</p>
                  {session.user?.safeWalletAddress ? <code>{shortAddress(session.user.safeWalletAddress)}</code> : <span>Safe wallet not ready</span>}
                  <button type="button" onClick={onLogout}><SignOut size={17} /> Sign out</button>
                </div>
              ) : null}
            </div>
          ) : (
            <button className="button button--header" type="button" onClick={onSignIn}>Sign in with Renaiss</button>
          )}
          <button
            className="menu-toggle"
            type="button"
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={24} /> : <List size={25} />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {NAV_ITEMS.map(([label, href]) => <NavLink key={href} to={href} end={href === '/'} onClick={closeMenu}>{label}</NavLink>)}
        </nav>
      ) : null}
    </header>
  );
}

function shortAddress(value) {
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
}
