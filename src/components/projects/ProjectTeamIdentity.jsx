import { useState } from 'react';

import { UsersThree } from '@phosphor-icons/react';

export function ProjectTeamIdentity({ project, className = '' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const avatarUrl = typeof project?.xAvatarUrl === 'string' ? project.xAvatarUrl.trim() : '';
  const showAvatar = avatarUrl && !imageFailed;

  return (
    <span className={['project-team-identity', showAvatar ? 'has-avatar' : '', className].filter(Boolean).join(' ')}>
      {showAvatar ? (
        <img
          src={avatarUrl}
          alt=""
          width="24"
          height="24"
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <UsersThree weight="duotone" />
      )}
      <span>{project.team}</span>
    </span>
  );
}
