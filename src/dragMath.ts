import type { PanelData } from './types/comic';

/** Everything positionable by drag or arrow keys */
export type DragKind = 'char0' | 'char1' | 'prop' | 'fx' | 'speech' | 'speech2' | 'tail' | 'tail2' | 'caption';

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Same ranges as the sidebar sliders, so dragging and sliders stay in sync */
export const DRAG_LIMITS: Record<DragKind, { x: [number, number]; y: [number, number] }> = {
  char0: { x: [-40, 40], y: [-30, 30] },
  char1: { x: [-40, 40], y: [-30, 30] },
  prop: { x: [-30, 30], y: [-30, 30] },
  fx: { x: [-50, 14], y: [-18, 42] },
  speech: { x: [-20, 35], y: [-20, 30] },
  speech2: { x: [-55, 10], y: [-16, 40] },
  tail: { x: [-60, 60], y: [-45, 45] },
  tail2: { x: [-60, 60], y: [-45, 45] },
  caption: { x: [-2, 55], y: [-55, 4] },
};

export function getDragBase(panel: PanelData, kind: DragKind): [number, number] {
  switch (kind) {
    case 'char0': return [panel.chars[0].x, panel.chars[0].y];
    case 'char1': return [panel.chars[1].x, panel.chars[1].y];
    case 'prop': return [panel.propX, panel.propY];
    case 'fx': return [panel.fxX ?? 0, panel.fxY ?? 0];
    case 'speech': return [panel.speechX, panel.speechY];
    case 'speech2': return [panel.speech2X ?? 0, panel.speech2Y ?? 0];
    case 'tail': return [panel.speechTailX ?? 0, panel.speechTailY ?? 0];
    case 'tail2': return [panel.speech2TailX ?? 0, panel.speech2TailY ?? 0];
    case 'caption': return [panel.captionX ?? 0, panel.captionY ?? 0];
  }
}

/** Clamped position → the panel fields to update */
export function buildDragUpdate(panel: PanelData, kind: DragKind, rawX: number, rawY: number): Partial<PanelData> {
  const lim = DRAG_LIMITS[kind];
  const x = clamp(Math.round(rawX), lim.x[0], lim.x[1]);
  const y = clamp(Math.round(rawY), lim.y[0], lim.y[1]);
  switch (kind) {
    case 'char0':
    case 'char1': {
      const slot = kind === 'char0' ? 0 : 1;
      const chars = panel.chars.map((c, i) => (i === slot ? { ...c, x, y } : c)) as PanelData['chars'];
      return { chars };
    }
    case 'prop': return { propX: x, propY: y };
    case 'fx': return { fxX: x, fxY: y };
    case 'speech': return { speechX: x, speechY: y };
    case 'speech2': return { speech2X: x, speech2Y: y };
    case 'tail': return { speechTailX: x, speechTailY: y };
    case 'tail2': return { speech2TailX: x, speech2TailY: y };
    case 'caption': return { captionX: x, captionY: y };
  }
}
