import { useComicStore } from '../../store/comicStore';
import { getAllCharacters, getAllMoods, getAllBackgrounds, getAllProps, getAllPoses, getAllFx, resolveOutfit } from '../../svg/registry';
import { wrapText } from '../../svg/text';
import { FONT, BG_THEME_LABELS } from '../../style/tokens';
import { getSceneTemplates } from '../../templates';
import { useT } from '../../i18n';
import type { StrKey } from '../../i18n';
import type { CharacterId, MoodId, PoseId, GazeId, TurnId, BackgroundId, PropId, FxId, SpeechKind, SpeechTail, BubbleStyle, BgThemeId, Outfit } from '../../types/comic';

const characters = getAllCharacters();
const moods = getAllMoods();
const poses = getAllPoses();
const backgrounds = getAllBackgrounds();
const props = getAllProps();
const fxList = getAllFx();

const GAZE_KEYS: Record<GazeId, StrKey> = {
  front: 'gazeFront',
  left: 'gazeLeft',
  right: 'gazeRight',
  up: 'gazeUp',
};

const BUBBLE_STYLE_KEYS: { id: BubbleStyle; key: StrKey }[] = [
  { id: 'normal', key: 'styleNormal' },
  { id: 'shout', key: 'styleShout' },
  { id: 'think', key: 'styleThink' },
  { id: 'whisper', key: 'styleWhisper' },
  { id: 'robo', key: 'styleRobo' },
];

const TAIL_KEYS: { id: SpeechTail; key: StrKey }[] = [
  { id: 'bottom-left', key: 'tailBL' },
  { id: 'bottom-center', key: 'tailBC' },
  { id: 'bottom-right', key: 'tailBR' },
  { id: 'top-left', key: 'tailTL' },
  { id: 'top-center', key: 'tailTC' },
  { id: 'top-right', key: 'tailTR' },
  { id: 'none', key: 'tailNone' },
];

const OUTFIT_FIELDS: { key: keyof Outfit; labelKey: StrKey }[] = [
  { key: 'shirt', labelKey: 'outfitTop' },
  { key: 'pants', labelKey: 'outfitBottom' },
  { key: 'skin', labelKey: 'outfitSkin' },
  { key: 'accent', labelKey: 'outfitAccent' },
];

