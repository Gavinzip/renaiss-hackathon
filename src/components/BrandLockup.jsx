import { Link } from 'react-router-dom';

export function BrandLockup({ compact = false }) {
  return (
    <Link className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''}`} to="/" aria-label="Renaiss Lab home">
      <img src="/assets/renaiss-lab-mark.webp" alt="" width="44" height="44" />
      <span className="brand-lockup__name">
        renaiss<span className="brand-lockup__lab">lab</span>
      </span>
    </Link>
  );
}
