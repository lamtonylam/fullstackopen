import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote));
    },
    // appending ready anecdote
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    // setting many anecdotes at once
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
});

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

// react thunk initializing anecdotes
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
