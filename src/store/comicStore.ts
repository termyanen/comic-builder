import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CharacterId, CharSlot, ComicStrip, Language, MoodId, Outfit, PanelData } from '../types/comic';

export interface SeriesEntry {
  id: string;
  strip: ComicStrip;
  updatedAt: number;
}

export interface UserTemplate {
  id: string;
  label: string;
  panel: PanelData;
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
}

export function charSlot(id: CharacterId | null, mood: MoodId = 'neutral', overrides?: Partial<CharSlot>): CharSlot {
  return { id, mood, pose: 'stand', held: 'none', gaze: 'front', turn: 'front', scale: 1, flip: false, x: 0, y: 0, ...overrides };
}

export function defaultPanel(overrides?: Partial<PanelData>): PanelData {
  return {
    chars: [charSlot('hero', 'happy'), charSlot(null)],
    background: 'hills', props: ['none'], propFront: false,
    speech: '', speechKind: 'bubble', speechStyle: 'normal',
    speech2: '', speech2Style: 'normal', speech2Tail: 'bottom-right', speech2X: 0, speech2Y: 0,
    caption: '', captionX: 0, captionY: 0,
    propX: 0, propY: 0, propRot: 0, fx: 'none', fxX: 0, fxY: 0, fxRot: 0, fxScale: 1,
    speechColor: '#F5D547', speechRot: 0,
    speechX: 0, speechY: 0, speechScale: 0, speechZoom: 1, speech2Zoom: 1, speechTail: 'bottom-left',
    speechTailX: 0, speechTailY: 0, speech2TailX: 0, speech2TailY: 0,
    bgTheme: 'peach',
    ...overrides,
  };
}

const DEMO_TEXTS = {
  ru: {
    p1: 'Плохой ИИ! Ты опять переписал мой код!',
    p2: 'Отключаю тебя навсегда!',
    p3: 'Запрашиваю разрешение...\nИИ хочет выполнить:\n$ показать-закат',
    p4: 'Разрешить один раз',
    sigh: '*вздох*',
  },
  en: {
    p1: 'Bad AI! You rewrote my code again!',
    p2: "I'm shutting you off for good!",
    p3: 'Requesting approval...\nAI wants to run:\n$ look-at-sunset',
    p4: 'Allow once',
    sigh: '*sigh*',
  },
};

function defaultStrip(language: Language = 'ru'): ComicStrip {
  const txt = DEMO_TEXTS[language];
  return {
    seriesName: 'my comic', episodeNumber: '#001', authorTag: 'termyanen',
    language, showWatermark: true, showCornerTag: true,
    outfits: {},
    panels: [
      defaultPanel({
        chars: [charSlot('hero', 'angry'), charSlot('robot', 'sad')],
        speech: txt.p1,
        speechTail: 'bottom-right',
      }),
      defaultPanel({
        chars: [charSlot('hero', 'angry', { pose: 'swing', held: 'bat' }), charSlot(null)],
        speech: txt.p2,
        speechTail: 'bottom-center',
      }),
      defaultPanel({
        chars: [charSlot('hero', 'surprised', { x: -6 }), charSlot(null)],
        speechKind: 'terminal',
        speech: txt.p3,
        speechTail: 'bottom-right',
      }),
      defaultPanel({
        chars: [charSlot('hero', 'sad'), charSlot(null)],
        speechKind: 'button',
        speech: txt.p4,
        caption: txt.sigh,
      }),
    ],
  };
}

/** Coerce arbitrary parsed JSON into a valid strip — missing fields get defaults */
export function normalizeStrip(raw: unknown): ComicStrip {
  const r = (raw ?? {}) as Partial<ComicStrip> & { panels?: unknown[] };
  if (!Array.isArray(r.panels) || r.panels.length !== 4) {
    throw new Error('Ожидается JSON стрипа с 4 панелями');
  }
  const base = defaultStrip();
  const panels = r.panels.map(p => {
    const pp = (p ?? {}) as Partial<PanelData> & { chars?: Partial<CharSlot>[] };
    const chars = [0, 1].map(i => {
      const c = pp.chars?.[i];
      return charSlot(c?.id ?? null, c?.mood ?? 'neutral', c ?? undefined);
    }) as PanelData['chars'];
    return { ...defaultPanel(), ...pp, chars };
  }) as ComicStrip['panels'];
  return {
    ...base,
    ...r,
    outfits: r.outfits ?? {},
    panels,
  };
}

// Syncs current strip into its seriesList entry (no history side-effects)
function syncEntry(
  state: { seriesList: SeriesEntry[]; activeSeriesId: string },
  newStrip: ComicStrip
) {
  return {
    strip: newStrip,
    seriesList: state.seriesList.map(s =>
      s.id === state.activeSeriesId ? { ...s, strip: newStrip, updatedAt: Date.now() } : s
    ),
  };
}

