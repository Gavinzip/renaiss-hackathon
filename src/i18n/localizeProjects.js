import { PROJECT_EN_OVERRIDES } from './project-locales/en-overrides.js';
import { PROJECT_TRANSLATIONS_A } from './project-locales/part-a.js';
import { PROJECT_TRANSLATIONS_B } from './project-locales/part-b.js';
import { PROJECT_TRANSLATIONS_C } from './project-locales/part-c.js';

const PROJECT_TRANSLATIONS = Object.freeze({
  'zh-Hant': Object.freeze({
    ...PROJECT_TRANSLATIONS_A['zh-Hant'],
    ...PROJECT_TRANSLATIONS_B['zh-Hant'],
    ...PROJECT_TRANSLATIONS_C['zh-Hant'],
  }),
  ko: Object.freeze({
    ...PROJECT_TRANSLATIONS_A.ko,
    ...PROJECT_TRANSLATIONS_B.ko,
    ...PROJECT_TRANSLATIONS_C.ko,
  }),
});

export function localizeProjects(projects, locale) {
  if (locale === 'en') {
    return projects.map((project) => Object.freeze({
      ...project,
      ...(PROJECT_EN_OVERRIDES[project.id] || {}),
    }));
  }

  const translations = PROJECT_TRANSLATIONS[locale];
  if (!translations) throw new Error(`Unsupported project locale: ${locale}`);

  return projects.map((project) => {
    const translated = translations[project.id];
    if (!translated) throw new Error(`Missing ${locale} project translation: ${project.id}`);
    return Object.freeze({ ...project, ...translated });
  });
}