function OutfitEditor({ character }: { character: CharacterId }) {
  const { strip, updateOutfit } = useComicStore();
  const t = useT();
  const outfit = resolveOutfit(strip, character);
  const def = characters.find(c => c.id === character);

  return (
    <div className="outfit-card">
      <div className="slot-title">
        👕 {t('outfit')}: {strip.language === 'ru' ? def?.nameRu : def?.name}
        <span className="slot-sub"> {t('outfitSeries')}</span>
      </div>
      <div className="outfit-row">
        {OUTFIT_FIELDS.map(f => (
          <label key={f.key} className="outfit-swatch" title={t(f.labelKey)}>
            <input
              type="color"
              value={outfit[f.key]}
              onChange={e => updateOutfit(character, { [f.key]: e.target.value })}
            />
            <span>{t(f.labelKey)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function CharSlotEditor({ slot }: { slot: number }) {
  const { strip, activePanel, updateActiveChar } = useComicStore();
  const t = useT();
  const char = strip.panels[activePanel].chars[slot];
  const lang = strip.language;
  const charDef = characters.find(c => c.id === char.id);
  const availablePoses = poses.filter(p => charDef?.poses.includes(p.id));

  return (
    <div className="slot-card">
      <div className="slot-title">{t('character')} {slot + 1} · {slot === 0 ? t('slotRight') : t('slotLeft')}</div>

      <div className="field-row">
        <div className="field">
          <label>{t('who')}</label>
          <select
            value={char.id ?? ''}
            onChange={e => updateActiveChar(slot, { id: (e.target.value || null) as CharacterId | null })}
          >
            <option value="">—</option>
            {characters.map(c => (
              <option key={c.id} value={c.id}>
                {lang === 'ru' ? c.nameRu : c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>{t('mood')}</label>
          <select
            value={char.mood}
            disabled={!char.id}
            onChange={e => updateActiveChar(slot, { mood: e.target.value as MoodId })}
          >
            {moods.map(m => (
              <option key={m.id} value={m.id}>
                {lang === 'ru' ? m.nameRu : m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {char.id && (
        <>
          <div className="field-row">
            <div className="field">
              <label>{t('pose')} <button className="mini-btn" title={t('toAllTitle')}
                onClick={() => useComicStore.getState().applyCharToAll(slot)}>{t('toAll')}</button></label>
              <select
                value={char.pose ?? 'stand'}
                disabled={availablePoses.length <= 1}
                onChange={e => updateActiveChar(slot, { pose: e.target.value as PoseId })}
              >
                {availablePoses.map(p => (
                  <option key={p.id} value={p.id}>
                    {lang === 'ru' ? p.nameRu : p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>{t('held')}</label>
              <select
                value={char.held ?? 'none'}
                onChange={e => updateActiveChar(slot, { held: e.target.value as PropId })}
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

          <div className="field-row-3">
            <div className="field">
              <label>{t('gaze')}</label>
              <select
                value={char.gaze ?? 'front'}
                onChange={e => updateActiveChar(slot, { gaze: e.target.value as GazeId })}
              >
                {(Object.keys(GAZE_KEYS) as GazeId[]).map(g => (
                  <option key={g} value={g}>{t(GAZE_KEYS[g])}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>{t('turn')}</label>
              <select
                value={char.turn ?? 'front'}
                onChange={e => updateActiveChar(slot, { turn: e.target.value as TurnId })}
              >
                <option value="front">{t('turnFront')}</option>
                <option value="quarter">{t('turnQuarter')}</option>
              </select>
            </div>
            <div className="field">
              <label>{t('charScale')}</label>
              <div className="offset-row">
                <input
                  type="range"
                  min={60}
                  max={230}
                  step={5}
                  value={Math.round((char.scale ?? 1) * 100)}
                  onChange={e => updateActiveChar(slot, { scale: Number(e.target.value) / 100 })}
                />
                <span className="offset-val">{Math.round((char.scale ?? 1) * 100)}%</span>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="mirror-toggle">
              <input
                type="checkbox"
                checked={char.flip}
                onChange={e => updateActiveChar(slot, { flip: e.target.checked })}
              />
              <span>{t('mirror')}</span>
            </label>
          </div>

          <div className="field">
            <label>{t('position')}</label>
            <div className="offset-row">
              <input
                type="range"
                min={-40}
                max={40}
                value={char.x}
                onChange={e => updateActiveChar(slot, { x: Number(e.target.value) })}
              />
              <input
                type="range"
                min={-30}
                max={30}
                value={char.y}
                onChange={e => updateActiveChar(slot, { y: Number(e.target.value) })}
              />
              <span className="offset-val">{char.x},{char.y}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function EditorSidebar() {
  const { strip, activePanel, updateActivePanel, copyPanel, swapPanels, userTemplates, saveUserTemplate, deleteUserTemplate } = useComicStore();
  const t = useT();
  const panel = strip.panels[activePanel];
  const lang = strip.language;
  const usedChars = [...new Set(panel.chars.map(c => c.id).filter((id): id is CharacterId => id !== null))];
  const sceneTemplates = getSceneTemplates(lang);
  const speechTooLong = panel.speechKind === 'bubble' && panel.speech
    ? wrapText(panel.speech, `700 21px ${FONT.hand}`, 250).length > 3
    : false;

  function onSaveTemplate() {
    const label = window.prompt(t('tplNamePrompt'));
    if (label?.trim()) saveUserTemplate(label.trim());
  }

  return (
    <div className="editor">
      <div className="editor-title-row">
        <div className="editor-title">▶ {t('panel')} {activePanel + 1}</div>
        <div className="panel-ops">
          <button className="series-btn" title={t('copyNextTitle')}
            disabled={activePanel === 3}
            onClick={() => copyPanel(activePanel, activePanel + 1)}>⧉→</button>
          <button className="series-btn" title={t('swapNextTitle')}
            disabled={activePanel === 3}
            onClick={() => swapPanels(activePanel, activePanel + 1)}>⇄</button>
        </div>
      </div>

      <div className="field">
        <label>{t('sceneTemplate')}</label>
        <div className="tpl-grid">
          {sceneTemplates.map(tpl => (
            <button key={tpl.id} className="tpl-btn" onClick={() => updateActivePanel(tpl.panel)}>
              {tpl.label}
            </button>
          ))}
          {userTemplates.map(tpl => (
            <button key={tpl.id} className="tpl-btn tpl-user" title={t('userTplTitle')}
              onClick={() => updateActivePanel(tpl.panel)}
              onContextMenu={e => {
                e.preventDefault();
                if (window.confirm(`${t('tplDeleteConfirm')} «${tpl.label}»?`)) deleteUserTemplate(tpl.id);
              }}>
              ★ {tpl.label}
            </button>
          ))}
          <button className="tpl-btn tpl-save" title={t('saveTplTitle')} onClick={onSaveTemplate}>
            {t('saveTpl')}
          </button>
        </div>
      </div>

      <div className="editor-divider" />

      <CharSlotEditor slot={0} />
      <CharSlotEditor slot={1} />

      {usedChars.length > 0 && <div className="editor-divider" />}
      {usedChars.map(id => <OutfitEditor key={id} character={id} />)}

      <div className="editor-divider" />

      <div className="field-row-3">
        <div className="field">
          <label>{t('background')}</label>
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
          <label>{t('bgTheme')}</label>
          <select
            value={panel.bgTheme}
            onChange={e => updateActivePanel({ bgTheme: e.target.value as BgThemeId })}
          >
            {(Object.keys(BG_THEME_LABELS) as BgThemeId[]).map(id => (
              <option key={id} value={id}>{BG_THEME_LABELS[id][lang]}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>{t('prop')}</label>
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

      <div className="field-row-3">
        <div className="field">
          <label>{t('fx')}</label>
          <select
            value={panel.fx ?? 'none'}
            onChange={e => updateActivePanel({ fx: e.target.value as FxId, fxX: 0, fxY: 0, fxRot: 0 })}
          >
            <option value="none">—</option>
            {fxList.map(f => (
              <option key={f.id} value={f.id}>
                {lang === 'ru' ? f.nameRu : f.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>{t('fxRot')}</label>
          <div className="offset-row">
            <input
              type="range"
              min={-180}
              max={180}
              step={5}
              value={panel.fxRot ?? 0}
              onChange={e => updateActivePanel({ fxRot: Number(e.target.value) })}
            />
            <span className="offset-val">{panel.fxRot ?? 0}°</span>
          </div>
        </div>
        <div className="field">
          <label>{t('fxSize')}</label>
          <div className="offset-row">
            <input
              type="range"
              min={50}
              max={220}
              step={10}
              value={Math.round((panel.fxScale ?? 1) * 100)}
              onChange={e => updateActivePanel({ fxScale: Number(e.target.value) / 100 })}
            />
            <span className="offset-val">{Math.round((panel.fxScale ?? 1) * 100)}%</span>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="mirror-toggle">
          <input
            type="checkbox"
            checked={panel.propFront ?? false}
            onChange={e => updateActivePanel({ propFront: e.target.checked })}
          />
          <span>{t('propFront')}</span>
        </label>
      </div>

      <div className="field-row">
        <div className="field">
          <label>{t('propXY')}</label>
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
        <div className="field">
          <label>{t('propRot')}</label>
          <div className="offset-row">
            <input
              type="range"
              min={-180}
              max={180}
              step={5}
              value={panel.propRot ?? 0}
              onChange={e => updateActivePanel({ propRot: Number(e.target.value) })}
            />
            <span className="offset-val">{panel.propRot ?? 0}°</span>
          </div>
        </div>
      </div>

      <div className="editor-divider" />

      <div className="field-row-3">
        <div className="field">
          <label>{t('speechKind')}</label>
          <select
            value={panel.speechKind}
            onChange={e => updateActivePanel({ speechKind: e.target.value as SpeechKind })}
          >
            <option value="bubble">{t('kindBubble')}</option>
            <option value="terminal">{t('kindTerminal')}</option>
            <option value="button">{t('kindButton')}</option>
            <option value="sfx">{t('kindSfx')}</option>
            <option value="lettering">{t('kindLettering')}</option>
          </select>
        </div>
        {panel.speechKind === 'bubble' && (
          <div className="field">
            <label>{t('voice')}</label>
            <select
              value={panel.speechStyle ?? 'normal'}
              onChange={e => updateActivePanel({ speechStyle: e.target.value as BubbleStyle })}
            >
              {BUBBLE_STYLE_KEYS.map(s => (
                <option key={s.id} value={s.id}>{t(s.key)}</option>
              ))}
            </select>
          </div>
        )}
        <div className="field">
          <label>{t('tail')}</label>
          <select
            value={panel.speechTail}
            onChange={e => updateActivePanel({ speechTail: e.target.value as SpeechTail, speechTailX: 0, speechTailY: 0 })}
          >
            {TAIL_KEYS.map(o => (
              <option key={o.id} value={o.id}>{t(o.key)}</option>
            ))}
          </select>
        </div>
      </div>

      {panel.speechKind === 'lettering' && (
        <div className="field-row">
          <div className="field">
            <label>{t('letteringColor')}</label>
            <input
              type="color"
              value={panel.speechColor ?? '#F5D547'}
              onChange={e => updateActivePanel({ speechColor: e.target.value })}
            />
          </div>
          <div className="field">
            <label>{t('tilt')}</label>
            <div className="offset-row">
              <input
                type="range"
                min={-35}
                max={35}
                step={1}
                value={panel.speechRot ?? 0}
                onChange={e => updateActivePanel({ speechRot: Number(e.target.value) })}
              />
              <span className="offset-val">{panel.speechRot ?? 0}°</span>
            </div>
          </div>
        </div>
      )}

      <div className="field">
        <label>{t('speech')}</label>
        <textarea
          rows={3}
          value={panel.speech}
          placeholder={panel.speechKind === 'terminal'
            ? t('terminalPlaceholder')
            : panel.speechKind === 'lettering' ? t('letteringPlaceholder') : t('speechPlaceholder')}
          onChange={e => updateActivePanel({ speech: e.target.value })}
        />
        {panel.speechKind === 'terminal' && (
          <div className="hint">{t('terminalHint')}</div>
        )}
        {panel.speechKind === 'bubble' && speechTooLong && (
          <div className="warn">{t('tooLong')}</div>
        )}
      </div>

      <div className="field-row-3">
        <div className="field">
          <label>{t('bubbleXY')}</label>
          <div className="offset-row">
            <input
              type="range"
              min={-20}
              max={35}
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
          <label>{t('bubbleWidth')}</label>
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
        <div className="field">
          <label>{t('bubbleZoom')}</label>
          <div className="offset-row">
            <input
              type="range"
              min={60}
              max={170}
              step={5}
              value={Math.round((panel.speechZoom ?? 1) * 100)}
              onChange={e => updateActivePanel({ speechZoom: Number(e.target.value) / 100 })}
            />
            <span className="offset-val">{Math.round((panel.speechZoom ?? 1) * 100)}%</span>
          </div>
        </div>
      </div>

      <div className="field">
        <label>{t('speech2')}</label>
        <textarea
          rows={2}
          value={panel.speech2 ?? ''}
          placeholder={t('speech2Placeholder')}
          onChange={e => updateActivePanel({ speech2: e.target.value })}
        />
      </div>

      {panel.speech2 && (
        <div className="field">
          <label>{t('speech2Zoom')}</label>
          <div className="offset-row">
            <input
              type="range"
              min={60}
              max={170}
              step={5}
              value={Math.round((panel.speech2Zoom ?? 1) * 100)}
              onChange={e => updateActivePanel({ speech2Zoom: Number(e.target.value) / 100 })}
            />
            <span className="offset-val">{Math.round((panel.speech2Zoom ?? 1) * 100)}%</span>
          </div>
        </div>
      )}

      {panel.speech2 && (
        <div className="field-row">
          <div className="field">
            <label>{t('speech2Voice')}</label>
            <select
              value={panel.speech2Style ?? 'normal'}
              onChange={e => updateActivePanel({ speech2Style: e.target.value as BubbleStyle })}
            >
              {BUBBLE_STYLE_KEYS.map(s => (
                <option key={s.id} value={s.id}>{t(s.key)}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>{t('speech2Tail')}</label>
            <select
              value={panel.speech2Tail ?? 'bottom-right'}
              onChange={e => updateActivePanel({ speech2Tail: e.target.value as SpeechTail, speech2TailX: 0, speech2TailY: 0 })}
            >
              {TAIL_KEYS.map(o => (
                <option key={o.id} value={o.id}>{t(o.key)}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="field">
        <label>{t('caption')}</label>
        <input
          type="text"
          value={panel.caption}
          placeholder=""
          onChange={e => updateActivePanel({ caption: e.target.value })}
        />
      </div>

      {panel.caption && (
        <div className="field">
          <label>{t('captionXY')}</label>
          <div className="offset-row">
            <input
              type="range"
              min={-2}
              max={55}
              value={panel.captionX ?? 0}
              onChange={e => updateActivePanel({ captionX: Number(e.target.value) })}
            />
            <input
              type="range"
              min={-55}
              max={4}
              value={panel.captionY ?? 0}
              onChange={e => updateActivePanel({ captionY: Number(e.target.value) })}
            />
            <span className="offset-val">{panel.captionX ?? 0},{panel.captionY ?? 0}</span>
          </div>
        </div>
      )}

      <div className="hint">
        {t('hint1')}<br />
        <span>{t('hint2')}</span>
      </div>
    </div>
  );
}
