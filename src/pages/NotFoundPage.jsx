import { ArrowLeft } from '@phosphor-icons/react';

import { RenaissMetalButton } from '../components/metal/RenaissMetalButton.jsx';

export function NotFoundPage() {
  return (
    <section className="not-found-page page-shell">
      <span>404</span>
      <h1>This page is outside the arena.</h1>
      <p>Return to the official Season 1 voting home.</p>
      <RenaissMetalButton to="/" tone="light" leading={<ArrowLeft size={18} weight="bold" />}>Back home</RenaissMetalButton>
    </section>
  );
}
