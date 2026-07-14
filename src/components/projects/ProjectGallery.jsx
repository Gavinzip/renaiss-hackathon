import { MagnifyingGlass } from '@phosphor-icons/react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

import { useI18n } from '../../i18n/I18nProvider.jsx';
import { warmProjectCoverCache } from '../../lib/projectCoverPreload.js';
import { Reveal } from '../motion/Reveal.jsx';
import { MOTION_EASE, MOTION_EXIT_EASE } from '../motion/motionTokens.js';
import { ProjectCard } from './ProjectCard.jsx';

const TRACKS = [
  { value: 'All', labelKey: 'tracks.all' },
  { value: 'AI', labelKey: 'tracks.ai' },
  { value: 'Tool', labelKey: 'tracks.tool' },
  { value: 'Game', labelKey: 'tracks.game' },
];
const INITIAL_COUNT = 9;

export function ProjectGallery({ projects, selectedId, recordedId, authenticated, selectionLock, openProjectId, onOpen, onSelect, onSignIn, onShare, notice, votePanel }) {
  const { intlLocale, t } = useI18n();
  const reduceMotion = useReducedMotion();
  const [track, setTrack] = useState('All');
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState('discover');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    warmProjectCoverCache(projects);
  }, [projects]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    const result = projects.filter((project) => {
      const trackMatch = track === 'All' || project.track === track;
      const textMatch = !needle || [project.name, project.team, project.pitch].some((value) => value.toLocaleLowerCase().includes(needle));
      return trackMatch && textMatch;
    });
    return [...result].sort(sortMode === 'alpha'
      ? (left, right) => left.name.localeCompare(right.name, intlLocale)
      : (left, right) => stableHash(left.id) - stableHash(right.id));
  }, [intlLocale, projects, query, sortMode, track]);

  const visible = expanded || query || track !== 'All' ? filtered : filtered.slice(0, INITIAL_COUNT);
  const revealingDeferredCards = expanded && !query && track === 'All';

  return (
    <section className="projects-section page-shell" id="projects">
      <Reveal className="section-heading section-heading--projects" distance={24}>
        <div>
          <h2>{t('gallery.heading')}</h2>
          <p>{t('gallery.summary', { count: projects.length })}</p>
        </div>
        <span>{t('gallery.count', { count: filtered.length })}</span>
      </Reveal>
      {notice}
      <Reveal className="project-toolbar" delay={0.06} distance={18}>
        <div className="filter-tabs" aria-label={t('gallery.filterLabel')}>
          {TRACKS.map((item) => (
            <button key={item.value} type="button" className={track === item.value ? 'is-active' : ''} aria-pressed={track === item.value} onClick={() => setTrack(item.value)}>{t(item.labelKey)}</button>
          ))}
        </div>
        <label className="search-field">
          <MagnifyingGlass size={20} />
          <span className="sr-only">{t('gallery.searchLabel')}</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('gallery.searchPlaceholder')} />
        </label>
        <label className="sort-field">
          <span>{t('gallery.sort')}</span>
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
            <option value="discover">{t('gallery.discover')}</option>
            <option value="alpha">{t('gallery.alpha')}</option>
          </select>
        </label>
      </Reveal>
      <div className="gallery-layout">
        <div>
          <div className="project-list" aria-live="polite">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((project, index) => {
                const revealDelay = revealingDeferredCards && index >= INITIAL_COUNT
                  ? Math.min((index - INITIAL_COUNT) * 0.045, 0.22)
                  : 0;
                return (
                  <motion.div
                    className="project-list__item"
                    key={project.id}
                    layout="position"
                    initial={reduceMotion || !revealingDeferredCards || index < INITIAL_COUNT
                      ? false
                      : { opacity: 0, y: 18, scale: 0.985, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={reduceMotion ? undefined : { opacity: 0.58, y: -6, scale: 0.994, filter: 'blur(2px)', transition: { duration: 0.18, ease: MOTION_EXIT_EASE } }}
                    transition={{
                      layout: { duration: reduceMotion ? 0 : 0.38, ease: MOTION_EASE },
                      opacity: { duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : revealDelay, ease: MOTION_EASE },
                      y: { duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : revealDelay, ease: MOTION_EASE },
                      scale: { duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : revealDelay, ease: MOTION_EASE },
                      filter: { duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : revealDelay, ease: MOTION_EASE },
                    }}
                  >
                    <div className="project-list__entry">
                      <ProjectCard
                        project={project}
                        coverLoading={index < 3 ? 'eager' : 'lazy'}
                        coverFetchPriority={index < 3 ? 'high' : 'auto'}
                        selected={selectedId === project.id}
                        recorded={recordedId === project.id}
                        authenticated={authenticated}
                        selectionLock={selectionLock}
                        dialogOpen={openProjectId === project.id}
                        onOpen={onOpen}
                        onSelect={onSelect}
                        onSignIn={onSignIn}
                        onShare={onShare}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {!visible.length ? <div className="empty-state"><h3>{t('gallery.emptyTitle')}</h3><p>{t('gallery.emptyBody')}</p></div> : null}
          {!expanded && !query && track === 'All' && filtered.length > INITIAL_COUNT ? (
            <button className="show-all-button" type="button" aria-expanded={expanded} onClick={() => setExpanded(true)}>{t('gallery.showAll', { count: filtered.length })}</button>
          ) : null}
        </div>
        {votePanel}
      </div>
    </section>
  );
}

function stableHash(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
