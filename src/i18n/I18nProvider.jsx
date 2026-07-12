import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';

import { detectInitialLocale, localeConfig, LOCALES, LOCALE_STORAGE_KEY } from './config.js';
import { en } from './locales/en.js';
import { ko } from './locales/ko.js';
import { zhHant } from './locales/zh-Hant.js';

const MESSAGES = Object.freeze({ en, 'zh-Hant': zhHant, ko });
const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(detectInitialLocale);
  const config = localeConfig(locale);

  const setLocale = useCallback((nextLocale) => {
    localeConfig(nextLocale);
    setLocaleState(nextLocale);
  }, []);

  const t = useCallback((key, values = {}) => {
    const template = MESSAGES[locale][key];
    if (typeof template !== 'string') throw new Error(`Missing ${locale} translation: ${key}`);
    return template.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, name) => (
      Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : match
    ));
  }, [locale]);

  useLayoutEffect(() => {
    document.documentElement.lang = config.htmlLang;
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (description) description.setAttribute('content', t('meta.description'));
    if (ogTitle) ogTitle.setAttribute('content', t('meta.ogTitle'));
    if (ogDescription) ogDescription.setAttribute('content', t('meta.ogDescription'));
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Language still applies for the current visit when storage is unavailable.
    }
  }, [config.htmlLang, locale, t]);

  const value = useMemo(() => ({
    locale,
    intlLocale: config.intl,
    locales: LOCALES,
    setLocale,
    t,
  }), [config.intl, locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