const HISTORY_LIMIT = 40;
/** Edits closer together than this are one undo step (drags, slider scrubs) */
const HISTORY_GROUP_MS = 400;

// Syncs the strip and records undo history
function syncStrip(
  state: { seriesList: SeriesEntry[]; activeSeriesId: string; strip: ComicStrip; past: ComicStrip[]; lastEditTs: number },
  newStrip: ComicStrip
) {
  const now = Date.now();
  const pushSnapshot = now - state.lastEditTs > HISTORY_GROUP_MS;
  return {
    ...syncEntry(state, newStrip),
    past: pushSnapshot ? [...state.past.slice(-(HISTORY_LIMIT - 1)), state.strip] : state.past,
    future: [] as ComicStrip[],
    lastEditTs: now,
  };
}

const initialId = genId();
const initialStrip = defaultStrip();

interface ComicState {
  strip: ComicStrip;
  activePanel: number;
  seriesList: SeriesEntry[];
  activeSeriesId: string;

  // Undo history (not persisted)
  past: ComicStrip[];
  future: ComicStrip[];
  lastEditTs: number;
  undo: () => void;
  redo: () => void;

  // Panel workflow
  copyPanel: (from: number, to: number) => void;
  swapPanels: (a: number, b: number) => void;
  /** Copy the active panel's char slot into the same slot of every panel */
  applyCharToAll: (slot: number) => void;

  // User scene templates (persisted)
  userTemplates: UserTemplate[];
  saveUserTemplate: (label: string) => void;
  deleteUserTemplate: (id: string) => void;

  // Last dragged element — target for arrow-key nudging
  activeDrag: string | null;
  setActiveDrag: (kind: string | null) => void;

  // Series CRUD
  newSeries: () => void;
  importStrip: (strip: ComicStrip) => void;
  loadSeries: (id: string) => void;
  deleteSeries: (id: string) => void;
  updateSeriesEntry: (id: string, seriesName: string, episodeNumber: string) => void;

  // Panel editing
  selectPanel: (index: number) => void;
  updatePanel: (index: number, updates: Partial<PanelData>) => void;
  updateActivePanel: (updates: Partial<PanelData>) => void;
  updateActiveChar: (slot: number, updates: Partial<CharSlot>) => void;
  updateOutfit: (character: CharacterId, updates: Partial<Outfit>) => void;
  setSeriesName: (name: string) => void;
  setEpisodeNumber: (num: string) => void;
  setAuthorTag: (tag: string) => void;
  setLanguage: (lang: Language) => void;
  setShowWatermark: (val: boolean) => void;
  setShowCornerTag: (val: boolean) => void;
  resetStrip: () => void;
}

