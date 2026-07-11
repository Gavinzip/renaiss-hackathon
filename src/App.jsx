import { useCallback, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { EVENT } from '../shared/event.mjs';
import { PROJECTS } from '../shared/projects.mjs';
import { Footer } from './components/Footer.jsx';
import { Header } from './components/Header.jsx';
import { Modal } from './components/Modal.jsx';
import { RouteScrollManager } from './components/RouteScrollManager.jsx';
import { ProjectDialog } from './components/projects/ProjectDialog.jsx';
import { VoteDialog } from './components/voting/VoteDialog.jsx';
import { useSession } from './hooks/useSession.js';
import { HomePage } from './pages/HomePage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { RulesPage } from './pages/RulesPage.jsx';
import { VotePage } from './pages/VotePage.jsx';

const PENDING_PROJECT_KEY = 'renaiss-hackathon-pending-project';

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, recordVote, clearVote, logout } = useSession();
  const [selectedId, setSelectedId] = useState(() => sessionStorage.getItem(PENDING_PROJECT_KEY));
  const [projectDialog, setProjectDialog] = useState(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const [authNotice, setAuthNotice] = useState(null);

  const recordedProject = useMemo(
    () => PROJECTS.find((project) => project.id === session.vote?.projectId) || null,
    [session.vote?.projectId],
  );
  const selectedProject = useMemo(
    () => PROJECTS.find((project) => project.id === selectedId) || recordedProject,
    [recordedProject, selectedId],
  );
  const event = session.event || {
    ...EVENT,
    voting: { status: session.loading ? 'loading' : 'configuration_required', opensAt: null, closesAt: null },
  };

  useEffect(() => {
    if (!selectedId && recordedProject) setSelectedId(recordedProject.id);
  }, [recordedProject, selectedId]);

  useEffect(() => {
    setProjectDialogOpen(false);
    if (location.pathname !== '/vote') setVoteDialogOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (session.loading) return;
    const params = new URLSearchParams(location.search);
    const authStatus = params.get('auth');
    if (authStatus === 'error') {
      setAuthNotice({
        title: 'Renaiss sign-in could not be completed',
        message: authErrorMessage(params.get('reason')),
      });
    } else if (location.pathname === '/vote' && params.get('reviewVote') === '1' && selectedProject) {
      setVoteDialogOpen(true);
    }

    if (authStatus || params.has('reason') || params.has('reviewVote')) {
      params.delete('auth');
      params.delete('reason');
      params.delete('reviewVote');
      navigate({
        pathname: location.pathname,
        search: params.size ? `?${params.toString()}` : '',
        hash: location.hash,
      }, { replace: true });
    }
  }, [location.hash, location.pathname, location.search, navigate, selectedProject, session.loading]);

  const selectProject = useCallback((project) => {
    setSelectedId(project.id);
    sessionStorage.setItem(PENDING_PROJECT_KEY, project.id);
    if (selectedId === project.id || session.vote?.projectId === project.id) setVoteDialogOpen(true);
  }, [selectedId, session.vote?.projectId]);

  const beginSignIn = useCallback((returnTo) => {
    if (!session.authConfigured) {
      setVoteDialogOpen(false);
      setAuthNotice({
        title: 'Renaiss sign-in is not configured',
        message: 'This environment has no dedicated Renaiss client credentials. The public project gallery is real, but sign-in and vote writes stay disabled—there is no mock login or authentication fallback.',
      });
      return;
    }
    if (selectedProject) sessionStorage.setItem(PENDING_PROJECT_KEY, selectedProject.id);
    window.location.assign(`/api/auth/renaiss/start?return_to=${encodeURIComponent(returnTo)}`);
  }, [selectedProject, session.authConfigured]);

  const beginHeaderSignIn = useCallback(() => {
    const params = new URLSearchParams(location.search);
    params.delete('auth');
    params.delete('reason');
    params.delete('reviewVote');
    const search = params.size ? `?${params.toString()}` : '';
    beginSignIn(`${location.pathname}${search}${location.hash}`);
  }, [beginSignIn, location.hash, location.pathname, location.search]);

  const beginVoteSignIn = useCallback(() => {
    beginSignIn('/vote?reviewVote=1#projects');
  }, [beginSignIn]);

  const confirmVote = useCallback(async (projectId) => {
    const payload = await recordVote(projectId);
    setSelectedId(projectId);
    sessionStorage.removeItem(PENDING_PROJECT_KEY);
    return payload;
  }, [recordVote]);

  const removeVote = useCallback(async () => {
    const payload = await clearVote();
    setSelectedId(null);
    sessionStorage.removeItem(PENDING_PROJECT_KEY);
    return payload;
  }, [clearVote]);

  const clearLocalSelection = useCallback(() => {
    setSelectedId(recordedProject?.id || null);
    sessionStorage.removeItem(PENDING_PROJECT_KEY);
    setVoteDialogOpen(false);
  }, [recordedProject]);

  const signOut = useCallback(async () => {
    try {
      await logout();
    } catch {
      window.location.reload();
    }
  }, [logout]);

  return (
    <div className="site-frame">
      <RouteScrollManager />
      <Header session={session} onSignIn={beginHeaderSignIn} onLogout={signOut} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage event={event} projectCount={PROJECTS.length} serviceError={session.error} />} />
          <Route
            path="/vote"
            element={(
              <VotePage
                event={event}
                projects={PROJECTS}
                recordedProject={recordedProject}
                selectedProject={selectedProject}
                serviceError={session.error}
                onOpenProject={(project) => {
                  setProjectDialog(project);
                  setProjectDialogOpen(true);
                }}
                onSelectProject={selectProject}
                onReviewVote={() => setVoteDialogOpen(true)}
              />
            )}
          />
          <Route path="/rules" element={<RulesPage event={event} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />

      {location.pathname === '/vote' && selectedProject ? (
        <button className="mobile-vote-tray" type="button" onClick={() => setVoteDialogOpen(true)}>
          <span><small>{recordedProject?.id === selectedProject.id ? 'Vote recorded' : 'Your selection'}</small><strong>{selectedProject.name}</strong></span>
          <b>{recordedProject?.id === selectedProject.id ? 'Recorded vote' : 'Review vote'}</b>
        </button>
      ) : null}

      <ProjectDialog
        project={projectDialog}
        open={projectDialogOpen}
        onClose={() => setProjectDialogOpen(false)}
        onSelect={(project) => {
          selectProject(project);
          setProjectDialogOpen(false);
        }}
        selected={projectDialog?.id === selectedProject?.id}
        recorded={projectDialog?.id === recordedProject?.id}
      />
      <VoteDialog
        open={voteDialogOpen}
        project={selectedProject}
        session={{ ...session, event }}
        recordedProject={recordedProject}
        onClose={() => setVoteDialogOpen(false)}
        onSignIn={beginVoteSignIn}
        onConfirm={confirmVote}
        onClear={removeVote}
        onClearSelection={clearLocalSelection}
      />
      <Modal open={Boolean(authNotice)} onClose={() => setAuthNotice(null)} title={authNotice?.title || 'Renaiss sign-in'} className="auth-notice-dialog">
        <p>{authNotice?.message}</p>
        {authNotice?.title === 'Renaiss sign-in is not configured' ? <p>Before launch, allowlist <code>{window.location.origin}/auth/callback</code> and configure the server-side Renaiss client.</p> : null}
        <button className="button button--secondary" type="button" onClick={() => setAuthNotice(null)}>Close</button>
      </Modal>
    </div>
  );
}

function authErrorMessage(reason) {
  const messages = {
    invalid_oauth_state: 'The secure sign-in request expired or could not be verified. Please start again from this page.',
    sso_authorization_failed: 'Renaiss did not authorize this sign-in request. You can try again when you are ready.',
    authorization_code_missing: 'Renaiss returned without the required authorization code. Please start the sign-in flow again.',
    sso_callback_failed: 'Renaiss sign-in could not be verified. Please try again; no vote was changed.',
  };
  return messages[reason] || 'Renaiss sign-in could not be verified. Please try again; no vote was changed.';
}
