import type { ComicStrip, PanelData } from '../types/comic';
import { VIEW, UNIT } from '../types/comic';
import { INK, STROKE, RADIUS, FONT, BG_THEMES } from '../style/tokens';
import { getCharacter, getBackground, getProp, getFx, resolveOutfit } from './registry';
import { Speech } from './speech';
import { measureText } from './text';

/** Default feet positions by slot index: slot 0 — right, slot 1 — left */
const SLOT_X = [290, 120];
const FLOOR_Y = 356;
const PROP_X = 190;
/** Default fx anchor — near the head of the right-hand character */
const FX_X = 330;
const FX_Y = 120;

function Caption({ text, dx, dy }: { text: string; dx: number; dy: number }) {
  if (!text) return null;
  const fontSize = 17;
  const font = `700 ${fontSize}px ${FONT.hand}`;
  const w = measureText(text, font) + 26;
  const x = 16 + dx;
  const y = VIEW - 50 + dy;
  return (
    <g>
      <rect x={x} y={y} width={w} height={34} rx={9} fill="#fff" stroke={INK} strokeWidth={3.5} />
      <text x={x + 13} y={y + 23} fontFamily={FONT.hand} fontWeight={700} fontSize={fontSize} fill={INK}>{text}</text>
    </g>
  );
}

interface Props {
  panel: PanelData;
  strip: ComicStrip;
  /** Unique id prefix — clipPaths must not collide across panels */
  uid: string;
  /** Vertical author signature in the bottom-right corner (panel 4) */
  cornerTag?: string;
}

/**
 * One panel's full content in 0..420 coordinates.
 * Shared by the editor (PanelSvg) and the export (StripSvg).
 */
export function PanelContent({ panel, strip, uid, cornerTag }: Props) {
  const theme = BG_THEMES[panel.bgTheme] ?? BG_THEMES.peach;
  const bg = getBackground(panel.background);
  const clipId = `clip-${uid}`;

  return (
    <g>
      <clipPath id={clipId}>
        {/* clip at the border centerline so the frame stroke always covers content edges */}
        <rect x={STROKE.panel / 2 + 2} y={STROKE.panel / 2 + 2}
          width={VIEW - STROKE.panel - 4} height={VIEW - STROKE.panel - 4} rx={RADIUS.panel - 4} />
      </clipPath>

      <g clipPath={`url(#${clipId})`}>
        {bg?.render(theme)}

        {(() => {
          const propsLayer = panel.props.map(propId => {
            if (propId === 'none') return null;
            const prop = getProp(propId);
            if (!prop) return null;
            return (
              <g key={propId} data-drag="prop" pointerEvents="bounding-box"
                transform={`translate(${PROP_X + panel.propX * UNIT}, ${FLOOR_Y + panel.propY * UNIT}) rotate(${panel.propRot ?? 0})`}>
                {prop.render()}
              </g>
            );
          });

          const charsLayer = panel.chars.map((slot, i) => {
            if (!slot.id) return null;
            const def = getCharacter(slot.id);
            if (!def) return null;
            const heldDef = slot.held && slot.held !== 'none' ? getProp(slot.held) : undefined;
            const scale = slot.scale ?? 1;
            return (
              <g key={i} data-drag={`char${i}`} pointerEvents="bounding-box"
                transform={`translate(${SLOT_X[i] + slot.x * UNIT}, ${FLOOR_Y + slot.y * UNIT})${scale !== 1 ? ` scale(${scale})` : ''}`}>
                {def.render({
                  mood: slot.mood,
                  pose: slot.pose ?? 'stand',
                  outfit: resolveOutfit(strip, slot.id),
                  flip: slot.flip,
                  gaze: slot.gaze ?? 'front',
                  turn: slot.turn ?? 'front',
                  held: heldDef?.render(),
                })}
              </g>
            );
          });

          return panel.propFront
            ? <>{charsLayer}{propsLayer}</>
            : <>{propsLayer}{charsLayer}</>;
        })()}

        {panel.fx && panel.fx !== 'none' && (
          <g data-drag="fx" pointerEvents="bounding-box"
            transform={`translate(${FX_X + (panel.fxX ?? 0) * UNIT}, ${FX_Y + (panel.fxY ?? 0) * UNIT}) rotate(${panel.fxRot ?? 0}) scale(${panel.fxScale ?? 1})`}>
            {getFx(panel.fx)?.render()}
          </g>
        )}

        <g data-drag="speech" pointerEvents="bounding-box">
          <Speech
            text={panel.speech}
            kind={panel.speechKind}
            style={panel.speechStyle ?? 'normal'}
            offsetX={panel.speechX * UNIT}
            offsetY={panel.speechY * UNIT}
            sizeAdjust={panel.speechScale}
            zoom={panel.speechZoom ?? 1}
            tail={panel.speechTail}
            tailDx={(panel.speechTailX ?? 0) * UNIT}
            tailDy={(panel.speechTailY ?? 0) * UNIT}
            tailDragId="tail"
            color={panel.speechColor}
            rotate={panel.speechRot ?? 0}
          />
        </g>
        {panel.speech2 && (
          <g data-drag="speech2" pointerEvents="bounding-box">
            <Speech
              text={panel.speech2}
              kind="bubble"
              style={panel.speech2Style ?? 'normal'}
              anchorRight
              baseY={118}
              offsetX={(panel.speech2X ?? 0) * UNIT}
              offsetY={(panel.speech2Y ?? 0) * UNIT}
              sizeAdjust={0}
              zoom={panel.speech2Zoom ?? 1}
              tail={panel.speech2Tail ?? 'bottom-right'}
              tailDx={(panel.speech2TailX ?? 0) * UNIT}
              tailDy={(panel.speech2TailY ?? 0) * UNIT}
              tailDragId="tail2"
            />
          </g>
        )}
        <g data-drag="caption" pointerEvents="bounding-box">
          <Caption text={panel.caption} dx={(panel.captionX ?? 0) * UNIT} dy={(panel.captionY ?? 0) * UNIT} />
        </g>

        {cornerTag && (
          <text transform={`rotate(90 ${VIEW - 30} ${VIEW - 18})`} x={VIEW - 35} y={VIEW - 18}
            textAnchor="end" fontFamily={FONT.mono} fontWeight={700} fontSize={12.5}
            letterSpacing={1.5} fill={INK} opacity={0.15}>
            {cornerTag}
          </text>
        )}
      </g>

      {/* panel border above everything */}
      <rect x={STROKE.panel / 2 + 2} y={STROKE.panel / 2 + 2}
        width={VIEW - STROKE.panel - 4} height={VIEW - STROKE.panel - 4}
        rx={RADIUS.panel} fill="none" stroke={INK} strokeWidth={STROKE.panel} />
    </g>
  );
}
