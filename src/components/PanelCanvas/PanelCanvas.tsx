import type { ComicStrip, PanelData } from '../../types/comic';
import { PanelSvg } from '../../svg/PanelSvg';

interface Props {
  panel: PanelData;
  strip: ComicStrip;
  index: number;
  active: boolean;
  onClick: () => void;
}

export function PanelCanvas({ panel, strip, index, active, onClick }: Props) {
  return (
    <div className={`panel ${active ? 'active' : ''}`} onClick={onClick}>
      <PanelSvg panel={panel} strip={strip} index={index} />
    </div>
  );
}
