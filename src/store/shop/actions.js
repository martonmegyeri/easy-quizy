import { SET_COIN, BUY_THEME } from './types';

export const setCoin = (payload) => ({
  type: SET_COIN,
  payload
});

export const buyTheme = (payload) => ({
  type: BUY_THEME,
  payload
});
