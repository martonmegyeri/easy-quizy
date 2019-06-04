import { combineReducers } from 'redux';

import questions from './questions/reducer';
import layout from './layout/reducer';
import highscores from './highscores/reducer';
import shop from './shop/reducer';


export default combineReducers({
  questions,
  layout,
  highscores,
  shop
});
