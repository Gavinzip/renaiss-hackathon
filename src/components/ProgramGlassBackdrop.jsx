import { staticAssetCssUrl } from '../lib/staticAssets.js';

const GLASS_FIELD_ASSET = '/assets/backgrounds/renaiss-rules-glass-field.webp';

export function ProgramGlassBackdrop() {
  return (
    <div
      className="program-glass-backdrop"
      aria-hidden="true"
      style={{ '--program-glass-field': staticAssetCssUrl(GLASS_FIELD_ASSET) }}
    />
  );
}
