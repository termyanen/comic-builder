import type { BackgroundId, BgThemeId, BubbleStyle, CharacterId, ComicStrip, FxId, Language, MoodId, PanelData, PoseId } from './types/comic';
import { charSlot, defaultPanel } from './store/comicStore';

/**
 * Text scenario → strip. Line-based, forgiving format:
 *
 *   название: Стендап
 *   номер: #002
 *
 *   панель 1
 *   фон: офис, тема песок
 *   герой злой печатает: Да почему оно не собирается?!
 *   робот: Могу помочь.
 *   подпись: час спустя
 *
 *   панель 2
 *   терминал: ИИ за работой... | Оптимизирую: | $ rm -rf node_modules
 */

const CHARS: [RegExp, CharacterId][] = [
  [/^(герой|гер|dev|дев|hero)/i, 'hero'],
  [/^(робот|ии|ai|бот|robot|bot)/i, 'robot'],
  [/^(сеньор|синьор|senior)/i, 'senior'],
  [/^(пм|менеджер|pm|manager)/i, 'pm'],
  [/^(босс|шеф|начальник|boss)/i, 'boss'],
  [/^(тестировщик|ка|qa|tester)/i, 'qa'],
  [/^(дизайнер|designer)/i, 'designer'],
  [/^(девопс|опс|devops|ops)/i, 'devops'],
  [/^(стажёр|стажер|интерн|intern)/i, 'intern'],
  [/^(клиент|client)/i, 'client'],
  [/^(hr|эйчар)/i, 'hr'],
  [/^(кот|кошка|кис|cat)/i, 'cat'],
];

const MOODS: [RegExp, MoodId][] = [
  [/зл|бес|яр|angry|mad/i, 'angry'],
  [/смеё|смее|ржё|рже|хохо|laugh/i, 'laugh'],
  [/счаст|довол|рад|весел|happy|glad/i, 'happy'],
  [/удивл|шок|изумл|surpris|shock/i, 'surprised'],
  [/груст|печал|плач|sad|cry/i, 'sad'],
  [/самодовол|ехид|хитр|smug|sly/i, 'smug'],
  [/сломан|мёртв|мертв|убит|выгор|dead|burn/i, 'dead'],
  [/нейтрал|спокоен|спокойн|neutral|calm/i, 'neutral'],
];

const POSES: [RegExp, PoseId][] = [
  [/печата|кодит|typ|coding/i, 'typing'],
  [/сидит|sit/i, 'sit'],
  [/идёт|идет|шага|walk/i, 'walk'],
  [/замах|бьёт|бьет|удар|swing|hit/i, 'swing'],
  [/указ|тыч|point/i, 'point'],
  [/фейспалм|лицоладонь|facepalm/i, 'facepalm'],
  [/раду|праздн|побед|celebrat/i, 'celebrate'],
  [/плеч|шраг|shrug/i, 'shrug'],
  [/стоит|stand/i, 'stand'],
];

const BGS: [RegExp, BackgroundId][] = [
  [/холм|hill/i, 'hills'], [/стол|рабоч|desk/i, 'desk'], [/опенспейс|open/i, 'openspace'],
  [/офис|office/i, 'office'], [/переговор|митинг|meeting/i, 'meeting'], [/канбан|доск|kanban|board/i, 'kanban'],
  [/сервер|server/i, 'server'], [/спальн|кроват|bedroom|bed/i, 'bedroom'], [/дом|home/i, 'home'],
  [/кофейн|кафе|coffee|cafe/i, 'coffeeshop'], [/ночь|night/i, 'night'], [/авари|пожар|сирен|alert|fire/i, 'alert'],
  [/презентац|экран|presentation|screen/i, 'presentation'], [/портал|воронк|portal/i, 'portal'],
  [/2000|ретро|миллениум|нулев|retro|y2k/i, 'retro'], [/пуст|чист|plain|empty/i, 'plain'],
];

const THEMES: [RegExp, BgThemeId][] = [
  [/персик|peach/i, 'peach'], [/небо|sky/i, 'sky'], [/аква|aqua/i, 'aqua'], [/песок|sand/i, 'sand'],
  [/мят|mint/i, 'mint'], [/лаванд|lavender/i, 'lavender'], [/закат|sunset/i, 'sunset'], [/сер|slate|gray|grey/i, 'slate'], [/роз|rose/i, 'rose'],
];

const FXS: [RegExp, FxId][] = [
  [/удар|бам|impact|bam/i, 'impact'], [/искр|spark/i, 'hit'], [/дым|smoke|boom/i, 'boom'], [/рывок|скорост|dash|speed/i, 'dash'],
  [/оглуш|звёзд|звезд|dizzy/i, 'dizzy'], [/иде|лампоч|idea|bulb/i, 'idea'], [/вопрос|question/i, 'question'],
  [/восклиц|exclaim/i, 'exclaim'], [/сон|zzz|sleep/i, 'zzz'], [/пот|sweat/i, 'sweat'], [/злость|гнев|anger/i, 'anger'],
  [/сердц|любов|heart|love/i, 'hearts'], [/фокус|линии|focus|lines/i, 'focus'],
];

