import { SET_SCORE } from './types';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SCORE: {
      const newToplist = [
        ...state,
        payload
      ];

      return newToplist.sort((a, b) => b.score - a.score).slice(0, 10);
    }
    default: {
      return state;
    }
  }
};
