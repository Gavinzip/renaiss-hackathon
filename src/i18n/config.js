export const LOCALE_STORAGE_KEY = 'renaiss-hackathon-locale';

export const LOCALES = Object.freeze([
  Object.freeze({ code: 'en', intl: 'en-US', htmlLang: 'en', shortLabel: 'EN', label: 'English' }),
  Object.freeze({ code: 'zh-Hant', intl: 'zh-TW', htmlLang: 'zh-Hant', shortLabel: '繁中', label: '繁體中文' }),
  Object.freeze({ code: 'ko', intl: 'ko-KR', htmlLang: 'ko', shortLabel: '한국어', label: '한국어' }),
]);

export function detectInitialLocale() {
  const stored = readStoredLocale();
  if (stored) return stored;

  const languages = typeof navigator === 'undefined' ? [] : navigator.languages || [navigator.language];
  if (languages.some((language) => language?.toLowerCase().startsWith('zh'))) return 'zh-Hant';
  if (languages.some((language) => language?.toLowerCase().startsWith('ko'))) return 'ko';
  return 'en';
}

export function localeConfig(code) {
  const config = LOCALES.find((locale) => locale.code === code);
  if (!config) throw new Error(`Unsupported locale: ${code}`);
  return config;
}

function readStoredLocale() {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return LOCALES.some((locale) => locale.code === stored) ? stored : null;
  } catch {
    return null;
  }
}
