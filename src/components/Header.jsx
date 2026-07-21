import { List, SignOut, X } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useI18n } from '../i18n/I18nProvider.jsx';
import { BrandLockup } from './BrandLockup.jsx';
import { LanguageSwitcher } from './LanguageSwitcher.jsx';
import { MOTION_EASE, SURFACE_VISIBLE } from './motion/motionTokens.js';

const NAV_ITEMS = [
  ['nav.home', '/'],
  ['nav.vote', '/vote'],
];

export function Header({ session, showResults = false, onSignIn, onLogout }) {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userLabel = session.user?.name || session.user?.twitterUsername || t('nav.member');
  const navigationItems = showResults ? [...NAV_ITEMS, ['nav.results', '/results']] : NAV_ITEMS;

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

  const panelTransition = { duration: reduceMotion ? 0 : 0.24, ease: MOTION_EASE };

  return (
    <header className={`site-header site-header--entry ${scrolled || menuOpen || profileOpen ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__inner page-shell">
        <BrandLockup compact />
        <nav className="desktop-nav" aria-label={t('nav.primary')}>
          {navigationItems.map(([labelKey, href]) => (
            <NavLink key={href} to={href} end={href === '/'}>{t(labelKey)}</NavLink>
          ))}
        </nav>
        <div className="site-header__actions">
          <LanguageSwitcher />
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
              <AnimatePresence initial={false}>
                {profileOpen ? (
                  <motion.div
                    className="profile-menu__popover"
                    initial={reduceMotion ? false : { opacity: 0.48, y: -8, scale: 0.985, filter: 'blur(4px)' }}
                    animate={SURFACE_VISIBLE}
                    exit={reduceMotion ? undefined : { opacity: 0.56, y: -6, scale: 0.99, filter: 'blur(2px)', transition: { duration: 0.14 } }}
                    transition={panelTransition}
                  >
                    <p>{t('nav.signedIn')}</p>
                    {session.user?.safeWalletAddress ? <code>{shortAddress(session.user.safeWalletAddress)}</code> : <span>{t('nav.walletPending')}</span>}
                    <button type="button" onClick={onLogout}><SignOut size={17} /> {t('nav.signOut')}</button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ) : (
            <button className="button button--header" type="button" onClick={onSignIn}>{t('nav.signIn')}</button>
          )}
          <button
            className="menu-toggle"
            type="button"
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? t('nav.close') : t('nav.open')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={24} /> : <List size={25} />}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label={t('nav.mobile')}
            initial={reduceMotion ? false : { opacity: 0.48, y: -8, scale: 0.99, filter: 'blur(4px)' }}
            animate={SURFACE_VISIBLE}
            exit={reduceMotion ? undefined : { opacity: 0.56, y: -8, scale: 0.99, filter: 'blur(2px)', transition: { duration: 0.14 } }}
            transition={panelTransition}
          >
            {navigationItems.map(([labelKey, href]) => <NavLink key={href} to={href} end={href === '/'} onClick={closeMenu}>{t(labelKey)}</NavLink>)}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function shortAddress(value) {
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
}
