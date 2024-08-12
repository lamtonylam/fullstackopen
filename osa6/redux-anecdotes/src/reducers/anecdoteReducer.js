import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
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

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

// react thunk initializing anecdotes
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

// react thunk creating an anecdote
export const createAnecdote = (content) => {
  return async (dispatch) => {
    // first send to server
    const newAnecdote = await anecdoteService.createNew(content);
    // then dispatch to save to state
    dispatch(appendAnecdote(newAnecdote));
  };
};

// react thunk voting
export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    // dispatching local change
    dispatch(voteAnecdote(anecdote.id));
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    };
    // putting into server
    await anecdoteService.update(changedAnecdote);
  };
};

export default anecdoteSlice.reducer;
