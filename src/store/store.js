import { configureStore, combineReducers } from '@reduxjs/toolkit';

import character from './character';
import episode from './episode';

const rootReducer = combineReducers({
  character,
  episode
});

const store = configureStore({
  reducer: rootReducer
});

export default store;