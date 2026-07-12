import { GlobeSimple } from '@phosphor-icons/react';

import { useI18n } from '../i18n/I18nProvider.jsx';

export function LanguageSwitcher() {
  const { locale, locales, setLocale, t } = useI18n();

  return (
    <label className="language-switcher">
      <GlobeSimple size={17} weight="duotone" aria-hidden="true" />
      <span className="sr-only">{t('language.label')}</span>
      <select value={locale} onChange={(event) => setLocale(event.target.value)} aria-label={t('language.label')}>
        {locales.map((option) => (
          <option key={option.code} value={option.code}>{option.shortLabel}</option>
        ))}
      </select>
    </label>
  );
}
