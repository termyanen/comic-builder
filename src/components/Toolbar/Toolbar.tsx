import { useComicStore } from '../../store/comicStore';
import { exportComic } from '../../rendering/ExportRenderer';
import type { Language } from '../../types/comic';

export function Toolbar() {
  const { strip, setSeriesName, setEpisodeNumber, setLanguage, setShowWatermark, resetStrip } = useComicStore();

  return (
    <div className="toolbar">
      <label>Серия:</label>
      <input
        type="text"
        value={strip.seriesName}
        onChange={e => setSeriesName(e.target.value)}
        style={{ width: 100 }}
      />

      <label>Эп.:</label>
      <input
        type="text"
        value={strip.episodeNumber}
        onChange={e => setEpisodeNumber(e.target.value)}
        style={{ width: 52 }}
      />

      <label>Язык:</label>
      <select
        value={strip.language}
        onChange={e => setLanguage(e.target.value as Language)}
        style={{ width: 52 }}
      >
        <option value="ru">RU</option>
        <option value="en">EN</option>
      </select>

      <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={strip.showWatermark}
          onChange={e => setShowWatermark(e.target.checked)}
        />
        Watermark
      </label>

      <button className="btn" onClick={() => exportComic(strip)}>
        Export PNG
      </button>
      <button className="btn btn-red" onClick={resetStrip}>
        Reset
      </button>
    </div>
  );
}
