import { useComicStore } from '../../store/comicStore';
import { getAllCharacters, getAllMoods, getAllBackgrounds, getAllProps } from '../../sprites/registry';
import type { CharacterId, MoodId, BackgroundId, PropId, SpeechTail, BgThemeId } from '../../types/comic';
import { BG_THEME_LABELS } from '../../sprites/backgrounds/themes';

const characters = getAllCharacters();
const moods = getAllMoods();
const backgrounds = getAllBackgrounds();
const props = getAllProps();

export function EditorSidebar() {
  const { strip, activePanel, updateActivePanel } = useComicStore();
  const panel = strip.panels[activePanel];
  const lang = strip.language;

  return (
    <div className="editor">
      <div className="editor-title">▶ Панель {activePanel + 1}</div>

      <div className="field-row">
        <div className="field">
          <label>Персонаж</label>
          <select
            value={panel.character}
            onChange={e => updateActivePanel({ character: e.target.value as CharacterId })}
          >
            {characters.map(c => (
              <option key={c.id} value={c.id}>
                {lang === 'ru' ? c.nameRu : c.name}
              </option>
            ))}
            <option value="both">{lang === 'ru' ? 'Оба' : 'Both'}</option>
            <option value="none">{lang === 'ru' ? 'Никого' : 'None'}</option>
          </select>
        </div>

        <div className="field">
          <label>Настроение</label>
          <select
            value={panel.mood}
            onChange={e => updateActivePanel({ mood: e.target.value as MoodId })}
          >
            {moods.map(m => (
              <option key={m.id} value={m.id}>
                {lang === 'ru' ? m.nameRu : m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Фон</label>
          <select
            value={panel.background}
            onChange={e => updateActivePanel({ background: e.target.value as BackgroundId })}
          >
            {backgrounds.map(b => (
              <option key={b.id} value={b.id}>
                {lang === 'ru' ? b.nameRu : b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Тема цветов</label>
          <select
            value={panel.bgTheme}
            onChange={e => updateActivePanel({ bgTheme: e.target.value as BgThemeId })}
          >
            {(Object.keys(BG_THEME_LABELS) as BgThemeId[]).map(id => (
              <option key={id} value={id}>{BG_THEME_LABELS[id]}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Предмет</label>
          <select
            value={panel.props[0] ?? 'none'}
            onChange={e => {
              const val = e.target.value as PropId;
              updateActivePanel({ props: val === 'none' ? ['none'] : [val] });
            }}
          >
            <option value="none">—</option>
            {props.map(pr => (
              <option key={pr.id} value={pr.id}>
                {lang === 'ru' ? pr.nameRu : pr.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Персонаж X / Y</label>
          <div className="offset-row">
            <input
              type="range"
              min={-30}
              max={30}
              value={panel.charX}
              onChange={e => updateActivePanel({ charX: Number(e.target.value) })}
            />
            <input
              type="range"
              min={-30}
              max={30}
              value={panel.charY}
              onChange={e => updateActivePanel({ charY: Number(e.target.value) })}
            />
            <span className="offset-val">{panel.charX},{panel.charY}</span>
          </div>
        </div>
        <div className="field">
          <label>Предмет X / Y</label>
          <div className="offset-row">
            <input
              type="range"
              min={-30}
              max={30}
              value={panel.propX}
              onChange={e => updateActivePanel({ propX: Number(e.target.value) })}
            />
            <input
              type="range"
              min={-30}
              max={30}
              value={panel.propY}
              onChange={e => updateActivePanel({ propY: Number(e.target.value) })}
            />
            <span className="offset-val">{panel.propX},{panel.propY}</span>
          </div>
        </div>
      </div>

      <div className="field">
        <label>Речевой пузырь (пусто = нет)</label>
        <input
          type="text"
          value={panel.speech}
          placeholder="Всё работает!"
          onChange={e => updateActivePanel({ speech: e.target.value })}
        />
      </div>

      <div className="field">
        <label>Хвост облака</label>
        <select
          value={panel.speechTail}
          onChange={e => updateActivePanel({ speechTail: e.target.value as SpeechTail })}
        >
          <option value="bottom-left">↙ Снизу слева</option>
          <option value="bottom-center">↓ Снизу по центру</option>
          <option value="bottom-right">↘ Снизу справа</option>
          <option value="top-left">↖ Сверху слева</option>
          <option value="top-center">↑ Сверху по центру</option>
          <option value="top-right">↗ Сверху справа</option>
          <option value="none">— Без хвоста</option>
        </select>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Облако X / Y</label>
          <div className="offset-row">
            <input
              type="range"
              min={-20}
              max={20}
              value={panel.speechX}
              onChange={e => updateActivePanel({ speechX: Number(e.target.value) })}
            />
            <input
              type="range"
              min={-20}
              max={30}
              value={panel.speechY}
              onChange={e => updateActivePanel({ speechY: Number(e.target.value) })}
            />
            <span className="offset-val">{panel.speechX},{panel.speechY}</span>
          </div>
        </div>
        <div className="field">
          <label>Размер облака</label>
          <div className="offset-row">
            <input
              type="range"
              min={-6}
              max={12}
              value={panel.speechScale}
              onChange={e => updateActivePanel({ speechScale: Number(e.target.value) })}
            />
            <span className="offset-val">{panel.speechScale}</span>
          </div>
        </div>
      </div>

      <div className="field">
        <label>Подпись панели (внизу)</label>
        <input
          type="text"
          value={panel.caption}
          placeholder=""
          onChange={e => updateActivePanel({ caption: e.target.value })}
        />
      </div>

      <div className="hint">
        Клик по панели → редактировать<br />
        <span>Export → PNG 1080×1080 для Instagram/Threads/Telegram</span>
      </div>
    </div>
  );
}
