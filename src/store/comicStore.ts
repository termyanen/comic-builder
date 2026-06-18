import { create } from 'zustand';
import type { ComicStrip, PanelData, CharacterId, MoodId, BackgroundId, PropId, Language, SpeechTail, BgThemeId } from '../types/comic';

function defaultPanel(overrides?: Partial<PanelData>): PanelData {
  return {
    character: 'dev',
    mood: 'happy',
    background: 'office',
    props: ['laptop'],
    speech: '',
    caption: '',
    charX: 0,
    charY: 0,
    propX: 0,
    propY: 0,
    speechX: 0,
    speechY: 0,
    speechScale: 0,
    speechTail: 'bottom-left' as SpeechTail,
    bgTheme: 'blue' as BgThemeId,
    ...overrides,
  };
}

function defaultStrip(): ComicStrip {
  return {
    seriesName: 'termyanen',
    episodeNumber: '#001',
    language: 'ru',
    showWatermark: true,
    panels: [
      defaultPanel({ speech: 'Готово! Всё работает!' }),
      defaultPanel({ character: 'pm', mood: 'smug', background: 'empty', props: ['scroll'], speech: 'Можем добавить пару фич?' }),
      defaultPanel({ character: 'dev', mood: 'surprised', background: 'dark', props: ['none'], speech: 'Пару — это сколько?!' }),
      defaultPanel({ character: 'pm', mood: 'happy', background: 'empty', props: ['scroll'], speech: 'Ну немного :)' }),
    ],
  };
}

interface ComicState {
  strip: ComicStrip;
  activePanel: number;

  selectPanel: (index: number) => void;
  updatePanel: (index: number, updates: Partial<PanelData>) => void;
  setSeriesName: (name: string) => void;
  setEpisodeNumber: (num: string) => void;
  setLanguage: (lang: Language) => void;
  setShowWatermark: (val: boolean) => void;
  resetStrip: () => void;

  // Convenience — update active panel
  updateActivePanel: (updates: Partial<PanelData>) => void;
}

export const useComicStore = create<ComicState>((set, get) => ({
  strip: defaultStrip(),
  activePanel: 0,

  selectPanel(index) {
    set({ activePanel: index });
  },

  updatePanel(index, updates) {
    set(state => {
      const panels = [...state.strip.panels] as ComicStrip['panels'];
      panels[index] = { ...panels[index], ...updates };
      return { strip: { ...state.strip, panels } };
    });
  },

  updateActivePanel(updates) {
    const { activePanel, updatePanel } = get();
    updatePanel(activePanel, updates);
  },

  setSeriesName(name) {
    set(state => ({ strip: { ...state.strip, seriesName: name } }));
  },

  setEpisodeNumber(num) {
    set(state => ({ strip: { ...state.strip, episodeNumber: num } }));
  },

  setLanguage(lang) {
    set(state => ({ strip: { ...state.strip, language: lang } }));
  },

  setShowWatermark(val) {
    set(state => ({ strip: { ...state.strip, showWatermark: val } }));
  },

  resetStrip() {
    set({ strip: defaultStrip(), activePanel: 0 });
  },
}));
