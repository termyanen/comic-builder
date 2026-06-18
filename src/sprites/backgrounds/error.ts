import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const error: BackgroundDef = {
  id: 'error',
  name: 'BSOD / Error',
  nameRu: 'BSOD / Error',
  draw({ p, ctx, S }) {
    p(0, 0, 70, 70, C.blue_err);

    const fs = Math.round(S * 1.5);

    // Sad face
    ctx.fillStyle = C.wh;
    ctx.font = `bold ${fs * 2}px Courier New`;
    ctx.fillText(':(', 26 * S, 18 * S);

    // Error text
    ctx.font = `${fs}px Courier New`;
    ctx.fillStyle = C.wh;
    ctx.fillText('Your PC ran into', 8 * S, 28 * S);
    ctx.fillText('a problem.', 8 * S, 33 * S);

    ctx.fillStyle = '#88aaff';
    ctx.fillText('SCOPE_OVERFLOW', 8 * S, 41 * S);

    ctx.fillStyle = '#aaaaff';
    ctx.fillText('features.exe', 8 * S, 47 * S);

    // Fake QR code
    p(8, 54, 7, 7, C.wh);
    p(9, 55, 1, 1, C.blk); p(13, 55, 1, 1, C.blk);
    p(9, 59, 1, 1, C.blk); p(13, 59, 1, 1, C.blk);
    p(10, 56, 3, 3, C.blk);

    ctx.fillStyle = '#aaaaff';
    ctx.font = `${Math.round(fs * 0.8)}px Courier New`;
    ctx.fillText('press any key...', 18 * S, 59 * S);
  },
};
