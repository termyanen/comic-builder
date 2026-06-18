import { useState } from 'react';
import { useComicStore } from '../../store/comicStore';
import type { SeriesEntry } from '../../store/comicStore';
import { exportComic } from '../../rendering/ExportRenderer';

function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
    + ' ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function SeriesItem({ entry, active }: { entry: SeriesEntry; active: boolean }) {
  const { loadSeries, deleteSeries, updateSeriesEntry } = useComicStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [ep, setEp] = useState('');

  function startEdit(e: React.MouseEvent) {
    e.stopPropagation();
    setName(entry.strip.seriesName);
    setEp(entry.strip.episodeNumber);
    setEditing(true);
  }

  function commitEdit(e: React.MouseEvent) {
    e.stopPropagation();
    updateSeriesEntry(entry.id, name.trim() || 'untitled', ep.trim() || '#001');
    setEditing(false);
  }

  function cancelEdit(e: React.MouseEvent) {
    e.stopPropagation();
    setEditing(false);
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (window.confirm(`Удалить «${entry.strip.seriesName} ${entry.strip.episodeNumber}»?`)) {
      deleteSeries(entry.id);
    }
  }

  function handleExport(e: React.MouseEvent) {
    e.stopPropagation();
    exportComic(entry.strip);
  }

  return (
    <div
      className={`series-item${active ? ' active' : ''}`}
      onClick={() => loadSeries(entry.id)}
    >
      {editing ? (
        <div className="series-edit" onClick={e => e.stopPropagation()}>
          <input
            className="series-edit-input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Название"
            autoFocus
          />
          <input
            className="series-edit-input series-edit-ep"
            value={ep}
            onChange={e => setEp(e.target.value)}
            placeholder="#001"
          />
          <div className="series-edit-actions">
            <button className="series-btn series-btn-confirm" onClick={commitEdit}>✓</button>
            <button className="series-btn series-btn-cancel" onClick={cancelEdit}>✕</button>
          </div>
        </div>
      ) : (
        <>
          <div className="series-item-body">
            <div className="series-item-title">{entry.strip.seriesName}</div>
            <div className="series-item-sub">{entry.strip.episodeNumber} · {formatDate(entry.updatedAt)}</div>
          </div>
          <div className="series-item-actions">
            <button className="series-btn" title="Export PNG" onClick={handleExport}>↓</button>
            <button className="series-btn" title="Переименовать" onClick={startEdit}>✎</button>
            <button className="series-btn series-btn-del" title="Удалить" onClick={handleDelete}>✕</button>
          </div>
        </>
      )}
    </div>
  );
}

export function SeriesPanel() {
  const { seriesList, activeSeriesId, newSeries } = useComicStore();
  const sorted = [...seriesList].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="series-panel">
      <div className="series-panel-header">
        <span className="series-panel-title">Серии</span>
        <button className="series-new-btn" onClick={newSeries} title="Новая серия">+ Новая</button>
      </div>
      <div className="series-list">
        {sorted.map(entry => (
          <SeriesItem key={entry.id} entry={entry} active={entry.id === activeSeriesId} />
        ))}
      </div>
    </div>
  );
}
