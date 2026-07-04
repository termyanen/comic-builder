import { useState } from 'react';
import { useComicStore } from '../../store/comicStore';
import { parseScenario } from '../../scenario';
import { useT } from '../../i18n';

const EXAMPLES = {
  ru: `название: Стендап
номер: #002

панель 1
фон: офис, тема песок
герой довольный печатает: Всё, фича готова!
робот: Проверить перед деплоем?

панель 2
терминал: Проверяю... | Найдено проблем: 0 | $ ship-it

панель 3
фон: авария, тема роза
герой удивлён: ЧТО ЗНАЧИТ ПРОД УПАЛ?!
эффект: пот

панель 4
фон: офис
робот самодовольный: Ноль проблем в коде. Проблемы в проде.
герой фейспалм грустный
подпись: формально он прав`,
  en: `title: Standup
episode: #002

panel 1
bg: office, theme sand
hero happy typing: Done, the feature is ready!
robot: Check before deploy?

panel 2
terminal: Checking... | Problems found: 0 | $ ship-it

panel 3
bg: alert, theme rose
hero surprised: WHAT DO YOU MEAN PROD IS DOWN?!
fx: sweat

panel 4
bg: office
robot smug: Zero problems in the code. The problems are in prod.
hero facepalm sad
caption: technically correct`,
};

export function ScenarioModal({ onClose }: { onClose: () => void }) {
  const importStrip = useComicStore(s => s.importStrip);
  const strip = useComicStore(s => s.strip);
  const t = useT();
  const [text, setText] = useState('');
  const example = EXAMPLES[strip.language];

  function build() {
    try {
      importStrip(parseScenario(text, { language: strip.language, authorTag: strip.authorTag }));
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">{t('scenarioModalTitle')}</div>
        <div className="modal-hint">{t('scenarioHint')}</div>
        <textarea
          rows={16}
          value={text}
          placeholder={example}
          onChange={e => setText(e.target.value)}
          autoFocus
        />
        <div className="modal-actions">
          <button className="btn" onClick={() => setText(example)}>{t('scenarioExample')}</button>
          <button className="btn" onClick={build} disabled={!text.trim()}>{t('scenarioBuild')}</button>
          <button className="btn btn-red" onClick={onClose}>{t('scenarioCancel')}</button>
        </div>
      </div>
    </div>
  );
}
