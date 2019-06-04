import { SET_COIN, BUY_THEME } from './types';

const initialState = {
  coins: 0,
  themes: {
    def: {
      price: 0,
      bought: true
    },
    hot: {
      price: 200,
      bought: false
    },
    cold: {
      price: 200,
      bought: false
    },
    dark: {
      price: 200,
      bought: false
    },
    cherryBlossom: {
      price: 250,
      bought: false
    }
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COIN: {
      return { ...state, coins: state.coins + payload };
    }

    case BUY_THEME: {
      const { price } = state.themes[payload];

      if (state.coins < price) return;

      const modifiedThemes = { ...state.themes };
      modifiedThemes[payload].bought = true;

      return {
        ...state,
        coins: state.coins - price,
        themes: modifiedThemes
      };
    }

    default: {
      return state;
    }
  }
};
