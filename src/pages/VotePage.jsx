import { WarningCircle } from '@phosphor-icons/react';

import { ProjectGallery } from '../components/projects/ProjectGallery.jsx';
import { VotePanel } from '../components/voting/VotePanel.jsx';

export function VotePage({
  event,
  projects,
  recordedProject,
  selectedProject,
  serviceError,
  onOpenProject,
  onReviewVote,
  onSelectProject,
}) {
  const serviceBanner = serviceError ? (
    <div className="service-banner" role="status">
      <WarningCircle weight="fill" />
      <span>The project gallery remains available, but vote recording is temporarily unavailable.</span>
    </div>
  ) : null;

  return (
    <div className="vote-page">
      <ProjectGallery
        projects={projects}
        selectedId={selectedProject?.id || null}
        recordedId={recordedProject?.id || null}
        onOpen={onOpenProject}
        onSelect={onSelectProject}
        notice={serviceBanner}
        votePanel={(
          <VotePanel
            project={selectedProject}
            recorded={Boolean(selectedProject && recordedProject?.id === selectedProject.id)}
            event={event}
            onReview={onReviewVote}
          />
        )}
      />
    </div>
  );
}
