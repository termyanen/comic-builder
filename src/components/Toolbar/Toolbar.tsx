import { useRef, useState } from 'react';
import { useComicStore } from '../../store/comicStore';
import { exportComic, exportCarousel, exportVertical, exportAll } from '../../rendering/exportSvg';
import { exportStripJson, importStripJson } from '../../rendering/jsonIO';
import { ScenarioModal } from './ScenarioModal';
import { useT } from '../../i18n';
import type { Language } from '../../types/comic';

export function Toolbar() {
  const { strip, setLanguage, setShowWatermark, setShowCornerTag, setAuthorTag, resetStrip, importStrip, undo, redo, past, future } = useComicStore();
  const t = useT();
  const fileRef = useRef<HTMLInputElement>(null);
  const [showScenario, setShowScenario] = useState(false);

  async function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      importStrip(await importStripJson(file));
    } catch (err) {
      alert(`${t('importFail')} ${err instanceof Error ? err.message : err}`);
    }
  }

  return (
    <div className="toolbar">
      <label>{t('lang')}</label>
      <select value={strip.language} onChange={e => setLanguage(e.target.value as Language)}>
        <option value="ru">RU</option>
        <option value="en">EN</option>
      </select>

      <input
        className="author-input"
        type="text"
        value={`@${strip.authorTag ?? ''}`}
        title={t('authorTagTitle')}
        onChange={e => setAuthorTag(e.target.value)}
      />

      <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={strip.showWatermark}
          onChange={e => setShowWatermark(e.target.checked)}
        />
        {t('watermark')}
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
        title={t('cornerTagTitle')}>
        <input
          type="checkbox"
          checked={strip.showCornerTag ?? true}
          onChange={e => setShowCornerTag(e.target.checked)}
        />
        {t('cornerTag')}
      </label>

      <button className="btn" title={t('undoTitle')} disabled={!past.length} onClick={undo}>↶</button>
      <button className="btn" title={t('redoTitle')} disabled={!future.length} onClick={redo}>↷</button>

      <button className="btn" title={t('scenarioTitle')} onClick={() => setShowScenario(true)}>{t('scenario')}</button>

      <button className="btn" title={t('releaseTitle')} onClick={() => exportAll(strip)}>{t('release')}</button>
      <button className="btn" onClick={() => exportComic(strip)}>PNG</button>
      <button className="btn" title={t('pngVerticalTitle')} onClick={() => exportVertical(strip)}>PNG ↕</button>
      <button className="btn" title={t('pngCarouselTitle')} onClick={() => exportCarousel(strip)}>PNG ×4</button>
      <button className="btn" title={t('jsonDownTitle')} onClick={() => exportStripJson(strip)}>JSON ↓</button>
      <button className="btn" title={t('jsonUpTitle')} onClick={() => fileRef.current?.click()}>JSON ↑</button>
      <input ref={fileRef} type="file" accept=".json,application/json" style={{ display: 'none' }} onChange={onImportFile} />
      <button className="btn btn-red" onClick={resetStrip}>{t('reset')}</button>

      {showScenario && <ScenarioModal onClose={() => setShowScenario(false)} />}
    </div>
  );
}
