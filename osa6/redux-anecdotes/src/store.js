import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';

const combinedStore = configureStore({
  reducer: {
    anecdotes: reducer,
    filter: filterReducer
  }
});

export default combinedStore;
