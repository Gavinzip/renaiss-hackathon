import { DiscordLogo, XLogo } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { useI18n } from '../i18n/I18nProvider.jsx';
import { BrandLockup } from './BrandLockup.jsx';
import { Reveal } from './motion/Reveal.jsx';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__grid">
        <Reveal className="site-footer__brand" distance={12} scale={0.995}>
          <BrandLockup compact />
          <p>{t('footer.tagline')}</p>
        </Reveal>
        <Reveal className="site-footer__column" delay={0.075} distance={12} scale={0.995}>
          <h3>{t('footer.explore')}</h3>
          <Link to="/">{t('footer.home')}</Link>
          <Link to="/vote#projects">{t('footer.startVote')}</Link>
          <Link to="/#rules">{t('footer.rules')}</Link>
        </Reveal>
        <Reveal className="site-footer__column" delay={0.15} distance={12} scale={0.995}>
          <h3>Renaiss</h3>
          <a href="https://renaiss.xyz" target="_blank" rel="noreferrer">{t('footer.protocol')}</a>
          <a href="https://x.com/renaissxyz" target="_blank" rel="noreferrer">{t('footer.protocolX')}</a>
          <a href="https://x.com/Tastedotmd" target="_blank" rel="noreferrer">{t('footer.labX')}</a>
        </Reveal>
        <Reveal className="site-footer__column" delay={0.225} distance={12} scale={0.995}>
          <h3>{t('footer.community')}</h3>
          <div className="social-links">
            <a href="https://x.com/Tastedotmd" target="_blank" rel="noreferrer" aria-label={t('footer.labX')}><XLogo weight="fill" /></a>
            <a href="https://discord.com/invite/renaiss" target="_blank" rel="noreferrer" aria-label="Renaiss Discord"><DiscordLogo weight="fill" /></a>
          </div>
          <p>{t('footer.follow')}</p>
        </Reveal>
      </div>
      <Reveal className="page-shell site-footer__bottom" delay={0.28} distance={10} scale={0.998}>
        <span>{t('footer.rights')}</span>
      </Reveal>
    </footer>
  );
}
