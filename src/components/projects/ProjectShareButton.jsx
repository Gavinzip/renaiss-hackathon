import { CheckCircle, ShareNetwork } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import { projectShareUrl } from '../../lib/projectShare.js';

const COPIED_STATE_DURATION_MS = 2600;

export function ProjectShareButton({ projectId, variant = 'card', onShare }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(resetTimerRef.current), []);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(projectShareUrl(projectId));
      setCopied(true);
      onShare('copied');
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = window.setTimeout(() => setCopied(false), COPIED_STATE_DURATION_MS);
    } catch {
      onShare('failed');
    }
  }

  return (
    <button
      className={`project-share-button ${variant === 'dialog' ? 'text-button' : 'project-link'} ${copied ? 'project-share-button--copied' : ''}`}
      type="button"
      onClick={handleShare}
      data-project-share={projectId}
      aria-label={copied ? t('project.shareLinkCopied') : t('project.share')}
    >
      <ShareNetwork weight="duotone" aria-hidden="true" />
      {copied ? <CheckCircle weight="fill" aria-hidden="true" /> : <span>{t('project.share')}</span>}
    </button>
  );
}
