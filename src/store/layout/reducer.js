import { CHANGE_ORIENTATION, SET_DIMENSIONS, SET_THEME } from './types';

const initialState = {
  orientation: 'portrait',
  dimensions: {
    width: 0,
    height: 0
  },
  theme: 'def'
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_ORIENTATION: {
      return {
        ...state,
        orientation: payload
      };
    }

    case SET_DIMENSIONS: {
      return {
        ...state,
        dimensions: {
          width: payload.width,
          height: payload.height
        }
      };
    }

    case SET_THEME: {
      return {
        ...state,
        theme: payload
      };
    }

    default: {
      return state;
    }
  }
};
