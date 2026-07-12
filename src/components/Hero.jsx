import { ArrowRight, BookOpenText, Ticket } from '@phosphor-icons/react';
import { useReducedMotion } from 'motion/react';
import { useState } from 'react';

import { useI18n } from '../i18n/I18nProvider.jsx';
import { staticAssetCssUrl } from '../lib/staticAssets.js';
import { RenaissMetalButton } from './metal/RenaissMetalButton.jsx';
import { TextType } from './motion/TextType.jsx';
import { Iridescence } from './react-bits/Iridescence.jsx';

const IRIDESCENCE_COLOR = [0.52, 0.34, 0.78];

export function Hero({ projectCount }) {
  const { locale, t } = useI18n();
  const reduceMotion = useReducedMotion();
  const title = t('hero.title');
  const [completedTitle, setCompletedTitle] = useState(null);
  const titleReady = reduceMotion || completedTitle === title;

  return (
    <section className="hero" id="top">
      <div className="hero__image" aria-hidden="true" style={{ '--hero-image': staticAssetCssUrl('/assets/hackathon-vote-hero-crt-4a48559f.webp') }} />
      <Iridescence className="hero__iridescence" color={IRIDESCENCE_COLOR} speed={0.34} amplitude={0.075} mouseReact={false} />
      <div className="hero__halo hero__halo--violet" aria-hidden="true" />
      <div className="hero__halo hero__halo--cyan" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />
      <div className="page-shell hero__inner">
        <div className="hero__copy">
          <div className="hero__kicker-slot">
            {titleReady ? <span className="hero__kicker hero__entry hero__entry--kicker">{t('hero.kicker')}</span> : null}
          </div>
          <TextType
            as="h1"
            className="hero__title"
            initialDelay={reduceMotion ? 0 : 180}
            locale={locale}
            onComplete={() => setCompletedTitle(title)}
            text={title}
            typingSpeed={35}
          />
          {titleReady ? (
            <>
              <p className="hero__entry hero__entry--summary">{t('hero.summary', { count: projectCount })}</p>
              <div className="hero__actions hero__entry hero__entry--actions">
                <RenaissMetalButton
                  to="/vote#projects"
                  tone="light"
                  leading={<Ticket size={18} weight="bold" />}
                  trailing={<ArrowRight size={17} weight="bold" />}
                >
                  {t('hero.startVote')}
                </RenaissMetalButton>
                <RenaissMetalButton
                  to="/#rules"
                  leading={<BookOpenText size={18} weight="bold" />}
                >
                  {t('hero.readRules')}
                </RenaissMetalButton>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
