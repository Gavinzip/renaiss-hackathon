import { DiscordLogo, XLogo } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { BrandLockup } from './BrandLockup.jsx';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__grid">
        <div className="site-footer__brand">
          <BrandLockup compact />
          <p>Building the future of value for collectors, builders, and communities.</p>
        </div>
        <div><h3>Explore</h3><Link to="/">Home</Link><Link to="/vote#projects">Start to vote</Link><Link to="/rules#rules">Voting rules</Link></div>
        <div><h3>Renaiss</h3><a href="https://renaiss.xyz" target="_blank" rel="noreferrer">Renaiss Protocol</a><a href="https://x.com/renaissxyz" target="_blank" rel="noreferrer">Protocol on X</a><a href="https://x.com/Tastedotmd" target="_blank" rel="noreferrer">Renaiss Lab on X</a></div>
        <div><h3>Community</h3><div className="social-links"><a href="https://x.com/Tastedotmd" target="_blank" rel="noreferrer" aria-label="Renaiss Lab on X"><XLogo weight="fill" /></a><a href="https://discord.com/invite/renaiss" target="_blank" rel="noreferrer" aria-label="Renaiss Discord"><DiscordLogo weight="fill" /></a></div><p>Follow official channels for voting dates, project updates, and results.</p></div>
      </div>
      <div className="page-shell site-footer__bottom"><span>© 2026 Renaiss Lab. All rights reserved.</span><span>Official result: Community Vote 40% · Renaiss Team Evaluation 60%</span></div>
    </footer>
  );
}
