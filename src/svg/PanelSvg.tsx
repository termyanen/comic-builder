import { useRef } from 'react';
import type { ComicStrip, PanelData } from '../types/comic';
import { VIEW, UNIT } from '../types/comic';
import { useComicStore } from '../store/comicStore';
import { getDragBase, buildDragUpdate } from '../dragMath';
import type { DragKind } from '../dragMath';
import { PanelContent } from './PanelContent';

interface DragState {
  kind: DragKind;
  startX: number;
  startY: number;
  baseX: number;
  baseY: number;
}

interface Props {
  panel: PanelData;
  strip: ComicStrip;
  index: number;
}

/** Single editable panel in the editor grid — elements drag with the pointer */
export function PanelSvg({ panel, strip, index }: Props) {
  const updatePanel = useComicStore(s => s.updatePanel);
  const setActiveDrag = useComicStore(s => s.setActiveDrag);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<DragState | null>(null);

  function onPointerDown(e: React.PointerEvent<SVGSVGElement>) {
    const el = (e.target as Element).closest('[data-drag]');
    if (!el || !svgRef.current) return;
    const kind = el.getAttribute('data-drag') as DragKind;
    const [baseX, baseY] = getDragBase(panel, kind);
    dragRef.current = { kind, startX: e.clientX, startY: e.clientY, baseX, baseY };
    setActiveDrag(kind);
    svgRef.current.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const d = dragRef.current;
    if (!d || !svgRef.current) return;
    // pointer px → grid units at the panel's on-screen scale
    const pxToUnit = VIEW / svgRef.current.getBoundingClientRect().width / UNIT;
    updatePanel(index, buildDragUpdate(
      panel, d.kind,
      d.baseX + (e.clientX - d.startX) * pxToUnit,
      d.baseY + (e.clientY - d.startY) * pxToUnit,
    ));
  }

  function onPointerUp(e: React.PointerEvent<SVGSVGElement>) {
    if (dragRef.current && svgRef.current) {
      svgRef.current.releasePointerCapture(e.pointerId);
    }
    dragRef.current = null;
  }

  return (
    <svg ref={svgRef} viewBox={`0 0 ${VIEW} ${VIEW}`}
      style={{ display: 'block', width: '100%', height: '100%' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}>
      <PanelContent panel={panel} strip={strip} uid={`ed-${index}`}
        cornerTag={index === 3 && strip.showCornerTag ? `@${(strip.authorTag ?? strip.seriesName).toUpperCase()}` : undefined} />
    </svg>
  );
}