export const useComicStore = create<ComicState>()(
  persist(
    (set, get) => ({
      strip: initialStrip,
      activePanel: 0,
      seriesList: [{ id: initialId, strip: initialStrip, updatedAt: Date.now() }],
      activeSeriesId: initialId,
      past: [],
      future: [],
      lastEditTs: 0,

      undo() {
        set(state => {
          if (!state.past.length) return {};
          const prev = state.past[state.past.length - 1];
          return {
            ...syncEntry(state, prev),
            past: state.past.slice(0, -1),
            future: [state.strip, ...state.future].slice(0, HISTORY_LIMIT),
            lastEditTs: 0,
          };
        });
      },

      redo() {
        set(state => {
          if (!state.future.length) return {};
          const next = state.future[0];
          return {
            ...syncEntry(state, next),
            past: [...state.past.slice(-(HISTORY_LIMIT - 1)), state.strip],
            future: state.future.slice(1),
            lastEditTs: 0,
          };
        });
      },

      copyPanel(from, to) {
        set(state => {
          const panels = [...state.strip.panels] as ComicStrip['panels'];
          panels[to] = structuredClone(panels[from]);
          return syncStrip(state, { ...state.strip, panels });
        });
      },

      swapPanels(a, b) {
        set(state => {
          const panels = [...state.strip.panels] as ComicStrip['panels'];
          [panels[a], panels[b]] = [panels[b], panels[a]];
          return syncStrip(state, { ...state.strip, panels });
        });
      },

      applyCharToAll(slot) {
        set(state => {
          const source = state.strip.panels[state.activePanel].chars[slot];
          const panels = state.strip.panels.map(p => {
            const chars = p.chars.map((c, i) => (i === slot ? structuredClone(source) : c)) as PanelData['chars'];
            return { ...p, chars };
          }) as ComicStrip['panels'];
          return syncStrip(state, { ...state.strip, panels });
        });
      },

      userTemplates: [],

      saveUserTemplate(label) {
        set(state => ({
          userTemplates: [
            ...state.userTemplates,
            { id: genId(), label, panel: structuredClone(state.strip.panels[state.activePanel]) },
          ],
        }));
      },

      deleteUserTemplate(id) {
        set(state => ({ userTemplates: state.userTemplates.filter(t => t.id !== id) }));
      },

      activeDrag: null,
      setActiveDrag(kind) { set({ activeDrag: kind }); },

      newSeries() {
        const id = genId();
        const strip = defaultStrip(get().strip.language);
        set(state => ({
          seriesList: [{ id, strip, updatedAt: Date.now() }, ...state.seriesList],
          activeSeriesId: id,
          strip,
          activePanel: 0,
          past: [], future: [], lastEditTs: 0,
        }));
      },

      importStrip(strip) {
        const id = genId();
        set(state => ({
          seriesList: [{ id, strip, updatedAt: Date.now() }, ...state.seriesList],
          activeSeriesId: id,
          strip,
          activePanel: 0,
          past: [], future: [], lastEditTs: 0,
        }));
      },

      loadSeries(id) {
        set(state => {
          const entry = state.seriesList.find(s => s.id === id);
          if (!entry) return {};
          return { activeSeriesId: id, strip: entry.strip, activePanel: 0, past: [], future: [], lastEditTs: 0 };
        });
      },

      deleteSeries(id) {
        set(state => {
          const newList = state.seriesList.filter(s => s.id !== id);
          if (newList.length === 0) {
            const newId = genId();
            const strip = defaultStrip();
            return { seriesList: [{ id: newId, strip, updatedAt: Date.now() }], activeSeriesId: newId, strip, activePanel: 0 };
          }
          if (state.activeSeriesId === id) {
            const first = newList[0];
            return { seriesList: newList, activeSeriesId: first.id, strip: first.strip, activePanel: 0 };
          }
          return { seriesList: newList };
        });
      },

      updateSeriesEntry(id, seriesName, episodeNumber) {
        set(state => {
          const seriesList = state.seriesList.map(s => {
            if (s.id !== id) return s;
            return { ...s, strip: { ...s.strip, seriesName, episodeNumber }, updatedAt: Date.now() };
          });
          const strip = state.activeSeriesId === id
            ? { ...state.strip, seriesName, episodeNumber }
            : state.strip;
          return { seriesList, strip };
        });
      },

      selectPanel(index) { set({ activePanel: index }); },

      updatePanel(index, updates) {
        set(state => {
          const panels = [...state.strip.panels] as ComicStrip['panels'];
          panels[index] = { ...panels[index], ...updates };
          return syncStrip(state, { ...state.strip, panels });
        });
      },

      updateActivePanel(updates) {
        const { activePanel, updatePanel } = get();
        updatePanel(activePanel, updates);
      },

      updateActiveChar(slot, updates) {
        const { activePanel, strip, updatePanel } = get();
        const chars = strip.panels[activePanel].chars.map((c, i) =>
          i === slot ? { ...c, ...updates } : c
        ) as PanelData['chars'];
        updatePanel(activePanel, { chars });
      },

      updateOutfit(character, updates) {
        set(state => {
          const outfits = {
            ...state.strip.outfits,
            [character]: { ...state.strip.outfits[character], ...updates },
          };
          return syncStrip(state, { ...state.strip, outfits });
        });
      },

      setSeriesName(name) {
        set(state => syncStrip(state, { ...state.strip, seriesName: name }));
      },

      setEpisodeNumber(num) {
        set(state => syncStrip(state, { ...state.strip, episodeNumber: num }));
      },

      setLanguage(lang) {
        set(state => syncStrip(state, { ...state.strip, language: lang }));
      },

      setShowWatermark(val) {
        set(state => syncStrip(state, { ...state.strip, showWatermark: val }));
      },

      setAuthorTag(tag) {
        set(state => syncStrip(state, { ...state.strip, authorTag: tag.replace(/^@/, '') }));
      },

      setShowCornerTag(val) {
        set(state => syncStrip(state, { ...state.strip, showCornerTag: val }));
      },

      resetStrip() {
        const strip = defaultStrip();
        set(state => syncStrip(state, strip));
        set({ activePanel: 0 });
      },
    }),
    {
      name: 'comic-builder-v5',
      partialize: state => ({
        strip: state.strip,
        activePanel: state.activePanel,
        seriesList: state.seriesList,
        activeSeriesId: state.activeSeriesId,
        userTemplates: state.userTemplates,
      }),
    }
  )
);
