import { CHANGE_ORIENTATION, SET_DIMENSIONS, SET_THEME } from './types';

export const changeOrientation = (payload) => async (dispatch) => {
  if (payload !== 'portrait' && payload !== 'landscape') return;

  dispatch({
    type: CHANGE_ORIENTATION,
    payload
  });
};

export const setDimensions = (payload) => ({
  type: SET_DIMENSIONS,
  payload
});

export const setTheme = (payload) => ({
  type: SET_THEME,
  payload
});
