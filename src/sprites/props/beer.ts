import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const beer: PropDef = {
  id: 'beer',
  name: 'Beer',
  nameRu: 'Пиво',
  draw({ p, d }) {
    // Glass body
    p(21, 22, 8, 18, '#d4a020');
    p(22, 23, 6, 16, '#e8b828');
    // Beer liquid
    p(22, 26, 6, 13, '#c89010');
    // Foam on top
    p(21, 20, 8, 4, C.wh);
    p(22, 19, 6, 2, C.wh);
    p(23, 18, 4, 2, C.wh);
    // Foam bubbles detail
    d(23, 20, '#eee'); d(25, 19, '#eee'); d(27, 20, '#eee');
    d(24, 21, '#f8f8f8'); d(26, 21, '#f8f8f8');
    // Glass highlights
    p(23, 24, 1, 14, '#f0c030');
    // Bubbles in beer
    d(24, 28, '#e0aa28'); d(26, 31, '#e0aa28');
    d(25, 34, '#e0aa28'); d(23, 30, '#e0aa28');
    // Glass base
    p(20, 40, 10, 2, '#b89018');
    // Handle
    p(29, 25, 3, 8, '#c89010');
    p(30, 26, 1, 6, '#d4a020');
  },
};
