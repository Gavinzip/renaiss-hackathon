import { WarningCircle } from '@phosphor-icons/react';

import { Hero } from '../components/Hero.jsx';

export function HomePage({ event, projectCount, serviceError }) {
  return (
    <>
      <Hero event={event} projectCount={projectCount} />
      {serviceError ? (
        <div className="service-banner page-shell" role="status">
          <WarningCircle weight="fill" />
          <span>The public submission list is available, but the voting service is offline. No vote can be recorded until the service is reachable.</span>
        </div>
      ) : null}
    </>
  );
}
