import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['layout', 'questions']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}


export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleware)));
export const persistor = persistStore(store);
