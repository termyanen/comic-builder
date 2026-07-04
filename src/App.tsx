import { useEffect, useRef, useState } from 'react';
import { SeriesPanel } from './components/SeriesPanel/SeriesPanel';
import { Toolbar } from './components/Toolbar/Toolbar';
import { ComicGrid } from './components/ComicGrid/ComicGrid';
import { EditorSidebar } from './components/EditorSidebar/EditorSidebar';
import { useComicStore } from './store/comicStore';
import { preloadExportAssets } from './rendering/exportSvg';
import { getDragBase, buildDragUpdate } from './dragMath';
import type { DragKind } from './dragMath';
import './App.css';

function isTextTarget(el: EventTarget | null): boolean {
  return el instanceof HTMLElement && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
}

const ARROWS: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};

const COLS_KEY = 'comic-builder-cols';
const COL_RANGE = { left: [150, 380], right: [260, 520] } as const;

function loadCols(): { left: number; right: number } {
  try {
    const raw = localStorage.getItem(COLS_KEY);
    if (raw) return { left: 210, right: 300, ...JSON.parse(raw) };
  } catch { /* corrupted — fall through to defaults */ }
  return { left: 210, right: 300 };
}

/** Draggable vertical divider between the columns */
function ColResizer({ onDrag }: { onDrag: (dx: number) => void }) {
  const lastX = useRef(0);
  return (
    <div
      className="col-resizer"
      onPointerDown={e => {
        lastX.current = e.clientX;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={e => {
        if (lastX.current === 0) return;
        onDrag(e.clientX - lastX.current);
        lastX.current = e.clientX;
      }}
      onPointerUp={() => { lastX.current = 0; }}
    />
  );
}

export default function App() {
  useEffect(() => {
    const warmup = setTimeout(preloadExportAssets, 1500);

    function onKeyDown(e: KeyboardEvent) {
      if (isTextTarget(e.target)) return;
      const state = useComicStore.getState();

      // Cmd+Z / Cmd+Shift+Z
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) state.redo();
        else state.undo();
        return;
      }
      if (e.metaKey || e.ctrlKey) return;

      // 1-4 — switch panels
      if (e.key >= '1' && e.key <= '4') {
        state.selectPanel(Number(e.key) - 1);
        return;
      }

      // arrows — nudge the last dragged element (Shift = big steps)
      const delta = ARROWS[e.key];
      if (delta && state.activeDrag) {
        e.preventDefault();
        const kind = state.activeDrag as DragKind;
        const panel = state.strip.panels[state.activePanel];
        const [bx, by] = getDragBase(panel, kind);
        const step = e.shiftKey ? 5 : 1;
        state.updatePanel(state.activePanel, buildDragUpdate(panel, kind, bx + delta[0] * step, by + delta[1] * step));
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(warmup);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const [cols, setCols] = useState(loadCols);

  function resize(side: 'left' | 'right', dx: number) {
    setCols(prev => {
      const [min, max] = COL_RANGE[side];
      const next = {
        ...prev,
        [side]: Math.min(max, Math.max(min, prev[side] + (side === 'left' ? dx : -dx))),
      };
      localStorage.setItem(COLS_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="app" style={{ ['--col-left' as string]: `${cols.left}px`, ['--col-right' as string]: `${cols.right}px` }}>
      <SeriesPanel />
      <ColResizer onDrag={dx => resize('left', dx)} />
      <div className="main-content">
        <div className="main-header">
          <span className="app-title">[ COMIC BUILDER ]</span>
          <Toolbar />
        </div>
        <ComicGrid />
      </div>
      <ColResizer onDrag={dx => resize('right', dx)} />
      <EditorSidebar />
    </div>
  );
}
