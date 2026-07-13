import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { EVENT } from '../shared/event.mjs';
import { PROJECTS } from '../shared/projects.mjs';
import { Footer } from './components/Footer.jsx';
import { Header } from './components/Header.jsx';
import { InitialExperienceLoader } from './components/InitialExperienceLoader.jsx';
import { Modal } from './components/Modal.jsx';
import { RouteScrollManager } from './components/RouteScrollManager.jsx';
import { PageTransition } from './components/motion/PageTransition.jsx';
import { ProjectDialog } from './components/projects/ProjectDialog.jsx';
import { useSession } from './hooks/useSession.js';
import { useI18n } from './i18n/I18nProvider.jsx';
import { localizeProjects } from './i18n/localizeProjects.js';
import { initializeAnalytics, trackPageView } from './lib/analytics.js';
import { staticAssetCssUrl } from './lib/staticAssets.js';
import { HomePage } from './pages/HomePage.jsx';
import { AdminPage } from './pages/AdminPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { VotePage } from './pages/VotePage.jsx';

const PENDING_PROJECT_KEY = 'renaiss-hackathon-pending-project';
const INITIAL_LOADER_MIN_VISIBLE_MS = 900;
const INITIAL_LOADER_EXIT_MS = 440;
const INITIAL_HOME_ASSETS = Object.freeze([
  '/assets/renaiss-lab-mark.webp',
  '/assets/hackathon-vote-hero-crt-4a48559f.webp',
]);

