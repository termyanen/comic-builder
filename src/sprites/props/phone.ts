import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const phone: PropDef = {
  id: 'phone',
  name: 'Phone',
  nameRu: 'Телефон',
  draw({ p, d }) {
    // Phone body
    p(20, 18, 10, 18, '#1a1a1a');
    p(21, 19, 8, 16, '#222');
    // Screen
    p(22, 20, 6, 12, '#0a1a3a');
    // Screen content (notifications)
    p(23, 22, 4, 1, '#5b8def');
    p(23, 24, 4, 1, '#c0186a');
    p(23, 26, 4, 1, '#2d9e2d');
    p(23, 28, 2, 1, '#5b8def');
    // Home button
    d(25, 34, '#444'); d(24, 34, '#444');
    // Camera
    d(25, 20, '#333'); d(24, 20, '#333');
    // Notification badge
    p(28, 19, 3, 3, C.red);
    d(29, 20, C.wh);
  },
};
