import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const money: PropDef = {
  id: 'money',
  name: 'Money',
  nameRu: 'Деньги',
  draw({ p, d }) {
    // Stack of bills (depth)
    p(12, 26, 26, 12, '#2a6a2a');
    p(13, 25, 26, 12, '#2d7a2d');
    p(14, 24, 26, 12, '#2a8a2a');

    // Top bill
    p(15, 23, 26, 12, '#2d9e2d');
    p(16, 24, 24, 10, '#38b038');

    // Bill border
    p(17, 25, 22, 8, '#2d9e2d');
    p(18, 26, 20, 6, '#3ab03a');

    // Center oval (portrait area)
    p(23, 26, 8, 6, '#2d9e2d');
    p(24, 27, 6, 4, '#38b838');
    // Dollar sign
    d(26, 27, C.wh); d(26, 28, C.wh); d(26, 29, C.wh);
    d(25, 27, C.wh); d(27, 27, C.wh);
    d(25, 29, C.wh); d(27, 29, C.wh);
    d(26, 26, C.wh); d(26, 30, C.wh); // vertical bar

    // Corner numbers
    d(18, 26, C.wh); d(19, 26, C.wh);
    d(34, 26, C.wh); d(35, 26, C.wh);
    d(18, 31, C.wh); d(19, 31, C.wh);
    d(34, 31, C.wh); d(35, 31, C.wh);

    // Scattered coins below
    p(16, 36, 4, 4, C.yellow);
    p(17, 37, 2, 2, '#d4a020');
    d(18, 37, '#ffe060');
    p(24, 37, 4, 4, C.yellow);
    p(25, 38, 2, 2, '#d4a020');
    p(32, 36, 4, 4, C.yellow);
    p(33, 37, 2, 2, '#d4a020');
  },
};