export function App() {
  const { locale, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const { session, recordVote, clearVote, checkVoteEligibility, logout } = useSession();
  const [selectedId, setSelectedId] = useState(readPendingProjectForAuthResume);
  const [projectDialogId, setProjectDialogId] = useState(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [resumeVoteConfirmation, setResumeVoteConfirmation] = useState(false);
  const [authNotice, setAuthNotice] = useState(null);
  const [initialAssetsReady, setInitialAssetsReady] = useState(false);
  const [initialPaintReady, setInitialPaintReady] = useState(false);
  const [initialLoaderVisible, setInitialLoaderVisible] = useState(true);
  const [initialLoaderMounted, setInitialLoaderMounted] = useState(true);
  const [initialLoaderStartedAt] = useState(() => Date.now());

  const projects = useMemo(() => localizeProjects(PROJECTS, locale), [locale]);
  const recordedProject = useMemo(
    () => projects.find((project) => project.id === session.vote?.projectId) || null,
    [projects, session.vote?.projectId],
  );
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId && project.auditStatus !== 'BLOCK') || null,
    [projects, selectedId],
  );
  const projectDialog = useMemo(
    () => projects.find((project) => project.id === projectDialogId) || null,
    [projectDialogId, projects],
  );
  const event = session.event || {
    ...EVENT,
    voting: { status: session.loading ? 'loading' : 'configuration_required', opensAt: null, closesAt: null },
  };

  useEffect(() => {
    setProjectDialogOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    initializeAnalytics();
    trackPageView({
      // Do not forward query strings: they can contain an auth state or a
      // project deep-link and are not needed for aggregate page reporting.
      path: location.pathname,
      title: document.title,
    });
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (location.pathname !== '/vote') return;
    const projectId = new URLSearchParams(location.search).get('project');
    if (!projectId) return;

    const project = projects.find((candidate) => candidate.id === projectId);
    if (!project) return;

    setProjectDialogId(project.id);
    setProjectDialogOpen(true);
  }, [location.pathname, location.search, projects]);

  useEffect(() => {
    let active = true;

    Promise.all(INITIAL_HOME_ASSETS.map(preloadStaticImage)).finally(() => {
      if (active) setInitialAssetsReady(true);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!initialAssetsReady) return undefined;

    let active = true;
    let firstFrame = 0;
    let secondFrame = 0;
    const markReadyAfterPaint = () => {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          if (active) setInitialPaintReady(true);
        });
      });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.catch(() => undefined).finally(markReadyAfterPaint);
    } else {
      markReadyAfterPaint();
    }

    return () => {
      active = false;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [initialAssetsReady]);

  const initialExperienceReady = initialPaintReady && !session.loading;

  useEffect(() => {
    if (!initialExperienceReady) return undefined;

    const elapsed = Date.now() - initialLoaderStartedAt;
    const timeoutId = window.setTimeout(() => {
      setInitialLoaderVisible(false);
    }, Math.max(0, INITIAL_LOADER_MIN_VISIBLE_MS - elapsed));

    return () => window.clearTimeout(timeoutId);
  }, [initialExperienceReady, initialLoaderStartedAt]);

  useEffect(() => {
    if (initialLoaderVisible) return undefined;

    const timeoutId = window.setTimeout(() => {
      setInitialLoaderMounted(false);
    }, INITIAL_LOADER_EXIT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [initialLoaderVisible]);

  useEffect(() => {
    if (session.loading) return;
    const params = new URLSearchParams(location.search);
    const authStatus = params.get('auth');
    if (authStatus === 'error') {
      setAuthNotice({
        type: 'failed',
        title: t('auth.failedTitle'),
        message: authErrorMessage(params.get('reason'), t),
      });
    } else if (location.pathname === '/vote' && params.get('reviewVote') === '1' && selectedProject) {
      setResumeVoteConfirmation(true);
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
  }, [location.hash, location.pathname, location.search, navigate, selectedProject, session.loading, t]);

  const selectProject = useCallback((project) => {
    if (project.auditStatus === 'BLOCK') return;
    setSelectedId(project.id);
  }, []);

  const beginSignIn = useCallback((returnTo) => {
    if (!session.authConfigured) {
      setAuthNotice({
        type: 'notConfigured',
        title: t('auth.notConfiguredTitle'),
        message: t('auth.notConfiguredBody'),
      });
      return;
    }
    if (selectedProject) sessionStorage.setItem(PENDING_PROJECT_KEY, selectedProject.id);
    window.location.assign(`/api/auth/renaiss/start?return_to=${encodeURIComponent(returnTo)}`);
  }, [selectedProject, session.authConfigured, t]);

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

  const verifyVoteEligibility = useCallback(async () => checkVoteEligibility(), [checkVoteEligibility]);

  const removeVote = useCallback(async () => {
    const payload = await clearVote();
    setSelectedId(null);
    sessionStorage.removeItem(PENDING_PROJECT_KEY);
    return payload;
  }, [clearVote]);

  const clearLocalSelection = useCallback(() => {
    setSelectedId(null);
    sessionStorage.removeItem(PENDING_PROJECT_KEY);
  }, []);

  const markVoteResumeHandled = useCallback(() => {
    setResumeVoteConfirmation(false);
  }, []);

  const signOut = useCallback(async () => {
    try {
      await logout();
    } catch {
      window.location.reload();
    }
  }, [logout]);

  return (
    <div className="site-frame" style={{ '--vote-ribbon-asset': staticAssetCssUrl('/assets/backgrounds/renaiss-vote-ribbon-field.webp') }}>
      {initialLoaderMounted ? <InitialExperienceLoader isLeaving={!initialLoaderVisible} /> : null}
      <RouteScrollManager />
      <Header session={session} onSignIn={beginHeaderSignIn} onLogout={signOut} />
      <main>
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage event={event} projectCount={projects.length} serviceError={session.error} />} />
            <Route
              path="/vote"
              element={(
                <VotePage
                  event={event}
                  projects={projects}
                  recordedProject={recordedProject}
                  selectedProject={selectedProject}
                  session={session}
                  resumeConfirmation={resumeVoteConfirmation}
                  serviceError={session.error}
                  onOpenProject={(project) => {
                    setProjectDialogId(project.id);
                    setProjectDialogOpen(true);
                  }}
                  onSelectProject={selectProject}
                  onResumeHandled={markVoteResumeHandled}
                  onSignIn={beginVoteSignIn}
                  onCheckEligibility={verifyVoteEligibility}
                  onConfirm={confirmVote}
                  onClear={removeVote}
                  onClearSelection={clearLocalSelection}
                />
              )}
            />
            <Route path="/rules" element={<Navigate to="/#rules" replace />} />
            <Route
              path="/admin"
              element={session.loading
                ? null
                : session.user?.isAdministrator
                  ? <AdminPage projects={projects} session={session} onSignIn={beginHeaderSignIn} />
                  : <Navigate to="/" replace />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />

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
      <Modal open={Boolean(authNotice)} onClose={() => setAuthNotice(null)} title={authNotice?.title || t('nav.signIn')} className="auth-notice-dialog">
        <p>{authNotice?.message}</p>
        {authNotice?.type === 'notConfigured' ? <p>{t('auth.setupBody', { callback: `${window.location.origin}/auth/callback` })}</p> : null}
        <button className="button button--secondary" type="button" onClick={() => setAuthNotice(null)}>{t('common.close')}</button>
      </Modal>
    </div>
  );
}

function preloadStaticImage(path) {
  return new Promise((resolve) => {
    const image = new Image();
    const finish = () => resolve();
    image.onload = finish;
    image.onerror = finish;
    image.decoding = 'async';
    image.src = staticAssetUrl(path);

    if (image.complete) finish();
  });
}

function readPendingProjectForAuthResume() {
  const params = new URLSearchParams(window.location.search);
  const shouldResume = window.location.pathname === '/vote' && params.get('reviewVote') === '1';
  if (shouldResume) return sessionStorage.getItem(PENDING_PROJECT_KEY);
  sessionStorage.removeItem(PENDING_PROJECT_KEY);
  return null;
}

function authErrorMessage(reason, t) {
  const messages = {
    invalid_oauth_state: 'auth.error.invalid_oauth_state',
    sso_authorization_failed: 'auth.error.sso_authorization_failed',
    authorization_code_missing: 'auth.error.authorization_code_missing',
    sso_callback_failed: 'auth.error.sso_callback_failed',
  };
  return t(messages[reason] || 'auth.error.default');
}
