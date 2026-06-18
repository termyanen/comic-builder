import { useComicStore } from '../../store/comicStore';
import { exportComic } from '../../rendering/ExportRenderer';
import type { Language } from '../../types/comic';

export function Toolbar() {
  const { strip, setLanguage, setShowWatermark, resetStrip } = useComicStore();

  return (
    <div className="toolbar">
      <label>Язык:</label>
      <select value={strip.language} onChange={e => setLanguage(e.target.value as Language)}>
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

      <button className="btn" onClick={() => exportComic(strip)}>Export PNG</button>
      <button className="btn btn-red" onClick={resetStrip}>Reset</button>
    </div>
  );
}
