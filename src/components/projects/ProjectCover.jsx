import { motion } from 'motion/react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import { staticAssetUrl } from '../../lib/staticAssets.js';

export function ProjectCover({
  project,
  context,
  layoutId,
  layoutDependency,
  transition,
}) {
  const { t } = useI18n();
  const alt = t('project.previewAlt', { name: project.name });
  const motionProps = {
    layoutId,
    layoutDependency,
    transition,
  };

  if (project.coverUrl) {
    return (
      <motion.img
        {...motionProps}
        className={context === 'dialog' ? 'project-dialog__cover' : undefined}
        src={staticAssetUrl(project.coverUrl)}
        alt={alt}
        width="1200"
        height="675"
        loading={context === 'card' ? 'lazy' : undefined}
        decoding="async"
      />
    );
  }

  return (
    <motion.div
      {...motionProps}
      className={`project-type-cover project-type-cover--${context} project-type-cover--${project.track.toLowerCase()}`}
      role="img"
      aria-label={alt}
    >
      <span className="project-type-cover__eyebrow">Renaiss Tech Hackathon · S1</span>
      <strong>{project.name}</strong>
      <span className="project-type-cover__team">{project.team}</span>
      <span className="project-type-cover__mark" aria-hidden="true">R</span>
    </motion.div>
  );
}
