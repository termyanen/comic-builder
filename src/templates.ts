import type { Language, PanelData } from './types/comic';
import { charSlot } from './store/comicStore';

/**
 * Scene templates — one-click panel presets for the weekly grind.
 * Applied over the active panel; speech is a placeholder to rewrite.
 */
export interface SceneTemplate {
  id: string;
  label: string;
  panel: Partial<PanelData>;
}

interface TplDef {
  id: string;
  label: { ru: string; en: string };
  speech: { ru: string; en: string };
  caption?: { ru: string; en: string };
  panel: Partial<PanelData>;
}

const DEFS: TplDef[] = [
  {
    id: 'coding',
    label: { ru: '👨‍💻 Кодит', en: '👨‍💻 Coding' },
    speech: { ru: 'Ещё пять минут и готово', en: 'Five more minutes and it’s done' },
    panel: {
      background: 'desk', bgTheme: 'peach',
      chars: [charSlot('hero', 'neutral', { pose: 'typing', held: 'laptop' }), charSlot(null)],
      props: ['coffee'], propX: 0, propY: 0, fx: 'none',
      speechKind: 'bubble', speechTail: 'bottom-right', speechX: 0, speechY: 0,
    },
  },
  {
    id: 'meeting',
    label: { ru: '📅 Митинг', en: '📅 Meeting' },
    speech: { ru: 'Это займёт буквально пару минут', en: 'This will take literally two minutes' },
    caption: { ru: 'час спустя', en: 'an hour later' },
    panel: {
      background: 'meeting', bgTheme: 'mint',
      chars: [charSlot('pm', 'happy'), charSlot('hero', 'dead')],
      props: ['none'], fx: 'none',
      speechKind: 'bubble', speechTail: 'bottom-left', speechX: 0, speechY: 0,
    },
  },
  {
    id: 'proddown',
    label: { ru: '🚨 Прод упал', en: '🚨 Prod is down' },
    speech: { ru: 'Кто деплоил в пятницу вечером?!', en: 'Who deployed on Friday night?!' },
    panel: {
      background: 'alert', bgTheme: 'rose',
      chars: [charSlot('hero', 'surprised'), charSlot('devops', 'angry')],
      props: ['none'], fx: 'sweat',
      speechKind: 'bubble', speechTail: 'bottom-left', speechX: 0, speechY: 0,
    },
  },
  {
    id: 'review',
    label: { ru: '🔍 Код-ревью', en: '🔍 Code review' },
    speech: { ru: 'А это что за костыль?', en: 'And what is this hack?' },
    panel: {
      background: 'desk', bgTheme: 'slate',
      chars: [charSlot('senior', 'neutral', { pose: 'point' }), charSlot('hero', 'sad')],
      props: ['none'], fx: 'none',
      speechKind: 'bubble', speechTail: 'bottom-right', speechX: 0, speechY: 0,
    },
  },
  {
    id: 'boss',
    label: { ru: '😤 Разнос', en: '😤 Bossfight' },
    speech: { ru: 'Почему это ещё не в проде?!', en: 'Why is this still not in prod?!' },
    panel: {
      background: 'office', bgTheme: 'rose',
      chars: [charSlot('boss', 'angry', { pose: 'point' }), charSlot('hero', 'sad')],
      props: ['none'], fx: 'anger', fxX: -14, fxY: 0,
      speechKind: 'bubble', speechTail: 'bottom-right', speechX: 0, speechY: 0,
    },
  },
  {
    id: 'victory',
    label: { ru: '🏆 Победа', en: '🏆 Victory' },
    speech: { ru: 'Задеплоил без единого бага!', en: 'Deployed without a single bug!' },
    panel: {
      background: 'hills', bgTheme: 'mint',
      chars: [charSlot('hero', 'happy', { pose: 'celebrate', held: 'trophy' }), charSlot(null)],
      props: ['none'], fx: 'focus', fxX: -20, fxY: 20,
      speechKind: 'bubble', speechTail: 'bottom-center', speechX: 0, speechY: 0,
    },
  },
  {
    id: 'night',
    label: { ru: '🌙 Ночной фикс', en: '🌙 Night fix' },
    speech: { ru: '', en: '' },
    caption: { ru: '03:00', en: '3 AM' },
    panel: {
      background: 'bedroom', bgTheme: 'lavender',
      chars: [charSlot('hero', 'dead', { pose: 'typing', held: 'laptop', x: -14 }), charSlot(null)],
      props: ['energy'], propX: 12, propY: 0, fx: 'zzz',
      speechKind: 'bubble', speechTail: 'none', speechX: 0, speechY: 0,
    },
  },
  {
    id: 'approval',
    label: { ru: '🤖 ИИ просит', en: '🤖 AI asks' },
    speech: {
      ru: 'Запрашиваю разрешение...\nИИ хочет выполнить:\n$ rm -rf прод',
      en: 'Requesting approval...\nAI wants to run:\n$ rm -rf prod',
    },
    panel: {
      background: 'hills', bgTheme: 'peach',
      chars: [charSlot('hero', 'surprised'), charSlot(null)],
      props: ['none'], fx: 'none',
      speechKind: 'terminal', speechTail: 'bottom-right', speechX: 0, speechY: 0,
    },
  },
];

export function getSceneTemplates(lang: Language): SceneTemplate[] {
  return DEFS.map(d => ({
    id: d.id,
    label: d.label[lang],
    panel: { ...d.panel, speech: d.speech[lang], caption: d.caption?.[lang] ?? '' },
  }));
}