function match<T>(table: [RegExp, T][], word: string): T | undefined {
  return table.find(([re]) => re.test(word))?.[1];
}

function styleFromWords(words: string[], charId: CharacterId): BubbleStyle {
  if (words.some(w => /крич|орёт|орет|shout|yell/i.test(w))) return 'shout';
  if (words.some(w => /дума|мысл|think/i.test(w))) return 'think';
  if (words.some(w => /шепч|шёпот|шепот|whisper/i.test(w))) return 'whisper';
  if (charId === 'robot') return 'robo';
  return 'normal';
}

export function parseScenario(text: string, base?: { language?: Language; authorTag?: string }): ComicStrip {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  let seriesName = 'my comic';
  let episodeNumber = '#001';

  const panels: PanelData[] = [];
  let panel: PanelData | null = null;
  /** char id → slot index within the current panel */
  let slots: Partial<Record<CharacterId, number>> = {};

  const flush = () => { if (panel) panels.push(panel); };

  for (const line of lines) {
    let m: RegExpMatchArray | null;

    if ((m = line.match(/^(?:название|title)[:\s]+(.+)/i))) { seriesName = m[1].trim(); continue; }
    if ((m = line.match(/^(?:номер|episode|ep)[:\s]+(.+)/i))) { episodeNumber = m[1].trim(); continue; }

    if (/^(?:панель|panel)/i.test(line)) {
      flush();
      panel = defaultPanel({ chars: [charSlot(null), charSlot(null)] });
      slots = {};
      continue;
    }
    if (!panel) continue;

    if ((m = line.match(/^(?:фон|bg|background)[:\s]+(.+)/i))) {
      const bg = match(BGS, m[1]);
      if (bg) panel.background = bg;
      const theme = match(THEMES, m[1].replace(/^.*(?:тема|theme)/i, ''));
      if (/тема|theme/i.test(m[1]) && theme) panel.bgTheme = theme;
      continue;
    }
    if ((m = line.match(/^(?:тема|theme)[:\s]+(.+)/i))) {
      const theme = match(THEMES, m[1]);
      if (theme) panel.bgTheme = theme;
      continue;
    }
    if ((m = line.match(/^(?:подпись|caption)[:\s]+(.+)/i))) { panel.caption = m[1].trim(); continue; }
    if ((m = line.match(/^(?:эффект|fx|effect)[:\s]+(.+)/i))) {
      const fx = match(FXS, m[1]);
      if (fx) panel.fx = fx;
      continue;
    }
    if ((m = line.match(/^(?:терминал|terminal)[:\s]+(.+)/i))) {
      panel.speechKind = 'terminal';
      panel.speech = m[1].split('|').map(s => s.trim()).join('\n');
      continue;
    }
    if ((m = line.match(/^(?:кнопка|button)[:\s]+(.+)/i))) {
      panel.speechKind = 'button';
      panel.speech = m[1].trim();
      continue;
    }

    // "<кто> [настроение] [поза] [кричит|думает|шепчет][: реплика]"
    const colon = line.indexOf(':');
    const spec = colon === -1 ? line : line.slice(0, colon);
    const words = spec.split(/\s+/);
    const charId = match(CHARS, words[0]);
    if (!charId) continue;

    let slotIdx = slots[charId];
    if (slotIdx === undefined) {
      slotIdx = Object.keys(slots).length;
      if (slotIdx > 1) continue; // only two slots per panel
      slots[charId] = slotIdx;
    }

    const mood = words.map(w => match(MOODS, w)).find(Boolean) ?? 'neutral';
    const pose = words.map(w => match(POSES, w)).find(Boolean) ?? 'stand';
    panel.chars[slotIdx] = charSlot(charId, mood, { pose });

    if (colon !== -1) {
      const speech = line.slice(colon + 1).trim();
      const style = styleFromWords(words, charId);
      // slot 0 stands right, slot 1 left — point the tail at the speaker
      if (!panel.speech) {
        panel.speech = speech;
        panel.speechKind = 'bubble';
        panel.speechStyle = style;
        panel.speechTail = slotIdx === 0 ? 'bottom-right' : 'bottom-left';
      } else if (!panel.speech2) {
        panel.speech2 = speech;
        panel.speech2Style = style;
        panel.speech2Tail = slotIdx === 0 ? 'bottom-right' : 'bottom-left';
      }
    }
  }
  flush();

  if (!panels.length) throw new Error('Не нашёл ни одной строки «панель N» / no \"panel N\" lines found');
  while (panels.length < 4) panels.push(defaultPanel({ chars: [charSlot(null), charSlot(null)] }));

  return {
    seriesName,
    episodeNumber,
    authorTag: base?.authorTag ?? 'termyanen',
    language: base?.language ?? 'ru',
    showWatermark: true,
    showCornerTag: true,
    outfits: {},
    panels: panels.slice(0, 4) as ComicStrip['panels'],
  };
}
