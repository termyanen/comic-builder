import { useComicStore } from '../../store/comicStore';
import { PanelCanvas } from '../PanelCanvas/PanelCanvas';

export function ComicGrid() {
  const { strip, activePanel, selectPanel } = useComicStore();

  return (
    <div className="comic-section">
      <div className="series-tag">
        {strip.seriesName} · {strip.episodeNumber}
      </div>
      <div className="panels-grid">
        {strip.panels.map((panel, i) => (
          <PanelCanvas
            key={i}
            panel={panel}
            active={i === activePanel}
            onClick={() => selectPanel(i)}
          />
        ))}
      </div>
      <div className="strip-label">@termyanen</div>
    </div>
  );
}
