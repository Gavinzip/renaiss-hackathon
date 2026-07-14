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
  recordedProject,
  selectedProject,
  session,
  eligibility,
  selectionLock,
  eligibilityPromptRequested,
  resumeConfirmation,
  serviceError,
  onOpenProject,
  onSelectProject,
  onResumeHandled,
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
        selectedId={selectedProject?.id || null}
        recordedId={recordedProject?.id || null}
        selectionLock={selectionLock}
        onOpen={onOpenProject}
        onSelect={onSelectProject}
        notice={notices}
        votePanel={(
          <VotePanel
            project={selectedProject}
            recordedProject={recordedProject}
            session={{ ...session, event }}
            event={event}
            selectionLock={selectionLock}
            resumeConfirmation={resumeConfirmation}
            onResumeHandled={onResumeHandled}
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
