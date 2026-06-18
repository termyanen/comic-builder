import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ComicStrip, PanelData, Language, SpeechTail, BgThemeId } from '../types/comic';

export interface SeriesEntry {
  id: string;
  strip: ComicStrip;
  updatedAt: number;
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
}

function defaultPanel(overrides?: Partial<PanelData>): PanelData {
  return {
    character: 'dev', mood: 'happy', background: 'office', props: ['laptop'],
    speech: '', caption: '', charX: 0, charY: 0, propX: 0, propY: 0,
    speechX: 0, speechY: 0, speechScale: 0, speechTail: 'bottom-left' as SpeechTail,
    bgTheme: 'blue' as BgThemeId,
    ...overrides,
  };
}

function defaultStrip(): ComicStrip {
  return {
    seriesName: 'termyanen', episodeNumber: '#001', language: 'ru', showWatermark: true,
    panels: [
      defaultPanel({ speech: 'Готово! Всё работает!' }),
      defaultPanel({ character: 'pm', mood: 'smug', background: 'empty', props: ['scroll'], speech: 'Можем добавить пару фич?' }),
      defaultPanel({ character: 'dev', mood: 'surprised', background: 'dark', props: ['none'], speech: 'Пару — это сколько?!' }),
      defaultPanel({ character: 'pm', mood: 'happy', background: 'empty', props: ['scroll'], speech: 'Ну немного :)' }),
    ],
  };
}

function hotfixStrip(): ComicStrip {
  return {
    seriesName: 'Хотфикс', episodeNumber: '#001', language: 'ru', showWatermark: true,
    panels: [
      // Панель 1: Dev уверенно деплоит «мелкий» фикс
      defaultPanel({
        character: 'dev', mood: 'happy', background: 'office', bgTheme: 'blue',
        props: ['coffee'], propX: 8, propY: 2,
        speech: 'Мелкий хотфикс. Одна строчка. Пять минут — и домой.',
        speechTail: 'bottom-left',
      }),
      // Панель 2: Boss в панике — прод упал
      defaultPanel({
        character: 'boss', mood: 'angry', background: 'dark', bgTheme: 'red',
        props: ['phone'], propX: 10, propY: 2,
        speech: 'ПРОД УПАЛ. Клиенты не могут войти. Звонит директор.',
        speechTail: 'bottom-right',
        caption: '17 минут спустя',
      }),
      // Панель 3: Dev не понимает что произошло
      defaultPanel({
        character: 'dev', mood: 'surprised', background: 'dark', bgTheme: 'red',
        props: ['none'],
        speech: 'Но... там была одна строчка?!',
        speechTail: 'bottom-left',
      }),
      // Панель 4: DevOps знал, но молчал
      defaultPanel({
        character: 'devops', mood: 'smug', background: 'server', bgTheme: 'green',
        props: ['beer'], propX: 8, propY: 2,
        speech: 'Строчка задела конфиг прода. Я знал. Молчал.',
        speechTail: 'bottom-left',
      }),
    ],
  };
}

// Syncs current strip into its seriesList entry
function syncStrip(
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

const initialId = genId();
const initialStrip = hotfixStrip();

interface ComicState {
  strip: ComicStrip;
  activePanel: number;
  seriesList: SeriesEntry[];
  activeSeriesId: string;

  // Series CRUD
  newSeries: () => void;
  loadSeries: (id: string) => void;
  deleteSeries: (id: string) => void;
  updateSeriesEntry: (id: string, seriesName: string, episodeNumber: string) => void;

  // Panel editing
  selectPanel: (index: number) => void;
  updatePanel: (index: number, updates: Partial<PanelData>) => void;
  updateActivePanel: (updates: Partial<PanelData>) => void;
  setSeriesName: (name: string) => void;
  setEpisodeNumber: (num: string) => void;
  setLanguage: (lang: Language) => void;
  setShowWatermark: (val: boolean) => void;
  resetStrip: () => void;
}

export const useComicStore = create<ComicState>()(
  persist(
    (set, get) => ({
      strip: initialStrip,
      activePanel: 0,
      seriesList: [{ id: initialId, strip: initialStrip, updatedAt: Date.now() }],
      activeSeriesId: initialId,

      newSeries() {
        const id = genId();
        const strip = defaultStrip();
        set(state => ({
          seriesList: [{ id, strip, updatedAt: Date.now() }, ...state.seriesList],
          activeSeriesId: id,
          strip,
          activePanel: 0,
        }));
      },

      loadSeries(id) {
        set(state => {
          const entry = state.seriesList.find(s => s.id === id);
          if (!entry) return {};
          return { activeSeriesId: id, strip: entry.strip, activePanel: 0 };
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

      resetStrip() {
        const strip = defaultStrip();
        set(state => syncStrip(state, strip));
        set({ activePanel: 0 });
      },
    }),
    { name: 'comic-builder-v3' }
  )
);
