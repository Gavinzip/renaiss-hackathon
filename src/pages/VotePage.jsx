import { WarningCircle } from '@phosphor-icons/react';

import { ProjectGallery } from '../components/projects/ProjectGallery.jsx';
import { VotingConfigurationNotice } from '../components/VotingConfigurationNotice.jsx';
import { EligibilityGate } from '../components/voting/EligibilityGate.jsx';
import { VotePanel } from '../components/voting/VotePanel.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

export function VotePage({
  event,
  projects,
  recordedProjects,
  selectedProjects,
  session,
  authenticated,
  eligibility,
  selectionLock,
  eligibilityPromptRequested,
  serviceError,
  openProjectId,
  onOpenProject,
  onSelectProject,
  onShare,
  onEligibilityPromptHandled,
  onSignIn,
  onCheckEligibility,
  onConfirm,
  onClearSelection,
}) {
  const { t } = useI18n();
  const notices = (
    <>
      <VotingConfigurationNotice event={event} />
      <EligibilityGate
        eligibility={eligibility}
        event={event}
        promptRequested={eligibilityPromptRequested}
        onPromptHandled={onEligibilityPromptHandled}
        session={session}
      />
      {serviceError ? (
        <Reveal className="service-banner" distance={14} role="status">
          <WarningCircle weight="fill" />
          <span>{t('service.voteOffline')}</span>
        </Reveal>
      ) : null}
    </>
  );

  return (
    <div className="vote-page">
      <ProjectGallery
        projects={projects}
        selectedIds={selectedProjects.map((project) => project.id)}
        recordedIds={recordedProjects.map((project) => project.id)}
        selectionLimit={event.votePolicy.selectionsPerVoter}
        authenticated={authenticated}
        selectionLock={selectionLock}
        openProjectId={openProjectId}
        onOpen={onOpenProject}
        onSelect={onSelectProject}
        onSignIn={onSignIn}
        onShare={onShare}
        notice={notices}
        votePanel={(
          <VotePanel
            selectedProjects={selectedProjects}
            recordedProjects={recordedProjects}
            session={{ ...session, event }}
            event={event}
            selectionLock={selectionLock}
            onSignIn={onSignIn}
            onCheckEligibility={onCheckEligibility}
            onConfirm={onConfirm}
            onClearSelection={onClearSelection}
          />
        )}
      />
    </div>
  );
}
