import { ArrowLeft } from '@phosphor-icons/react';

import { RenaissMetalButton } from '../components/metal/RenaissMetalButton.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <section className="not-found-page page-shell">
      <span>{t('notFound.code')}</span>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.body')}</p>
      <RenaissMetalButton to="/" tone="light" leading={<ArrowLeft size={18} weight="bold" />}>{t('notFound.action')}</RenaissMetalButton>
    </section>
  );
}
