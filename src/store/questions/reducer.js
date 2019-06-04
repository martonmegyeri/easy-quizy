import { LOAD_QUESTIONS } from './types';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_QUESTIONS: {
      return { ...payload };
    }
    default: {
      return state;
    }
  }
};
