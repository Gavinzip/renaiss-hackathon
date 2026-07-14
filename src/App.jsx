import { LayoutGroup } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { ProjectShareToast } from './components/projects/ProjectShareToast.jsx';
import { useSession } from './hooks/useSession.js';
import { useVoteEligibility } from './hooks/useVoteEligibility.js';
import { useI18n } from './i18n/I18nProvider.jsx';
import { localizeProjects } from './i18n/localizeProjects.js';
import { initializeAnalytics, trackPageView } from './lib/analytics.js';
import { warmProjectCoverCache } from './lib/projectCoverPreload.js';
import { staticAssetCssUrl, staticAssetUrl } from './lib/staticAssets.js';
import { voteSelectionLockStatus } from './lib/voteEligibility.js';
import { HomePage } from './pages/HomePage.jsx';
import { AdminPage } from './pages/AdminPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { VotePage } from './pages/VotePage.jsx';
import initialLoaderLogoUrl from 'virtual:initial-loader-logo';

const INITIAL_LOADER_MIN_VISIBLE_MS = 900;
const INITIAL_LOADER_EXIT_MS = 440;
const INITIAL_HOME_ASSETS = Object.freeze([
  initialLoaderLogoUrl,
  staticAssetUrl('/assets/hackathon-vote-hero-crt-4a48559f.webp'),
]);

export function App() {
  const { locale, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const { session, recordVote, checkVoteEligibility, logout } = useSession();
  const [selectedId, setSelectedId] = useState(null);
  const [projectDialogId, setProjectDialogId] = useState(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [eligibilityPromptRequested, setEligibilityPromptRequested] = useState(false);
  const [authNotice, setAuthNotice] = useState(null);
  const [shareToastStatus, setShareToastStatus] = useState(null);
  const shareToastTimerRef = useRef(null);
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
  const voteEligibility = useVoteEligibility({
    enabled: location.pathname === '/vote',
    authenticated: session.authenticated,
    checkEligibility: checkVoteEligibility,
  });
  const selectionLock = voteSelectionLockStatus(session, voteEligibility);

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
    if (initialLoaderMounted || location.pathname !== '/') return;
    warmProjectCoverCache(projects);
  }, [initialLoaderMounted, location.pathname, projects]);

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
    } else if (authStatus === 'success' && location.pathname === '/vote') {
      setEligibilityPromptRequested(true);
    }

    if (authStatus || params.has('reason')) {
      params.delete('auth');
      params.delete('reason');
      navigate({
        pathname: location.pathname,
        search: params.size ? `?${params.toString()}` : '',
        hash: location.hash,
      }, { replace: true });
    }
  }, [location.hash, location.pathname, location.search, navigate, selectedProject, session.loading, t]);

  useEffect(() => {
    if (voteEligibility.status !== 'unqualified') return;
    setSelectedId(null);
  }, [voteEligibility.status]);

  useEffect(() => {
    if (!eligibilityPromptRequested || voteEligibility.status === 'checking' || voteEligibility.status === 'idle') return;
    if (voteEligibility.status !== 'unqualified') setEligibilityPromptRequested(false);
  }, [eligibilityPromptRequested, voteEligibility.status]);

  const selectProject = useCallback((project) => {
    if (!session.authenticated || project.auditStatus === 'BLOCK' || selectionLock) return;
    setSelectedId(project.id);
  }, [selectionLock, session.authenticated]);

  const beginSignIn = useCallback((returnTo) => {
    if (!session.authConfigured) {
      setAuthNotice({
        type: 'notConfigured',
        title: t('auth.notConfiguredTitle'),
        message: t('auth.notConfiguredBody'),
      });
      return;
    }
    window.location.assign(`/api/auth/renaiss/start?return_to=${encodeURIComponent(returnTo)}`);
  }, [session.authConfigured, t]);

  const beginHeaderSignIn = useCallback(() => {
    const params = new URLSearchParams(location.search);
    params.delete('auth');
    params.delete('reason');
    const search = params.size ? `?${params.toString()}` : '';
    beginSignIn(`${location.pathname}${search}${location.hash}`);
  }, [beginSignIn, location.hash, location.pathname, location.search]);

  const confirmVote = useCallback(async (projectId) => {
    const payload = await recordVote(projectId);
    setSelectedId(projectId);
    return payload;
  }, [recordVote]);

  const verifyVoteEligibility = voteEligibility.refresh;

  const clearLocalSelection = useCallback(() => {
    setSelectedId(null);
  }, []);

  const dismissEligibilityPrompt = useCallback(() => {
    setEligibilityPromptRequested(false);
  }, []);

  const showShareToast = useCallback((status) => {
    window.clearTimeout(shareToastTimerRef.current);
    setShareToastStatus(status);
    shareToastTimerRef.current = window.setTimeout(() => setShareToastStatus(null), 2600);
  }, []);

  useEffect(() => () => window.clearTimeout(shareToastTimerRef.current), []);

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
      <LayoutGroup id="project-dialog">
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
                    authenticated={session.authenticated}
                    eligibility={voteEligibility}
                    selectionLock={selectionLock}
                    eligibilityPromptRequested={eligibilityPromptRequested}
                    serviceError={session.error}
                    openProjectId={projectDialogOpen ? projectDialogId : null}
                    onOpenProject={(project) => {
                      setProjectDialogId(project.id);
                      setProjectDialogOpen(true);
                    }}
                    onSelectProject={selectProject}
                    onShare={showShareToast}
                    onEligibilityPromptHandled={dismissEligibilityPrompt}
                    onSignIn={beginHeaderSignIn}
                    onCheckEligibility={verifyVoteEligibility}
                    onConfirm={confirmVote}
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
          authenticated={session.authenticated}
          selectionLock={selectionLock}
          onSignIn={beginHeaderSignIn}
          onShare={showShareToast}
        />
      </LayoutGroup>
      <ProjectShareToast status={shareToastStatus} />
      <Footer />
      <Modal open={Boolean(authNotice)} onClose={() => setAuthNotice(null)} title={authNotice?.title || t('nav.signIn')} className="auth-notice-dialog">
        <p>{authNotice?.message}</p>
        {authNotice?.type === 'notConfigured' ? <p>{t('auth.setupBody', { callback: `${window.location.origin}/auth/callback` })}</p> : null}
        <button className="button button--secondary" type="button" onClick={() => setAuthNotice(null)}>{t('common.close')}</button>
      </Modal>
    </div>
  );
}

function preloadStaticImage(source) {
  return new Promise((resolve) => {
    const image = new Image();
    const finish = () => resolve();
    image.onload = finish;
    image.onerror = finish;
    image.decoding = 'async';
    image.src = source;

    if (image.complete) finish();
  });
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
