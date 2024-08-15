import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

// getting all anecdotes from server
export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

// POST new anecdote to server
export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data);
