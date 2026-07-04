import { useComicStore } from '../../store/comicStore';
import { useFontsLoaded } from '../../svg/text';
import { PanelCanvas } from '../PanelCanvas/PanelCanvas';

export function ComicGrid() {
  const { strip, activePanel, selectPanel } = useComicStore();
  // Re-measure bubbles once the hand font is in
  useFontsLoaded();

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
            strip={strip}
            index={i}
            active={i === activePanel}
            onClick={() => selectPanel(i)}
          />
        ))}
      </div>
      <div className="strip-label">@{strip.seriesName}</div>
    </div>
  );
}
