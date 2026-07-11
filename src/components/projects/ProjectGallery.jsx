import { MagnifyingGlass } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';

import { ProjectCard } from './ProjectCard.jsx';

const TRACKS = ['All', 'AI', 'Tool', 'Game'];
const INITIAL_COUNT = 8;

export function ProjectGallery({ projects, selectedId, recordedId, onOpen, onSelect, notice, votePanel }) {
  const [track, setTrack] = useState('All');
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState('discover');
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    const result = projects.filter((project) => {
      const trackMatch = track === 'All' || project.track === track;
      const textMatch = !needle || [project.name, project.team, project.pitch].some((value) => value.toLocaleLowerCase().includes(needle));
      return trackMatch && textMatch;
    });
    return [...result].sort(sortMode === 'alpha'
      ? (left, right) => left.name.localeCompare(right.name)
      : (left, right) => stableHash(left.id) - stableHash(right.id));
  }, [projects, query, sortMode, track]);

  const visible = expanded || query || track !== 'All' ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <section className="projects-section page-shell" id="projects">
      <div className="section-heading section-heading--projects">
        <div>
          <h2>Meet the builders</h2>
          <p>Every Season 1 final submission, presented from the participant’s own entry.</p>
        </div>
        <span>{filtered.length} projects</span>
      </div>
      {notice}
      <div className="project-toolbar">
        <div className="filter-tabs" aria-label="Filter projects by track">
          {TRACKS.map((item) => (
            <button key={item} type="button" className={track === item ? 'is-active' : ''} aria-pressed={track === item} onClick={() => setTrack(item)}>{item}</button>
          ))}
        </div>
        <label className="search-field">
          <MagnifyingGlass size={20} />
          <span className="sr-only">Search projects</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or teams" />
        </label>
        <label className="sort-field">
          <span>Sort</span>
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
            <option value="discover">Discover</option>
            <option value="alpha">A–Z</option>
          </select>
        </label>
      </div>
      <div className="gallery-layout">
        <div>
          <div className="project-list" aria-live="polite">
            {visible.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                selected={selectedId === project.id}
                recorded={recordedId === project.id}
                onOpen={onOpen}
                onSelect={onSelect}
              />
            ))}
          </div>
          {!visible.length ? <div className="empty-state"><h3>No projects found</h3><p>Try another track or search term.</p></div> : null}
          {!expanded && !query && track === 'All' && filtered.length > INITIAL_COUNT ? (
            <button className="show-all-button" type="button" onClick={() => setExpanded(true)}>View all {filtered.length} projects</button>
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
