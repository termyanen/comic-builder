import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const presentation: BackgroundDef = {
  id: 'presentation',
  name: 'Presentation',
  nameRu: 'Презентация',
  draw({ p, d, t, ctx, S }) {
    // Dark conference room
    p(0, 0, 50, 50, '#080810');
    p(0, 40, 50, 10, '#060608');

    // Big projector screen
    p(4, 4, 42, 28, '#111');
    p(5, 5, 40, 26, '#eef');   // screen surface
    // Slide content
    p(6, 6, 38, 4, t.wallMid); // title bar
    p(7, 7, 20, 2, C.wh);      // slide title text lines
    d(29, 8, C.yellow); d(30, 8, C.yellow); d(31, 8, C.yellow); // highlight

    // Slide body — chart going up
    p(8, 12, 2, 14, '#aaa');  // Y axis
    p(8, 25, 22, 2, '#aaa'); // X axis
    p(10, 22, 3, 5, '#5b8def');
    p(14, 19, 3, 8, '#5b8def');
    p(18, 16, 3, 11, C.cyan);
    p(22, 13, 3, 14, C.cyan);
    p(26, 10, 3, 17, C.green);
    // Trend arrow
    d(10, 22, C.yellow); d(14, 19, C.yellow); d(18, 16, C.yellow);
    d(22, 13, C.yellow); d(26, 10, C.yellow); d(28, 8, C.yellow);
    d(29, 7, C.yellow); d(28, 7, C.yellow); // arrowhead

    // Right side of slide — bullet points
    p(32, 12, 10, 1, '#ccc');
    p(32, 15, 8, 1, '#ccc');
    p(32, 18, 9, 1, '#ccc');
    d(31, 12, C.cyan); d(31, 15, C.cyan); d(31, 18, C.cyan); // bullets

    // "Q4 RESULTS" mock text
    p(33, 22, 8, 2, t.wallMid);
    d(34, 23, C.yellow); d(35, 23, C.yellow); d(36, 23, C.yellow);

    // Projector beam (subtle)
    ctx.fillStyle = 'rgba(255,255,240,0.03)';
    ctx.beginPath();
    ctx.moveTo(25 * S, 0);
    ctx.lineTo(5 * S, 4 * S);
    ctx.lineTo(45 * S, 4 * S);
    ctx.closePath();
    ctx.fill();

    // Projector body (ceiling mounted)
    p(20, 0, 10, 3, '#222');
    p(22, 3, 6, 1, '#333');
    d(24, 1, C.yellow); d(25, 1, '#ff8800'); // lens

    // Podium / lectern
    p(4, 32, 8, 10, '#1a1a2a');
    p(5, 33, 6, 2, '#2a2a3a'); // top
    p(6, 35, 4, 1, '#14ffec'); // mic base
    // Microphone
    p(7, 30, 2, 6, '#444');
    p(7, 28, 2, 3, '#222');

    // Audience silhouettes (bottom)
    for (let i = 0; i < 6; i++) {
      const ax = 16 + i * 6;
      p(ax, 38, 4, 6, '#0a0a14'); // body
      p(ax + 1, 35, 2, 4, '#0d0d18'); // head
    }
  },
};
